package app.iut.gethacked.repository;

import app.iut.gethacked.domain.ThirdParty;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ThirdParty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThirdPartyRepository extends JpaRepository<ThirdParty, Long> {

}
