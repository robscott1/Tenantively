package properties;

import com.amazonaws.services.dynamodbv2.document.*;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;

import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import properties.models.Property;
import properties.models.PropertyRequest;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;

/**
 * Handler for requests to Lambda function.
 */
public class PropertiesHandler implements RequestStreamHandler {
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
        PropertyRequest propertyRequest;
        JsonNode jsonNode = mapper.readTree(inputStream);
        JsonNode newNode = mapper.readTree(jsonNode.get("body").asText());
        propertyRequest = mapper.treeToValue(newNode, PropertyRequest.class);

        if ("UPDATE".equals(propertyRequest.getRequestType())) {
            handleUpdatePropertyRequest(propertyRequest.getProperty(),
                    outputStream,
                    context,
                    headers);
        } else {
            try {
                handleGetPropertyRequest(propertyRequest.getProperty(),
                        outputStream,
                        context,
                        headers);
            } catch (Exception e) {
                GatewayResponse response = new GatewayResponse(e.toString(), headers, 500, false);
                mapper.writeValue(outputStream, response);
            }
        }
    }

    public void handleGetPropertyRequest(final Property getPropertyRequest,
                                         final OutputStream outputStream,
                                         final Context context,
                                         final Map<String, String> headers)
            throws IOException {
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("tenantivelyTable");

        QuerySpec querySpec = new QuerySpec();
        querySpec = querySpec.withHashKey("PK", getPropertyRequest.getPropertyManagerId());
        if (getPropertyRequest.getId() != null) {
            RangeKeyCondition rangeKeyCondition = new RangeKeyCondition("SK")
                    .eq("property|" + getPropertyRequest.getId());
            querySpec = querySpec.withRangeKeyCondition(rangeKeyCondition);
        } else {
            RangeKeyCondition rangeKeyCondition = new RangeKeyCondition("SK")
                    .beginsWith("property|");
            querySpec = querySpec.withRangeKeyCondition(rangeKeyCondition);
        }

        List<Property> properties = new ArrayList<>();
        ItemCollection<QueryOutcome> items = table.query(querySpec);
        Iterator<Item> iterator = items.iterator();
        Item item = null;
        Map<String, Object> infoMap = null;
        while (iterator.hasNext()) {
            item = iterator.next();
            infoMap = item.getMap("info");
            Property property = new Property();
            property.setId(item.getString("PK"));
            property.setPropertyManagerId(item.getString("SK"));
            property.setAddress((String) infoMap.get("address"));
            property.setApplications((List<String>) infoMap.get("applications"));
            property.setCurrentLeaseId((String) infoMap.get("currentLeaseId"));
            property.setDescription((String) infoMap.get("description"));
            property.setImages((List<String>) infoMap.get("images"));
            property.setLeaseContracts((List<String>) infoMap.get("leaseContracts"));
            property.setLeaseTerms((List<String>) infoMap.get("leaseTerms"));
            property.setSize((String) infoMap.get("size"));
            property.setIsListed((Boolean) infoMap.get("isListed"));
            properties.add(property);
        }
        GatewayResponse response = new GatewayResponse(mapper.writeValueAsString(properties), headers, 200, false);
        mapper.writeValue(outputStream, response);
    }

    public void handleUpdatePropertyRequest(final Property updatePropertyRequest,
                                            final OutputStream outputStream,
                                            final Context context,
                                            final Map<String, String> headers)
            throws IOException {
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("tenantivelyTable");

        final Map<String, Object> infoMap = new HashMap<String, Object>();
        infoMap.put("address", updatePropertyRequest.getAddress());
        infoMap.put("applications", updatePropertyRequest.getApplications());
        infoMap.put("currentLeaseId", updatePropertyRequest.getCurrentLeaseId());
        infoMap.put("description", updatePropertyRequest.getDescription());
        infoMap.put("images", updatePropertyRequest.getImages());
        infoMap.put("leaseContracts", updatePropertyRequest.getLeaseContracts());
        infoMap.put("leaseTerms", updatePropertyRequest.getLeaseTerms());
        infoMap.put("size", updatePropertyRequest.getSize());
        infoMap.put("isListed", updatePropertyRequest.getIsListed());

        try {
            System.out.println("Updating property: " + updatePropertyRequest.getAddress());
            PutItemOutcome outcome = table
                    .putItem(new Item().withPrimaryKey("PK", updatePropertyRequest.getPropertyManagerId(),
                            "SK", "property|" + updatePropertyRequest.getId()).withMap("info", infoMap));
        } catch (Exception e) {
            System.out.println("Failed to update property: " + updatePropertyRequest.getAddress());
            throw (e);
        }

        GatewayResponse response;
        String serialized = updatePropertyRequest.toString();
        if ("error".equals(serialized)) {
            response = new GatewayResponse(ERROR_MESSAGE, headers, 500, false);
        } else {
            response = new GatewayResponse(mapper.writeValueAsString(updatePropertyRequest), headers, 200, false);
        }
        mapper.writeValue(outputStream, response);
    }
}
