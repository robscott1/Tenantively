package tenants.models;

import java.util.List;

public class Tenant {
    private String id;
    private String scoreId;
    private String currentLeaseId;
    private List<String> leaseContracts;
    private List<String> applications;
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

    public String getCurrentLeaseId() {
        return currentLeaseId;
    }

    public void setCurrentLeaseId(String currentLeaseId) {
        this.currentLeaseId = currentLeaseId;
    }

    public List<String> getLeaseContracts() {
        return leaseContracts;
    }

    public void setLeaseContracts(List<String> leaseContracts) {
        this.leaseContracts = leaseContracts;
    }

    public List<String> getApplications() {
        return applications;
    }

    public void setApplications(List<String> applications) {
        this.applications = applications;
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

