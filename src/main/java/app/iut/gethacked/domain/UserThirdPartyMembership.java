package app.iut.gethacked.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UserThirdPartyMembership.
 */
@Entity
@Table(name = "user_third_party_membership")
public class UserThirdPartyMembership implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @ManyToOne
    @JsonIgnoreProperties("userThirdPartyMemberships")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("userThirdPartyMemberships")
    private ThirdParty thirdParty;

    public UserThirdPartyMembership(ThirdParty thirdParty, User user) {
        this.thirdParty = thirdParty;
        this.user = user;
    }

    public UserThirdPartyMembership(){}

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public UserThirdPartyMembership type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public UserThirdPartyMembership user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ThirdParty getThirdParty() {
        return thirdParty;
    }

    public UserThirdPartyMembership thirdParty(ThirdParty thirdParty) {
        this.thirdParty = thirdParty;
        return this;
    }

    public void setThirdParty(ThirdParty thirdParty) {
        this.thirdParty = thirdParty;
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
        UserThirdPartyMembership userThirdPartyMembership = (UserThirdPartyMembership) o;
        if (userThirdPartyMembership.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userThirdPartyMembership.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserThirdPartyMembership{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
