package tenants;

import org.junit.Test;

import java.io.*;

public class TenantsHandlerTest {
  @Test
  public void successfulResponse() throws IOException {
    TenantsHandler tenantsHandler = new TenantsHandler();
    InputStream sampleInput = new FileInputStream("/home/austin/share/RenterPlus/serverless/TenantsFunction/src/test/java/tenants/sampleTenantsInput.txt");
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    tenantsHandler.handleRequest(sampleInput, outputStream, null);
    String output = outputStream.toString();
    System.out.println(outputStream);
  }
}
