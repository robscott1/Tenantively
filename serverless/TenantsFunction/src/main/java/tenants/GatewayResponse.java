package tenants;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * POJO containing response object for API Gateway.
 */
public class GatewayResponse {

    private final String body;
    private final Map<String, String> headers;
    private final int statusCode;
    private final Boolean isBase64Encoded;

    public GatewayResponse(String body, Map<String, String> headers, int statusCode, Boolean isBase64Encoded) {
        this.body = body;
        this.headers = Collections.unmodifiableMap(new HashMap<>(headers));;
        this.statusCode = statusCode;
        this.isBase64Encoded = isBase64Encoded;
    }

    public String getBody() {
        return body;
    }

    public Map<String, String> getHeaders() {
        return headers;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public Boolean getIsBase64Encoded() {
        return isBase64Encoded;
    }
}
