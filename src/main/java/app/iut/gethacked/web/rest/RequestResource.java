package app.iut.gethacked.web.rest;
import app.iut.gethacked.domain.Report;
import app.iut.gethacked.domain.Request;
import app.iut.gethacked.domain.Request_;
import app.iut.gethacked.repository.ReportRepository;
import app.iut.gethacked.repository.RequestRepository;
import app.iut.gethacked.repository.ThirdPartyRepository;
import app.iut.gethacked.service.ThirdpartyService;
import app.iut.gethacked.service.dto.SearchCriteriaDTO;
import app.iut.gethacked.web.rest.errors.BadRequestAlertException;
import app.iut.gethacked.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

/**
 * REST controller for managing Request.
 */
@RestController
@RequestMapping("/api")
public class RequestResource {

    private static final String ENTITY_NAME = "request";
    private final Logger log = LoggerFactory.getLogger(RequestResource.class);
    private final RequestRepository requestRepository;
    private final ReportRepository reportRepository;
    private final ThirdPartyRepository thirdPartyRepository;
    private final ThirdpartyService thirdPartyService;
    public RequestResource(RequestRepository requestRepository, ReportRepository reportRepository,ThirdPartyRepository thirdPartyRepository,ThirdpartyService thirdPartyService) {
        this.requestRepository = requestRepository;
        this.reportRepository = reportRepository;
        this.thirdPartyRepository = thirdPartyRepository;
        this.thirdPartyService = thirdPartyService;
    }

    /**
     * POST  /requests : Create a new request.
     *
     * @param request the request to create
     * @return the ResponseEntity with status 201 (Created) and with body the new request, or with status 400 (Bad Request) if the request has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/requests")
    public ResponseEntity<Request> createRequest(@RequestBody Request request) throws URISyntaxException {
        if (request.getId() != null) {
            throw new BadRequestAlertException("A new request cannot already have an ID", ENTITY_NAME, "idexists");
        }
        request.setThirdParty(thirdPartyService.thirdpartyOfCurrentUser());
        Request result = requestRepository.save(request);
        return ResponseEntity.created(new URI("/api/requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * POST  /requests : Create a new request.
     *
     * @return the ResponseEntity with status 201 (Created) and with body the new request, or with status 400 (Bad Request) if the request has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @GetMapping("/requests/third-party")
    public List<Request> getRequestByThirdParty() throws URISyntaxException {
        return requestRepository.findRequestByThirdParty(thirdPartyService.thirdpartyOfCurrentUser());
    }

    /**
     * GET  /requests/:id : get the "id" request.
     *
     * @param id the id of the request to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the request, or with status 404 (Not Found)
     */
    @GetMapping("/requests/{id}")
    public ResponseEntity<Request> getRequest(@PathVariable Long id) {
        log.debug("REST request to get Request : {}", id);
        Optional<Request> request = requestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(request);
    }

    /**
     * PUT  /requests : Updates an existing request.
     *
     * @param request the request to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated request,
     * or with status 400 (Bad Request) if the request is not valid,
     * or with status 500 (Internal Server Error) if the request couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/requests")
    public ResponseEntity<Request> updateRequest(@RequestBody Request request) throws URISyntaxException {
        log.debug("REST request to update Request : {}", request);
        if (request.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Request result = requestRepository.save(request);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, request.getId().toString()))
            .body(result);
    }

    /**
     * GET  /requests/:id : get the "id" request.
     *
     * @param id the id of the request to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the request, or with status 404 (Not Found)
     */
    @GetMapping("/requests/reports/{id}")
    public List<Report> getReportsFromRequest(@PathVariable Long id) {
        log.debug("REST request to get Request : {}", id);
        List<Report> request = reportRepository.findReportsForRequest(requestRepository.findById(id).get());
        return request;
    }

    @GetMapping("/requests/reports/third-party")
    public Set<Request> getRequestByReportsThirdParty() throws URISyntaxException {
        Set<Request> requestsList = new HashSet<>();

        for (Report r : reportRepository.findReportsByThirdparty(thirdPartyService.thirdpartyOfCurrentUser())) {
            Request request = reportRepository.findRequestReport(r.getId());
            requestsList.add(request);
        }
        return requestsList;
    }

    /**
     * GET  /requests : get all the requests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of requests in body
     */
    @GetMapping("/requests")
    public List<Request> getAllRequests() {
        log.debug("REST request to get all Requests");
        return requestRepository.findAll();
    }

    /**
     * GET  /requests : get all the requests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of requests in body
     */
    @PostMapping("/requests/search")
    public List<Request> getRequestByType(@RequestBody SearchCriteriaDTO search) {
        Specification<Request> spec = new Specification<Request>() {
            @Override
            public Predicate toPredicate(Root<Request> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Predicate res = null;
                if (search.scopeEqual != null){
                    Predicate p = cb.equal(root.get(Request_.scope), search.scopeEqual);
                    res = (res == null) ? p : cb.and(res,p);
                }
                if (search.scopeLike != null){
                    Predicate p = cb.like(root.get(Request_.scope), search.scopeLike);
                    res = (res == null) ? p : cb.and(res,p);
                }
                if (search.title != null){
                    Predicate p = cb.equal(root.get(Request_.title), search.title);
                    res = (res == null) ? p : cb.and(res,p);
                }
                if (search.description != null){
                    Predicate p = cb.like(root.get(Request_.description), "%"+search.description+"%");
                    res = (res == null) ? p : cb.and(res,p);
                }
                return res;

            }
        };


        List<Request> requests = requestRepository.findAll(spec);
        return requests;
    }

    /**
     * DELETE  /requests/:id : delete the "id" request.
     *
     * @param id the id of the request to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/requests/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        log.debug("REST request to delete Request : {}", id);
        requestRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
