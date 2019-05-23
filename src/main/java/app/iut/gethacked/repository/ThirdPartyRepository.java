package app.iut.gethacked.repository;
import app.iut.gethacked.domain.User;
import app.iut.gethacked.domain.ThirdParty;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ThirdParty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThirdPartyRepository extends JpaRepository<ThirdParty, Long> {
     List<ThirdParty> findAllByMembers_User(User user);
}
