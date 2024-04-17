package ee.wisercat.filters.web.rest;

import ee.wisercat.filters.domain.Task5;
import ee.wisercat.filters.repository.Task5Repository;
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
 * REST controller for managing {@link ee.wisercat.filters.domain.Task5}.
 */
@RestController
@RequestMapping("/api/task-5-s")
@Transactional
public class Task5Resource {

    private final Logger log = LoggerFactory.getLogger(Task5Resource.class);

    private static final String ENTITY_NAME = "task5";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Task5Repository task5Repository;

    public Task5Resource(Task5Repository task5Repository) {
        this.task5Repository = task5Repository;
    }

    /**
     * {@code POST  /task-5-s} : Create a new task5.
     *
     * @param task5 the task5 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new task5, or with status {@code 400 (Bad Request)} if the task5 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Task5> createTask5(@Valid @RequestBody Task5 task5) throws URISyntaxException {
        log.debug("REST request to save Task5 : {}", task5);
        if (task5.getId() != null) {
            throw new BadRequestAlertException("A new task5 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Task5 result = task5Repository.save(task5);
        return ResponseEntity
            .created(new URI("/api/task-5-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-5-s/:id} : Updates an existing task5.
     *
     * @param id the id of the task5 to save.
     * @param task5 the task5 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task5,
     * or with status {@code 400 (Bad Request)} if the task5 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the task5 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task5> updateTask5(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Task5 task5)
        throws URISyntaxException {
        log.debug("REST request to update Task5 : {}, {}", id, task5);
        if (task5.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task5.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!task5Repository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Task5 result = task5Repository.save(task5);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, task5.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /task-5-s/:id} : Partial updates given fields of an existing task5, field will ignore if it is null
     *
     * @param id the id of the task5 to save.
     * @param task5 the task5 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task5,
     * or with status {@code 400 (Bad Request)} if the task5 is not valid,
     * or with status {@code 404 (Not Found)} if the task5 is not found,
     * or with status {@code 500 (Internal Server Error)} if the task5 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Task5> partialUpdateTask5(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Task5 task5
    ) throws URISyntaxException {
        log.debug("REST request to partial update Task5 partially : {}, {}", id, task5);
        if (task5.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task5.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!task5Repository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Task5> result = task5Repository
            .findById(task5.getId())
            .map(existingTask5 -> {
                if (task5.getParticipantName() != null) {
                    existingTask5.setParticipantName(task5.getParticipantName());
                }
                if (task5.getSex() != null) {
                    existingTask5.setSex(task5.getSex());
                }
                if (task5.getAge() != null) {
                    existingTask5.setAge(task5.getAge());
                }
                if (task5.getTaskCompletionTimeSeconds() != null) {
                    existingTask5.setTaskCompletionTimeSeconds(task5.getTaskCompletionTimeSeconds());
                }
                if (task5.getErrors() != null) {
                    existingTask5.setErrors(task5.getErrors());
                }

                return existingTask5;
            })
            .map(task5Repository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, task5.getId().toString())
        );
    }

    /**
     * {@code GET  /task-5-s} : get all the task5s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of task5s in body.
     */
    @GetMapping("")
    public List<Task5> getAllTask5s() {
        log.debug("REST request to get all Task5s");
        return task5Repository.findAll();
    }

    /**
     * {@code GET  /task-5-s/:id} : get the "id" task5.
     *
     * @param id the id of the task5 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the task5, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task5> getTask5(@PathVariable Long id) {
        log.debug("REST request to get Task5 : {}", id);
        Optional<Task5> task5 = task5Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(task5);
    }

    /**
     * {@code DELETE  /task-5-s/:id} : delete the "id" task5.
     *
     * @param id the id of the task5 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask5(@PathVariable Long id) {
        log.debug("REST request to delete Task5 : {}", id);
        task5Repository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
