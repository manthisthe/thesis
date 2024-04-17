package ee.wisercat.filters.web.rest;

import ee.wisercat.filters.domain.Task3;
import ee.wisercat.filters.repository.Task3Repository;
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
 * REST controller for managing {@link ee.wisercat.filters.domain.Task3}.
 */
@RestController
@RequestMapping("/api/task-3-s")
@Transactional
public class Task3Resource {

    private final Logger log = LoggerFactory.getLogger(Task3Resource.class);

    private static final String ENTITY_NAME = "task3";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Task3Repository task3Repository;

    public Task3Resource(Task3Repository task3Repository) {
        this.task3Repository = task3Repository;
    }

    /**
     * {@code POST  /task-3-s} : Create a new task3.
     *
     * @param task3 the task3 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new task3, or with status {@code 400 (Bad Request)} if the task3 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Task3> createTask3(@Valid @RequestBody Task3 task3) throws URISyntaxException {
        log.debug("REST request to save Task3 : {}", task3);
        if (task3.getId() != null) {
            throw new BadRequestAlertException("A new task3 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Task3 result = task3Repository.save(task3);
        return ResponseEntity
            .created(new URI("/api/task-3-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-3-s/:id} : Updates an existing task3.
     *
     * @param id the id of the task3 to save.
     * @param task3 the task3 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task3,
     * or with status {@code 400 (Bad Request)} if the task3 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the task3 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task3> updateTask3(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Task3 task3)
        throws URISyntaxException {
        log.debug("REST request to update Task3 : {}, {}", id, task3);
        if (task3.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task3.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!task3Repository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Task3 result = task3Repository.save(task3);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, task3.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /task-3-s/:id} : Partial updates given fields of an existing task3, field will ignore if it is null
     *
     * @param id the id of the task3 to save.
     * @param task3 the task3 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task3,
     * or with status {@code 400 (Bad Request)} if the task3 is not valid,
     * or with status {@code 404 (Not Found)} if the task3 is not found,
     * or with status {@code 500 (Internal Server Error)} if the task3 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Task3> partialUpdateTask3(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Task3 task3
    ) throws URISyntaxException {
        log.debug("REST request to partial update Task3 partially : {}, {}", id, task3);
        if (task3.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task3.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!task3Repository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Task3> result = task3Repository
            .findById(task3.getId())
            .map(existingTask3 -> {
                if (task3.getParticipantName() != null) {
                    existingTask3.setParticipantName(task3.getParticipantName());
                }
                if (task3.getSex() != null) {
                    existingTask3.setSex(task3.getSex());
                }
                if (task3.getAge() != null) {
                    existingTask3.setAge(task3.getAge());
                }
                if (task3.getTaskCompletionTimeSeconds() != null) {
                    existingTask3.setTaskCompletionTimeSeconds(task3.getTaskCompletionTimeSeconds());
                }
                if (task3.getErrors() != null) {
                    existingTask3.setErrors(task3.getErrors());
                }

                return existingTask3;
            })
            .map(task3Repository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, task3.getId().toString())
        );
    }

    /**
     * {@code GET  /task-3-s} : get all the task3s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of task3s in body.
     */
    @GetMapping("")
    public List<Task3> getAllTask3s() {
        log.debug("REST request to get all Task3s");
        return task3Repository.findAll();
    }

    /**
     * {@code GET  /task-3-s/:id} : get the "id" task3.
     *
     * @param id the id of the task3 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the task3, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task3> getTask3(@PathVariable Long id) {
        log.debug("REST request to get Task3 : {}", id);
        Optional<Task3> task3 = task3Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(task3);
    }

    /**
     * {@code DELETE  /task-3-s/:id} : delete the "id" task3.
     *
     * @param id the id of the task3 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask3(@PathVariable Long id) {
        log.debug("REST request to delete Task3 : {}", id);
        task3Repository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
