package app.iut.gethacked.repository;

import app.iut.gethacked.domain.Request;
import app.iut.gethacked.domain.ThirdParty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Request entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequestRepository extends JpaRepository<Request, Long>, JpaSpecificationExecutor<Request> {

    @Query("select request from Request request where request.thirdParty = :thirdParty")
    List<Request> findRequestByThirdParty(@Param("thirdParty") ThirdParty thirdParty);
}
