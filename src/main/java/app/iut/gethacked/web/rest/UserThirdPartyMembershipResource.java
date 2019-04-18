package app.iut.gethacked.web.rest;
import app.iut.gethacked.domain.UserThirdPartyMembership;
import app.iut.gethacked.repository.UserThirdPartyMembershipRepository;
import app.iut.gethacked.web.rest.errors.BadRequestAlertException;
import app.iut.gethacked.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserThirdPartyMembership.
 */
@RestController
@RequestMapping("/api")
public class UserThirdPartyMembershipResource {

    private final Logger log = LoggerFactory.getLogger(UserThirdPartyMembershipResource.class);

    private static final String ENTITY_NAME = "userThirdPartyMembership";

    private final UserThirdPartyMembershipRepository userThirdPartyMembershipRepository;

    public UserThirdPartyMembershipResource(UserThirdPartyMembershipRepository userThirdPartyMembershipRepository) {
        this.userThirdPartyMembershipRepository = userThirdPartyMembershipRepository;
    }

    /**
     * POST  /user-third-party-memberships : Create a new userThirdPartyMembership.
     *
     * @param userThirdPartyMembership the userThirdPartyMembership to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userThirdPartyMembership, or with status 400 (Bad Request) if the userThirdPartyMembership has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-third-party-memberships")
    public ResponseEntity<UserThirdPartyMembership> createUserThirdPartyMembership(@RequestBody UserThirdPartyMembership userThirdPartyMembership) throws URISyntaxException {
        log.debug("REST request to save UserThirdPartyMembership : {}", userThirdPartyMembership);
        if (userThirdPartyMembership.getId() != null) {
            throw new BadRequestAlertException("A new userThirdPartyMembership cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserThirdPartyMembership result = userThirdPartyMembershipRepository.save(userThirdPartyMembership);
        return ResponseEntity.created(new URI("/api/user-third-party-memberships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-third-party-memberships : Updates an existing userThirdPartyMembership.
     *
     * @param userThirdPartyMembership the userThirdPartyMembership to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userThirdPartyMembership,
     * or with status 400 (Bad Request) if the userThirdPartyMembership is not valid,
     * or with status 500 (Internal Server Error) if the userThirdPartyMembership couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-third-party-memberships")
    public ResponseEntity<UserThirdPartyMembership> updateUserThirdPartyMembership(@RequestBody UserThirdPartyMembership userThirdPartyMembership) throws URISyntaxException {
        log.debug("REST request to update UserThirdPartyMembership : {}", userThirdPartyMembership);
        if (userThirdPartyMembership.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserThirdPartyMembership result = userThirdPartyMembershipRepository.save(userThirdPartyMembership);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userThirdPartyMembership.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-third-party-memberships : get all the userThirdPartyMemberships.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userThirdPartyMemberships in body
     */
    @GetMapping("/user-third-party-memberships")
    public List<UserThirdPartyMembership> getAllUserThirdPartyMemberships() {
        log.debug("REST request to get all UserThirdPartyMemberships");
        return userThirdPartyMembershipRepository.findAll();
    }

    /**
     * GET  /user-third-party-memberships/:id : get the "id" userThirdPartyMembership.
     *
     * @param id the id of the userThirdPartyMembership to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userThirdPartyMembership, or with status 404 (Not Found)
     */
    @GetMapping("/user-third-party-memberships/{id}")
    public ResponseEntity<UserThirdPartyMembership> getUserThirdPartyMembership(@PathVariable Long id) {
        log.debug("REST request to get UserThirdPartyMembership : {}", id);
        Optional<UserThirdPartyMembership> userThirdPartyMembership = userThirdPartyMembershipRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userThirdPartyMembership);
    }

    /**
     * DELETE  /user-third-party-memberships/:id : delete the "id" userThirdPartyMembership.
     *
     * @param id the id of the userThirdPartyMembership to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-third-party-memberships/{id}")
    public ResponseEntity<Void> deleteUserThirdPartyMembership(@PathVariable Long id) {
        log.debug("REST request to delete UserThirdPartyMembership : {}", id);
        userThirdPartyMembershipRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
