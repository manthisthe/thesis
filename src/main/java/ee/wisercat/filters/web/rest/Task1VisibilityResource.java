package ee.wisercat.filters.web.rest;

import ee.wisercat.filters.domain.Task1Visibility;
import ee.wisercat.filters.repository.Task1VisibilityRepository;
import ee.wisercat.filters.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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
 * REST controller for managing {@link ee.wisercat.filters.domain.Task1Visibility}.
 */
@RestController
@RequestMapping("/api/task-1-visibilities")
@Transactional
public class Task1VisibilityResource {

    private final Logger log = LoggerFactory.getLogger(Task1VisibilityResource.class);

    private static final String ENTITY_NAME = "task1Visibility";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Task1VisibilityRepository task1VisibilityRepository;

    public Task1VisibilityResource(Task1VisibilityRepository task1VisibilityRepository) {
        this.task1VisibilityRepository = task1VisibilityRepository;
    }

    /**
     * {@code POST  /task-1-visibilities} : Create a new task1Visibility.
     *
     * @param task1Visibility the task1Visibility to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new task1Visibility, or with status {@code 400 (Bad Request)} if the task1Visibility has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Task1Visibility> createTask1Visibility(@Valid @RequestBody Task1Visibility task1Visibility)
        throws URISyntaxException {
        log.debug("REST request to save Task1Visibility : {}", task1Visibility);
        if (task1Visibility.getId() != null) {
            throw new BadRequestAlertException("A new task1Visibility cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Task1Visibility result = task1VisibilityRepository.save(task1Visibility);
        return ResponseEntity
            .created(new URI("/api/task-1-visibilities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-1-visibilities/:id} : Updates an existing task1Visibility.
     *
     * @param id the id of the task1Visibility to save.
     * @param task1Visibility the task1Visibility to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task1Visibility,
     * or with status {@code 400 (Bad Request)} if the task1Visibility is not valid,
     * or with status {@code 500 (Internal Server Error)} if the task1Visibility couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task1Visibility> updateTask1Visibility(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Task1Visibility task1Visibility
    ) throws URISyntaxException {
        log.debug("REST request to update Task1Visibility : {}, {}", id, task1Visibility);
        if (task1Visibility.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task1Visibility.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!task1VisibilityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Task1Visibility result = task1VisibilityRepository.save(task1Visibility);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, task1Visibility.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /task-1-visibilities/:id} : Partial updates given fields of an existing task1Visibility, field will ignore if it is null
     *
     * @param id the id of the task1Visibility to save.
     * @param task1Visibility the task1Visibility to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task1Visibility,
     * or with status {@code 400 (Bad Request)} if the task1Visibility is not valid,
     * or with status {@code 404 (Not Found)} if the task1Visibility is not found,
     * or with status {@code 500 (Internal Server Error)} if the task1Visibility couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Task1Visibility> partialUpdateTask1Visibility(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Task1Visibility task1Visibility
    ) throws URISyntaxException {
        log.debug("REST request to partial update Task1Visibility partially : {}, {}", id, task1Visibility);
        if (task1Visibility.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task1Visibility.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!task1VisibilityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Task1Visibility> result = task1VisibilityRepository
            .findById(task1Visibility.getId())
            .map(existingTask1Visibility -> {
                if (task1Visibility.getParticipantName() != null) {
                    existingTask1Visibility.setParticipantName(task1Visibility.getParticipantName());
                }
                if (task1Visibility.getSex() != null) {
                    existingTask1Visibility.setSex(task1Visibility.getSex());
                }
                if (task1Visibility.getAge() != null) {
                    existingTask1Visibility.setAge(task1Visibility.getAge());
                }
                if (task1Visibility.getTimecompletionTimeSeconds() != null) {
                    existingTask1Visibility.setTimecompletionTimeSeconds(task1Visibility.getTimecompletionTimeSeconds());
                }
                if (task1Visibility.getErrors() != null) {
                    existingTask1Visibility.setErrors(task1Visibility.getErrors());
                }
                if (task1Visibility.getTaskCompleted() != null) {
                    existingTask1Visibility.setTaskCompleted(task1Visibility.getTaskCompleted());
                }

                return existingTask1Visibility;
            })
            .map(task1VisibilityRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, task1Visibility.getId().toString())
        );
    }

    /**
     * {@code GET  /task-1-visibilities} : get all the task1Visibilities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of task1Visibilities in body.
     */
    @GetMapping("")
    public List<Task1Visibility> getAllTask1Visibilities() {
        log.debug("REST request to get all Task1Visibilities");
        return task1VisibilityRepository.findAll();
    }

    /**
     * {@code GET  /task-1-visibilities/:id} : get the "id" task1Visibility.
     *
     * @param id the id of the task1Visibility to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the task1Visibility, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task1Visibility> getTask1Visibility(@PathVariable Long id) {
        log.debug("REST request to get Task1Visibility : {}", id);
        Optional<Task1Visibility> task1Visibility = task1VisibilityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(task1Visibility);
    }

    /**
     * {@code DELETE  /task-1-visibilities/:id} : delete the "id" task1Visibility.
     *
     * @param id the id of the task1Visibility to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask1Visibility(@PathVariable Long id) {
        log.debug("REST request to delete Task1Visibility : {}", id);
        task1VisibilityRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
