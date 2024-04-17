package ee.wisercat.filters.web.rest;

import ee.wisercat.filters.domain.Task2;
import ee.wisercat.filters.repository.Task2Repository;
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
 * REST controller for managing {@link ee.wisercat.filters.domain.Task2}.
 */
@RestController
@RequestMapping("/api/task-2-s")
@Transactional
public class Task2Resource {

    private final Logger log = LoggerFactory.getLogger(Task2Resource.class);

    private static final String ENTITY_NAME = "task2";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Task2Repository task2Repository;

    public Task2Resource(Task2Repository task2Repository) {
        this.task2Repository = task2Repository;
    }

    /**
     * {@code POST  /task-2-s} : Create a new task2.
     *
     * @param task2 the task2 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new task2, or with status {@code 400 (Bad Request)} if the task2 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Task2> createTask2(@Valid @RequestBody Task2 task2) throws URISyntaxException {
        log.debug("REST request to save Task2 : {}", task2);
        if (task2.getId() != null) {
            throw new BadRequestAlertException("A new task2 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Task2 result = task2Repository.save(task2);
        return ResponseEntity
            .created(new URI("/api/task-2-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-2-s/:id} : Updates an existing task2.
     *
     * @param id the id of the task2 to save.
     * @param task2 the task2 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task2,
     * or with status {@code 400 (Bad Request)} if the task2 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the task2 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task2> updateTask2(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Task2 task2)
        throws URISyntaxException {
        log.debug("REST request to update Task2 : {}, {}", id, task2);
        if (task2.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task2.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!task2Repository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Task2 result = task2Repository.save(task2);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, task2.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /task-2-s/:id} : Partial updates given fields of an existing task2, field will ignore if it is null
     *
     * @param id the id of the task2 to save.
     * @param task2 the task2 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated task2,
     * or with status {@code 400 (Bad Request)} if the task2 is not valid,
     * or with status {@code 404 (Not Found)} if the task2 is not found,
     * or with status {@code 500 (Internal Server Error)} if the task2 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Task2> partialUpdateTask2(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Task2 task2
    ) throws URISyntaxException {
        log.debug("REST request to partial update Task2 partially : {}, {}", id, task2);
        if (task2.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task2.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!task2Repository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Task2> result = task2Repository
            .findById(task2.getId())
            .map(existingTask2 -> {
                if (task2.getParticipantName() != null) {
                    existingTask2.setParticipantName(task2.getParticipantName());
                }
                if (task2.getSex() != null) {
                    existingTask2.setSex(task2.getSex());
                }
                if (task2.getAge() != null) {
                    existingTask2.setAge(task2.getAge());
                }
                if (task2.getTaskCompletionTimeSeconds() != null) {
                    existingTask2.setTaskCompletionTimeSeconds(task2.getTaskCompletionTimeSeconds());
                }
                if (task2.getErrors() != null) {
                    existingTask2.setErrors(task2.getErrors());
                }

                return existingTask2;
            })
            .map(task2Repository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, task2.getId().toString())
        );
    }

    /**
     * {@code GET  /task-2-s} : get all the task2s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of task2s in body.
     */
    @GetMapping("")
    public List<Task2> getAllTask2s() {
        log.debug("REST request to get all Task2s");
        return task2Repository.findAll();
    }

    /**
     * {@code GET  /task-2-s/:id} : get the "id" task2.
     *
     * @param id the id of the task2 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the task2, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task2> getTask2(@PathVariable Long id) {
        log.debug("REST request to get Task2 : {}", id);
        Optional<Task2> task2 = task2Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(task2);
    }

    /**
     * {@code DELETE  /task-2-s/:id} : delete the "id" task2.
     *
     * @param id the id of the task2 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask2(@PathVariable Long id) {
        log.debug("REST request to delete Task2 : {}", id);
        task2Repository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
