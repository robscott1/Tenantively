package propertyManagers;

import com.amazonaws.services.dynamodbv2.document.*;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;

import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import propertyManagers.models.PropertyManager;
import propertyManagers.models.PropertyManagerRequest;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;

/**
 * Handler for requests to Lambda function.
 */
public class PropertyManagersHandler implements RequestStreamHandler {
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
        PropertyManagerRequest propertyManagerRequest;
        JsonNode jsonNode = mapper.readTree(inputStream);
        System.out.println(jsonNode.toString());
        JsonNode newNode = mapper.readTree(jsonNode.get("body").asText());
        System.out.println(newNode.toString());
        propertyManagerRequest = mapper.treeToValue(newNode, PropertyManagerRequest.class);

        if ("UPDATE".equals(propertyManagerRequest.getRequestType())) {
            handleUpdateTenantRequest(propertyManagerRequest.getPropertyManager(),
                    outputStream,
                    context,
                    headers);
        } else {
            try {
                handleGetTenantRequest(propertyManagerRequest.getPropertyManager(),
                        outputStream,
                        context,
                        headers);
            } catch (Exception e) {
                GatewayResponse response = new GatewayResponse(e.toString(), headers, 500, false);
                mapper.writeValue(outputStream, response);
            }
        }
    }

    public void handleGetTenantRequest(final PropertyManager getTenantRequest,
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

        List<PropertyManager> propertyManagers = new ArrayList<>();
        ItemCollection<QueryOutcome> items = table.query(querySpec);
        Iterator<Item> iterator = items.iterator();
        Item item = null;
        Map<String, Object> infoMap = null;
        while (iterator.hasNext()) {
            item = iterator.next();
            infoMap = item.getMap("info");
            PropertyManager propertyManager = new PropertyManager();
            propertyManager.setId(item.getString("PK"));
            propertyManager.setScoreId((String) infoMap.get("scoreId"));
            propertyManager.setXrpAddress((String) infoMap.get("xrpAddress"));
            propertyManager.setSecret((String) infoMap.get("secret"));
            propertyManager.setBalance((String) infoMap.get("balance"));
            propertyManager.setProperties((List<String>) infoMap.get("properties"));
            propertyManager.setIncidents((List<String>) infoMap.get("incidents"));
            propertyManager.setMetadata((List<String>) infoMap.get("metadata"));
            propertyManagers.add(propertyManager);
        }
        GatewayResponse response = new GatewayResponse(mapper.writeValueAsString(propertyManagers), headers, 200, false);
        mapper.writeValue(outputStream, response);
    }

    public void handleUpdateTenantRequest(final PropertyManager updatePropertyManagerRequest,
                                          final OutputStream outputStream,
                                          final Context context,
                                          final Map<String, String> headers)
            throws IOException {
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("tenantivelyTable");

        final Map<String, Object> infoMap = new HashMap<String, Object>();
        infoMap.put("scoreId", updatePropertyManagerRequest.getScoreId());
        infoMap.put("xrpAddress", updatePropertyManagerRequest.getXrpAddress());
        infoMap.put("secret", updatePropertyManagerRequest.getSecret());
        infoMap.put("balance", updatePropertyManagerRequest.getBalance());
        infoMap.put("properties", updatePropertyManagerRequest.getProperties());
        infoMap.put("incidents", updatePropertyManagerRequest.getIncidents());
        infoMap.put("metadata", updatePropertyManagerRequest.getMetadata());

        try {
            System.out.println("Updating propertyManager: " + updatePropertyManagerRequest.getId());
            PutItemOutcome outcome = table
                    .putItem(new Item().withPrimaryKey("PK", updatePropertyManagerRequest.getId(),
                            "SK", "tenant|").withMap("info", infoMap));
        } catch (Exception e) {
            System.out.println("Failed to update propertyManager: " + updatePropertyManagerRequest.getId());
            throw (e);
        }

        GatewayResponse response;
        String serialized = updatePropertyManagerRequest.toString();
        if ("error".equals(serialized)) {
            response = new GatewayResponse(ERROR_MESSAGE, headers, 500, false);
        } else {
            response = new GatewayResponse(mapper.writeValueAsString(updatePropertyManagerRequest), headers, 200, false);
        }
        mapper.writeValue(outputStream, response);
    }
}
