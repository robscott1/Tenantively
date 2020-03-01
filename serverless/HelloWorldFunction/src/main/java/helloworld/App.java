package helloworld;

import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.PutItemOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;

import helloworld.models.GetPropertiesRequest;
import helloworld.models.GetPropertiesResponse;

import java.util.HashMap;
import java.util.Map;

/**
 * Handler for requests to Lambda function.
 */
public class App implements RequestHandler<GetPropertiesRequest, GatewayResponse> {

    public GatewayResponse handleRequest(final GetPropertiesRequest getPropertiesRequest,
                                         final Context context) {
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("tenantivelyTable");

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        GetPropertiesResponse property = new GetPropertiesResponse();
        property.setAddress("n/a");
        property.setId("n/a");
        property.setPropertyManagerId("n/a");
        property.setApplications("n/a");
        property.setCurrentLeaseId("n/a");
        property.setDescription("n/a");
        property.setImages("n/a");
        property.setLeaseContracts("n/a");
        property.setLeaseTerms("n/a");
        property.setSize("n/a");
        property.setIsListed("n/a");

        final Map<String, Object> infoMap = new HashMap<String, Object>();
        infoMap.put("address", property.getAddress());
        infoMap.put("applications", property.getApplications());
        infoMap.put("currentLeaseId", property.getCurrentLeaseId());
        infoMap.put("description", property.getDescription());
        infoMap.put("images", property.getImages());
        infoMap.put("leaseContracts", property.getLeaseContracts());
        infoMap.put("leaseTerms", property.getLeaseTerms());
        infoMap.put("size", property.getSize());
        infoMap.put("isListed", property.getIsListed());

        try {
            System.out.println("Adding a new item...");
            PutItemOutcome outcome = table
                    .putItem(new Item().withPrimaryKey("PK", property.getId(),
                            "SK", property.getPropertyManagerId()).withMap("info", infoMap));
        } catch (Exception e) {
            System.out.println("Failed");
            throw (e);
        }


        String serialized = property.toString();
        if ("error".equals(serialized)) {
            return new GatewayResponse("{}", headers, 500);
        }

        return new GatewayResponse(property.toString(),
                headers, 200);
    }
}
