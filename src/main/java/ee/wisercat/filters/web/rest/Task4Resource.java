package ee.wisercat.filters.web.rest;

import ee.wisercat.filters.domain.Task4;
import ee.wisercat.filters.repository.Task4Repository;
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
 * REST controller for managing {@link ee.wisercat.filters.domain.Task4}.
 */
@RestController
@RequestMapping("/api/task-4-s")
@Transactional
public class Task4Resource {

    private final Logger log = LoggerFactory.getLogger(Task4Resource.class);

    private static final String ENTITY_NAME = "task4";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Task4Repository task4Repository;

    public Task4Resource(Task4Repository task4Repository) {
        this.task4Repository = task4Repository;
    }

    /**
     * {@code POST  /task-4-s} : Create a new task4.
     *
     * @param task4 the task4 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new task4, or with status {@code 400 (Bad Request)} if the task4 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Task4> createTask4(@Valid @RequestBody Task4 task4) throws URISyntaxException {
        log.debug("REST request to save Task4 : {}", task4);
        if (task4.getId() != null) {
            throw new BadRequestAlertException("A new task4 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Task4 result = task4Repository.save(task4);
        return ResponseEntity
            .created(new URI("/api/task-4-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-4-s/:id} : Updates an existing task4.
     *
     * @param id the id of the task4 to save.
     * @param task4 the task4 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task4,
     * or with status {@code 400 (Bad Request)} if the task4 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the task4 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task4> updateTask4(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Task4 task4)
        throws URISyntaxException {
        log.debug("REST request to update Task4 : {}, {}", id, task4);
        if (task4.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task4.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!task4Repository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Task4 result = task4Repository.save(task4);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, task4.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /task-4-s/:id} : Partial updates given fields of an existing task4, field will ignore if it is null
     *
     * @param id the id of the task4 to save.
     * @param task4 the task4 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task4,
     * or with status {@code 400 (Bad Request)} if the task4 is not valid,
     * or with status {@code 404 (Not Found)} if the task4 is not found,
     * or with status {@code 500 (Internal Server Error)} if the task4 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Task4> partialUpdateTask4(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Task4 task4
    ) throws URISyntaxException {
        log.debug("REST request to partial update Task4 partially : {}, {}", id, task4);
        if (task4.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task4.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!task4Repository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Task4> result = task4Repository
            .findById(task4.getId())
            .map(existingTask4 -> {
                if (task4.getParticipantName() != null) {
                    existingTask4.setParticipantName(task4.getParticipantName());
                }
                if (task4.getSex() != null) {
                    existingTask4.setSex(task4.getSex());
                }
                if (task4.getAge() != null) {
                    existingTask4.setAge(task4.getAge());
                }
                if (task4.getTaskCompletionTimeSeconds() != null) {
                    existingTask4.setTaskCompletionTimeSeconds(task4.getTaskCompletionTimeSeconds());
                }
                if (task4.getErrors() != null) {
                    existingTask4.setErrors(task4.getErrors());
                }

                return existingTask4;
            })
            .map(task4Repository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, task4.getId().toString())
        );
    }

    /**
     * {@code GET  /task-4-s} : get all the task4s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of task4s in body.
     */
    @GetMapping("")
    public List<Task4> getAllTask4s() {
        log.debug("REST request to get all Task4s");
        return task4Repository.findAll();
    }

    /**
     * {@code GET  /task-4-s/:id} : get the "id" task4.
     *
     * @param id the id of the task4 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the task4, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task4> getTask4(@PathVariable Long id) {
        log.debug("REST request to get Task4 : {}", id);
        Optional<Task4> task4 = task4Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(task4);
    }

    /**
     * {@code DELETE  /task-4-s/:id} : delete the "id" task4.
     *
     * @param id the id of the task4 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask4(@PathVariable Long id) {
        log.debug("REST request to delete Task4 : {}", id);
        task4Repository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
