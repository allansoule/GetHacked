package app.iut.gethacked.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Request.
 */
@Entity
@Table(name = "request")
public class Request implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "pricing")
    private String pricing;

    @Column(name = "description")
    private String description;

    @Column(name = "jhi_date")
    private Instant date;

    @Column(name = "jhi_scope")
    private String scope;

    @ManyToOne
    @JsonIgnoreProperties("requests")
    private ThirdParty thirdParty;

    @OneToMany(mappedBy = "request")
    private Set<Report> reports = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Request title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPricing() {
        return pricing;
    }

    public Request pricing(String pricing) {
        this.pricing = pricing;
        return this;
    }

    public void setPricing(String pricing) {
        this.pricing = pricing;
    }

    public String getDescription() {
        return description;
    }

    public Request description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getDate() {
        return date;
    }

    public Request date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getScope() {
        return scope;
    }

    public Request scope(String scope) {
        this.scope = scope;
        return this;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public ThirdParty getThirdParty() {
        return thirdParty;
    }

    public Request thirdParty(ThirdParty thirdParty) {
        this.thirdParty = thirdParty;
        return this;
    }

    public void setThirdParty(ThirdParty thirdParty) {
        this.thirdParty = thirdParty;
    }

    public Set<Report> getReports() {
        return reports;
    }

    public Request reports(Set<Report> reports) {
        this.reports = reports;
        return this;
    }

    public Request addReport(Report report) {
        this.reports.add(report);
        report.setRequest(this);
        return this;
    }

    public Request removeReport(Report report) {
        this.reports.remove(report);
        report.setRequest(null);
        return this;
    }

    public void setReports(Set<Report> reports) {
        this.reports = reports;
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
        Request request = (Request) o;
        if (request.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), request.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Request{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", pricing='" + getPricing() + "'" +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            ", scope='" + getScope() + "'" +
            "}";
    }
}
