package properties;

import com.amazonaws.services.dynamodbv2.document.*;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import properties.models.Property;
import properties.models.PropertyRequest;

import java.util.*;

/**
 * Handler for requests to Lambda function.
 */
public class PropertiesHandler implements RequestHandler<PropertyRequest, GatewayResponse> {
    public static String ERROR_RESPONSE = "{\"message\": failed to handle GetPropertyRequest}";

    public GatewayResponse handleRequest(final PropertyRequest propertyRequest,
                                         final Context context) {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        if ("UPDATE".equals(propertyRequest.getRequestType())) {
            return handleUpdatePropertyRequest(propertyRequest.getProperty(),
                    context,
                    headers);
        }

        try {
            return handleGetPropertyRequest(propertyRequest.getProperty(),
                    context,
                    headers);
        } catch (Exception e) {
            return new GatewayResponse(ERROR_RESPONSE, headers, 500);
        }
    }

    public GatewayResponse handleGetPropertyRequest(final Property getPropertyRequest,
                                                    final Context context,
                                                    final Map<String, String> headers)
        throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("tenantivelyTable");

        QuerySpec querySpec = new QuerySpec();
        if (getPropertyRequest.getId() != null) {
            KeyAttribute keyAttribute = new KeyAttribute("PK", getPropertyRequest.getId());
            querySpec = querySpec.withHashKey(keyAttribute);
        } else if (getPropertyRequest.getPropertyManagerId() != null) {
            RangeKeyCondition rangeKeyCondition = new RangeKeyCondition("SK")
                    .eq(getPropertyRequest.getPropertyManagerId());
            querySpec = querySpec.withRangeKeyCondition(rangeKeyCondition);
        } else {
            return new GatewayResponse("{}", headers, 500);
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

        return new GatewayResponse(mapper.writeValueAsString(properties), headers, 200);
    }

    public GatewayResponse handleUpdatePropertyRequest(final Property updatePropertyRequest,
                                                       final Context context,
                                                       final Map<String, String> headers) {
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
                    .putItem(new Item().withPrimaryKey("PK", updatePropertyRequest.getId(),
                            "SK", updatePropertyRequest.getPropertyManagerId()).withMap("info", infoMap));
        } catch (Exception e) {
            System.out.println("Failed to update property: " + updatePropertyRequest.getAddress());
            throw (e);
        }

        String serialized = updatePropertyRequest.toString();
        if ("error".equals(serialized)) {
            return new GatewayResponse("{}", headers, 500);
        }

        return new GatewayResponse(updatePropertyRequest.toString(),
                headers, 200);
    }
}
