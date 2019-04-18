package app.iut.gethacked.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ThirdParty.
 */
@Entity
@Table(name = "third_party")
public class ThirdParty implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "thirdParty")
    private Set<UserThirdPartyMembership> userThirdPartyMemberships = new HashSet<>();
    @OneToMany(mappedBy = "thirdParty")
    private Set<Report> reports = new HashSet<>();
    @OneToMany(mappedBy = "thirdParty")
    private Set<Request> requests = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ThirdParty name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<UserThirdPartyMembership> getUserThirdPartyMemberships() {
        return userThirdPartyMemberships;
    }

    public ThirdParty userThirdPartyMemberships(Set<UserThirdPartyMembership> userThirdPartyMemberships) {
        this.userThirdPartyMemberships = userThirdPartyMemberships;
        return this;
    }

    public ThirdParty addUserThirdPartyMembership(UserThirdPartyMembership userThirdPartyMembership) {
        this.userThirdPartyMemberships.add(userThirdPartyMembership);
        userThirdPartyMembership.setThirdParty(this);
        return this;
    }

    public ThirdParty removeUserThirdPartyMembership(UserThirdPartyMembership userThirdPartyMembership) {
        this.userThirdPartyMemberships.remove(userThirdPartyMembership);
        userThirdPartyMembership.setThirdParty(null);
        return this;
    }

    public void setUserThirdPartyMemberships(Set<UserThirdPartyMembership> userThirdPartyMemberships) {
        this.userThirdPartyMemberships = userThirdPartyMemberships;
    }

    public Set<Report> getReports() {
        return reports;
    }

    public ThirdParty reports(Set<Report> reports) {
        this.reports = reports;
        return this;
    }

    public ThirdParty addReport(Report report) {
        this.reports.add(report);
        report.setThirdParty(this);
        return this;
    }

    public ThirdParty removeReport(Report report) {
        this.reports.remove(report);
        report.setThirdParty(null);
        return this;
    }

    public void setReports(Set<Report> reports) {
        this.reports = reports;
    }

    public Set<Request> getRequests() {
        return requests;
    }

    public ThirdParty requests(Set<Request> requests) {
        this.requests = requests;
        return this;
    }

    public ThirdParty addRequest(Request request) {
        this.requests.add(request);
        request.setThirdParty(this);
        return this;
    }

    public ThirdParty removeRequest(Request request) {
        this.requests.remove(request);
        request.setThirdParty(null);
        return this;
    }

    public void setRequests(Set<Request> requests) {
        this.requests = requests;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ThirdParty thirdParty = (ThirdParty) o;
        if (thirdParty.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), thirdParty.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ThirdParty{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
