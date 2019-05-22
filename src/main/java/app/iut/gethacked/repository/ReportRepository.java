package app.iut.gethacked.repository;

import app.iut.gethacked.domain.Report;
import app.iut.gethacked.domain.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Report entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("select report from Report report where report.request = :request")
    List<Report> findReportsForRequest(@Param("request") Request request);

}
