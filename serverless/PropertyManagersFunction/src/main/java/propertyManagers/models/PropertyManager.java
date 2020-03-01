package propertyManagers.models;

import java.util.List;

public class PropertyManager {
    private String id;
    private String scoreId;
    private String xrpAddress;
    private String secret;
    private String balance;
    private List<String> properties;
    private List<String> incidents;
    private List<String> metadata;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getScoreId() {
        return scoreId;
    }

    public void setScoreId(String scoreId) {
        this.scoreId = scoreId;
    }

    public String getXrpAddress() {
        return xrpAddress;
    }

    public void setXrpAddress(String xrpAddress) {
        this.xrpAddress = xrpAddress;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public List<String> getProperties() {
        return properties;
    }

    public void setProperties(List<String> properties) {
        this.properties = properties;
    }

    public List<String> getIncidents() {
        return incidents;
    }

    public void setIncidents(List<String> incidents) {
        this.incidents = incidents;
    }

    public List<String> getMetadata() {
        return metadata;
    }

    public void setMetadata(List<String> metadata) {
        this.metadata = metadata;
    }
}

