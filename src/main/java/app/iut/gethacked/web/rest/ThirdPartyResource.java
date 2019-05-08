package app.iut.gethacked.web.rest;
import app.iut.gethacked.domain.ThirdParty;
import app.iut.gethacked.repository.ThirdPartyRepository;
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
 * REST controller for managing ThirdParty.
 */
@RestController
@RequestMapping("/api")
public class ThirdPartyResource {

    private final Logger log = LoggerFactory.getLogger(ThirdPartyResource.class);

    private static final String ENTITY_NAME = "thirdParty";

    private final ThirdPartyRepository thirdPartyRepository;

    public ThirdPartyResource(ThirdPartyRepository thirdPartyRepository) {
        this.thirdPartyRepository = thirdPartyRepository;
    }

    /**
     * POST  /third-parties : Create a new thirdParty.
     *
     * @param thirdParty the thirdParty to create
     * @return the ResponseEntity with status 201 (Created) and with body the new thirdParty, or with status 400 (Bad Request) if the thirdParty has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/third-parties")
    public ResponseEntity<ThirdParty> createThirdParty(@RequestBody ThirdParty thirdParty) throws URISyntaxException {
        log.debug("REST request to save ThirdParty : {}", thirdParty);
        if (thirdParty.getId() != null) {
            throw new BadRequestAlertException("A new thirdParty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ThirdParty result = thirdPartyRepository.save(thirdParty);
        return ResponseEntity.created(new URI("/api/third-parties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /third-parties : Updates an existing thirdParty.
     *
     * @param thirdParty the thirdParty to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated thirdParty,
     * or with status 400 (Bad Request) if the thirdParty is not valid,
     * or with status 500 (Internal Server Error) if the thirdParty couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/third-parties")
    public ResponseEntity<ThirdParty> updateThirdParty(@RequestBody ThirdParty thirdParty) throws URISyntaxException {
        log.debug("REST request to update ThirdParty : {}", thirdParty);
        if (thirdParty.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ThirdParty result = thirdPartyRepository.save(thirdParty);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, thirdParty.getId().toString()))
            .body(result);
    }

    /**
     * GET  /third-parties : get all the thirdParties.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of thirdParties in body
     */
    @GetMapping("/third-parties")
    public List<ThirdParty> getAllThirdParties() {
        log.debug("REST request to get all ThirdParties");
        return thirdPartyRepository.findAll();
    }

    /**
     * GET  /third-parties/:id : get the "id" thirdParty.
     *
     * @param id the id of the thirdParty to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the thirdParty, or with status 404 (Not Found)
     */
    @GetMapping("/third-parties/{id}")
    public ResponseEntity<ThirdParty> getThirdParty(@PathVariable Long id) {
        log.debug("REST request to get ThirdParty : {}", id);
        Optional<ThirdParty> thirdParty = thirdPartyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(thirdParty);
    }

    /**
     * DELETE  /third-parties/:id : delete the "id" thirdParty.
     *
     * @param id the id of the thirdParty to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/third-parties/{id}")
    public ResponseEntity<Void> deleteThirdParty(@PathVariable Long id) {
        log.debug("REST request to delete ThirdParty : {}", id);
        thirdPartyRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
