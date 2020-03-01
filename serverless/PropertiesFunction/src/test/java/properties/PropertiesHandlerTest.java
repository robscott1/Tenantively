package properties;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import properties.models.Property;
import properties.models.PropertyRequest;
import org.junit.Test;

public class PropertiesHandlerTest {
  @Test
  public void successfulResponse() throws JsonProcessingException {
    PropertiesHandler propertiesHandler = new PropertiesHandler();
    ObjectMapper mapper = new ObjectMapper();
    PropertyRequest propertyRequest = new PropertyRequest();
    Property property = new Property();
    property.setId("yaya");
    propertyRequest.setRequestType("GET");
    propertyRequest.setProperty(property);
    String serialRequest = mapper.writeValueAsString(propertyRequest);
    System.out.println(serialRequest);
    GatewayResponse result = (GatewayResponse) propertiesHandler.handleRequest(
            mapper.readValue(serialRequest, PropertyRequest.class),
            null);
    assertEquals(result.getStatusCode(), 200);
    assertEquals(result.getHeaders().get("Content-Type"), "application/json");
    String content = result.getBody();
    System.out.println(content);
    assertNotNull(content);
//    assertTrue(content.contains("\"n/a\""));
  }
}
