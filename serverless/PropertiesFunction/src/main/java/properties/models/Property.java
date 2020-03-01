package properties.models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class Property {

    private String id;
    private String propertyManagerId;
    private String address;
    private String currentLeaseId;
    private String description;
    private String size;
    private Boolean isListed;
    private List<String> leaseContracts;
    private List<String> applications;
    private List<String> images;
    private List<String> leaseTerms;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCurrentLeaseId() {
        return currentLeaseId;
    }

    public void setCurrentLeaseId(String currentLeaseId) {
        this.currentLeaseId = currentLeaseId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Boolean getIsListed() {
        return isListed;
    }

    public void setIsListed(Boolean listed) {
        isListed = listed;
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

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<String> getLeaseTerms() {
        return leaseTerms;
    }

    public void setLeaseTerms(List<String> leaseTerms) {
        this.leaseTerms = leaseTerms;
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

