package ee.wisercat.filters.web.rest;

import ee.wisercat.filters.domain.RevocabilityPasswordChangeTime;
import ee.wisercat.filters.repository.RevocabilityPasswordChangeTimeRepository;
import ee.wisercat.filters.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link ee.wisercat.filters.domain.RevocabilityPasswordChangeTime}.
 */
@RestController
@RequestMapping("/api/revocability-password-change-times")
@Transactional
public class RevocabilityPasswordChangeTimeResource {

    private final Logger log = LoggerFactory.getLogger(RevocabilityPasswordChangeTimeResource.class);

    private static final String ENTITY_NAME = "revocabilityPasswordChangeTime";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RevocabilityPasswordChangeTimeRepository revocabilityPasswordChangeTimeRepository;

    public RevocabilityPasswordChangeTimeResource(RevocabilityPasswordChangeTimeRepository revocabilityPasswordChangeTimeRepository) {
        this.revocabilityPasswordChangeTimeRepository = revocabilityPasswordChangeTimeRepository;
    }

    /**
     * {@code POST  /revocability-password-change-times} : Create a new revocabilityPasswordChangeTime.
     *
     * @param revocabilityPasswordChangeTime the revocabilityPasswordChangeTime to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new revocabilityPasswordChangeTime, or with status {@code 400 (Bad Request)} if the revocabilityPasswordChangeTime has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<RevocabilityPasswordChangeTime> createRevocabilityPasswordChangeTime(
        @RequestBody RevocabilityPasswordChangeTime revocabilityPasswordChangeTime
    ) throws URISyntaxException {
        log.debug("REST request to save RevocabilityPasswordChangeTime : {}", revocabilityPasswordChangeTime);
        if (revocabilityPasswordChangeTime.getId() != null) {
            throw new BadRequestAlertException("A new revocabilityPasswordChangeTime cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RevocabilityPasswordChangeTime result = revocabilityPasswordChangeTimeRepository.save(revocabilityPasswordChangeTime);
        return ResponseEntity
            .created(new URI("/api/revocability-password-change-times/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /revocability-password-change-times/:id} : Updates an existing revocabilityPasswordChangeTime.
     *
     * @param id the id of the revocabilityPasswordChangeTime to save.
     * @param revocabilityPasswordChangeTime the revocabilityPasswordChangeTime to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated revocabilityPasswordChangeTime,
     * or with status {@code 400 (Bad Request)} if the revocabilityPasswordChangeTime is not valid,
     * or with status {@code 500 (Internal Server Error)} if the revocabilityPasswordChangeTime couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<RevocabilityPasswordChangeTime> updateRevocabilityPasswordChangeTime(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RevocabilityPasswordChangeTime revocabilityPasswordChangeTime
    ) throws URISyntaxException {
        log.debug("REST request to update RevocabilityPasswordChangeTime : {}, {}", id, revocabilityPasswordChangeTime);
        if (revocabilityPasswordChangeTime.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, revocabilityPasswordChangeTime.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!revocabilityPasswordChangeTimeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RevocabilityPasswordChangeTime result = revocabilityPasswordChangeTimeRepository.save(revocabilityPasswordChangeTime);
        return ResponseEntity
            .ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, revocabilityPasswordChangeTime.getId().toString())
            )
            .body(result);
    }

    /**
     * {@code PATCH  /revocability-password-change-times/:id} : Partial updates given fields of an existing revocabilityPasswordChangeTime, field will ignore if it is null
     *
     * @param id the id of the revocabilityPasswordChangeTime to save.
     * @param revocabilityPasswordChangeTime the revocabilityPasswordChangeTime to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated revocabilityPasswordChangeTime,
     * or with status {@code 400 (Bad Request)} if the revocabilityPasswordChangeTime is not valid,
     * or with status {@code 404 (Not Found)} if the revocabilityPasswordChangeTime is not found,
     * or with status {@code 500 (Internal Server Error)} if the revocabilityPasswordChangeTime couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RevocabilityPasswordChangeTime> partialUpdateRevocabilityPasswordChangeTime(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RevocabilityPasswordChangeTime revocabilityPasswordChangeTime
    ) throws URISyntaxException {
        log.debug("REST request to partial update RevocabilityPasswordChangeTime partially : {}, {}", id, revocabilityPasswordChangeTime);
        if (revocabilityPasswordChangeTime.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, revocabilityPasswordChangeTime.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!revocabilityPasswordChangeTimeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RevocabilityPasswordChangeTime> result = revocabilityPasswordChangeTimeRepository
            .findById(revocabilityPasswordChangeTime.getId())
            .map(existingRevocabilityPasswordChangeTime -> {
                if (revocabilityPasswordChangeTime.getParticipantName() != null) {
                    existingRevocabilityPasswordChangeTime.setParticipantName(revocabilityPasswordChangeTime.getParticipantName());
                }
                if (revocabilityPasswordChangeTime.getSex() != null) {
                    existingRevocabilityPasswordChangeTime.setSex(revocabilityPasswordChangeTime.getSex());
                }
                if (revocabilityPasswordChangeTime.getAge() != null) {
                    existingRevocabilityPasswordChangeTime.setAge(revocabilityPasswordChangeTime.getAge());
                }
                if (revocabilityPasswordChangeTime.getTimeSeconds() != null) {
                    existingRevocabilityPasswordChangeTime.setTimeSeconds(revocabilityPasswordChangeTime.getTimeSeconds());
                }
                if (revocabilityPasswordChangeTime.getErrors() != null) {
                    existingRevocabilityPasswordChangeTime.setErrors(revocabilityPasswordChangeTime.getErrors());
                }

                return existingRevocabilityPasswordChangeTime;
            })
            .map(revocabilityPasswordChangeTimeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, revocabilityPasswordChangeTime.getId().toString())
        );
    }

    /**
     * {@code GET  /revocability-password-change-times} : get all the revocabilityPasswordChangeTimes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of revocabilityPasswordChangeTimes in body.
     */
    @GetMapping("")
    public List<RevocabilityPasswordChangeTime> getAllRevocabilityPasswordChangeTimes() {
        log.debug("REST request to get all RevocabilityPasswordChangeTimes");
        return revocabilityPasswordChangeTimeRepository.findAll();
    }

    /**
     * {@code GET  /revocability-password-change-times/:id} : get the "id" revocabilityPasswordChangeTime.
     *
     * @param id the id of the revocabilityPasswordChangeTime to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the revocabilityPasswordChangeTime, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<RevocabilityPasswordChangeTime> getRevocabilityPasswordChangeTime(@PathVariable Long id) {
        log.debug("REST request to get RevocabilityPasswordChangeTime : {}", id);
        Optional<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTime = revocabilityPasswordChangeTimeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(revocabilityPasswordChangeTime);
    }

    /**
     * {@code DELETE  /revocability-password-change-times/:id} : delete the "id" revocabilityPasswordChangeTime.
     *
     * @param id the id of the revocabilityPasswordChangeTime to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRevocabilityPasswordChangeTime(@PathVariable Long id) {
        log.debug("REST request to delete RevocabilityPasswordChangeTime : {}", id);
        revocabilityPasswordChangeTimeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
