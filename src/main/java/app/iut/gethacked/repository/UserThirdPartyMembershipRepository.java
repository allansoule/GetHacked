package app.iut.gethacked.repository;

import app.iut.gethacked.domain.UserThirdPartyMembership;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserThirdPartyMembership entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserThirdPartyMembershipRepository extends JpaRepository<UserThirdPartyMembership, Long> {

    @Query("select user_third_party_membership from UserThirdPartyMembership user_third_party_membership where user_third_party_membership.user.login = ?#{principal.username}")
    List<UserThirdPartyMembership> findByUserIsCurrentUser();

}
