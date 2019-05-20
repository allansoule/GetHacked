package app.iut.gethacked.repository;

import app.iut.gethacked.domain.Request;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Request entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
   @Query("select request from Request request where request.scope like %:type%")
   List<Request> findByType(@Param("type") String type);


}
