package properties;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

public class PropertiesHandlerTest {
  @Test
  public void successfulResponse() throws IOException {
    PropertiesHandler propertiesHandler = new PropertiesHandler();
    InputStream sampleInput = new FileInputStream("/home/austin/share/RenterPlus/serverless/PropertiesFunction/src/test/java/properties/samplePropertiesInput.txt");
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    propertiesHandler.handleRequest(sampleInput, outputStream, null);
    String output = outputStream.toString();
    System.out.println(outputStream);
  }
}
