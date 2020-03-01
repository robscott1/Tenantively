package propertyManagers;

import org.junit.Test;

import java.io.*;

public class PropertyManagersHandlerTest {
  @Test
  public void successfulResponse() throws IOException {
    PropertyManagersHandler propertyManagersHandler = new PropertyManagersHandler();
    InputStream sampleInput = new FileInputStream("/home/austin/share/RenterPlus/serverless/PropertyManagersFunction/src/test/java/propertyManagers/samplePropertyManagersInput.txt");
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    propertyManagersHandler.handleRequest(sampleInput, outputStream, null);
    String output = outputStream.toString();
    System.out.println(outputStream);
  }
}
