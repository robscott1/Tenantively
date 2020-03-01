package properties.models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GetPropertiesResponse {

    private String id;
    private String propertyManagerId;
    private String leaseContracts;
    private String currentLeaseId;
    private String applications;
    private String images;
    private String description;
    private String address;
    private String size;
    private String leaseTerms;
    private String isListed;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPropertyManagerId() {
        return propertyManagerId;
    }

    public void setPropertyManagerId(String propertyManagerId) {
        this.propertyManagerId = propertyManagerId;
    }

    public String getLeaseContracts() {
        return leaseContracts;
    }

    public void setLeaseContracts(String leaseContracts) {
        this.leaseContracts = leaseContracts;
    }

    public String getCurrentLeaseId() {
        return currentLeaseId;
    }

    public void setCurrentLeaseId(String currentLeaseId) {
        this.currentLeaseId = currentLeaseId;
    }

    public String getApplications() {
        return applications;
    }

    public void setApplications(String applications) {
        this.applications = applications;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getLeaseTerms() {
        return leaseTerms;
    }

    public void setLeaseTerms(String leaseTerms) {
        this.leaseTerms = leaseTerms;
    }

    public String getIsListed() {
        return isListed;
    }

    public void setIsListed(String isListed) {
        this.isListed = isListed;
    }

    @Override
    public String toString() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "error";
        }
    }
}

