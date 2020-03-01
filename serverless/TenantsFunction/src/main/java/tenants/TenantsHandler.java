package tenants;

import com.amazonaws.services.dynamodbv2.document.*;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;

import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import tenants.models.Tenant;
import tenants.models.TenantRequest;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;

/**
 * Handler for requests to Lambda function.
 */
public class TenantsHandler implements RequestStreamHandler {
    public static String ERROR_MESSAGE = "{\"message\": failed to handle GetPropertyRequest}";
    public ObjectMapper mapper = new ObjectMapper().enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);

    public void handleRequest(final InputStream inputStream,
                                final OutputStream outputStream,
                              final Context context)
            throws IOException {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("Access-Control-Allow-Origin", "*");
        headers.put("Access-Control-Allow-Methods", "OPTIONS,POST,GET");
        TenantRequest tenantRequest;
        JsonNode jsonNode = mapper.readTree(inputStream);
        System.out.println(jsonNode.toString());
        JsonNode newNode = mapper.readTree(jsonNode.get("body").asText());
        System.out.println(newNode.toString());
        tenantRequest = mapper.treeToValue(newNode, TenantRequest.class);

        if ("UPDATE".equals(tenantRequest.getRequestType())) {
            handleUpdateTenantRequest(tenantRequest.getTenant(),
                    outputStream,
                    context,
                    headers);
        } else {
            try {
                handleGetTenantRequest(tenantRequest.getTenant(),
                        outputStream,
                        context,
                        headers);
            } catch (Exception e) {
                GatewayResponse response = new GatewayResponse(e.toString(), headers, 500, false);
                mapper.writeValue(outputStream, response);
            }
        }
    }

    public void handleGetTenantRequest(final Tenant getTenantRequest,
                                       final OutputStream outputStream,
                                       final Context context,
                                       final Map<String, String> headers)
            throws IOException {
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("tenantivelyTable");

        QuerySpec querySpec = new QuerySpec();
        querySpec = querySpec.withHashKey("PK", getTenantRequest.getId());
        RangeKeyCondition rangeKeyCondition = new RangeKeyCondition("SK")
                .beginsWith("tenant|");
        querySpec = querySpec.withRangeKeyCondition(rangeKeyCondition);

        List<Tenant> tenants = new ArrayList<>();
        ItemCollection<QueryOutcome> items = table.query(querySpec);
        Iterator<Item> iterator = items.iterator();
        Item item = null;
        Map<String, Object> infoMap = null;
        while (iterator.hasNext()) {
            item = iterator.next();
            infoMap = item.getMap("info");
            Tenant tenant = new Tenant();
            tenant.setId(item.getString("PK"));
            tenant.setScoreId((String) infoMap.get("scoreId"));
            tenant.setCurrentLeaseId((String) infoMap.get("currentLeaseId"));
            tenant.setLeaseContracts((List<String>) infoMap.get("leaseContracts"));
            tenant.setApplications((List<String>) infoMap.get("applications"));
            tenant.setIncidents((List<String>) infoMap.get("incidents"));
            tenant.setMetadata((List<String>) infoMap.get("metadata"));
            tenants.add(tenant);
        }
        GatewayResponse response = new GatewayResponse(mapper.writeValueAsString(tenants), headers, 200, false);
        mapper.writeValue(outputStream, response);
    }

    public void handleUpdateTenantRequest(final Tenant updateTenantRequest,
                                          final OutputStream outputStream,
                                          final Context context,
                                          final Map<String, String> headers)
            throws IOException {
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("tenantivelyTable");

        final Map<String, Object> infoMap = new HashMap<String, Object>();
        infoMap.put("scoreId", updateTenantRequest.getScoreId());
        infoMap.put("currentLeaseId", updateTenantRequest.getCurrentLeaseId());
        infoMap.put("leaseContracts", updateTenantRequest.getLeaseContracts());
        infoMap.put("applications", updateTenantRequest.getApplications());
        infoMap.put("incidents", updateTenantRequest.getIncidents());
        infoMap.put("metadata", updateTenantRequest.getMetadata());

        try {
            System.out.println("Updating tenant: " + updateTenantRequest.getId());
            PutItemOutcome outcome = table
                    .putItem(new Item().withPrimaryKey("PK", updateTenantRequest.getId(),
                            "SK", "tenant|").withMap("info", infoMap));
        } catch (Exception e) {
            System.out.println("Failed to update tenant: " + updateTenantRequest.getId());
            throw (e);
        }

        GatewayResponse response;
        String serialized = updateTenantRequest.toString();
        if ("error".equals(serialized)) {
            response = new GatewayResponse(ERROR_MESSAGE, headers, 500, false);
        } else {
            response = new GatewayResponse(mapper.writeValueAsString(updateTenantRequest), headers, 200, false);
        }
        mapper.writeValue(outputStream, response);
    }
}
