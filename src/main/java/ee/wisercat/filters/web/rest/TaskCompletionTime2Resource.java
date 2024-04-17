package ee.wisercat.filters.web.rest;

import ee.wisercat.filters.domain.TaskCompletionTime2;
import ee.wisercat.filters.repository.TaskCompletionTime2Repository;
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
 * REST controller for managing {@link ee.wisercat.filters.domain.TaskCompletionTime2}.
 */
@RestController
@RequestMapping("/api/task-completion-time-2-s")
@Transactional
public class TaskCompletionTime2Resource {

    private final Logger log = LoggerFactory.getLogger(TaskCompletionTime2Resource.class);

    private static final String ENTITY_NAME = "taskCompletionTime2";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskCompletionTime2Repository taskCompletionTime2Repository;

    public TaskCompletionTime2Resource(TaskCompletionTime2Repository taskCompletionTime2Repository) {
        this.taskCompletionTime2Repository = taskCompletionTime2Repository;
    }

    /**
     * {@code POST  /task-completion-time-2-s} : Create a new taskCompletionTime2.
     *
     * @param taskCompletionTime2 the taskCompletionTime2 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taskCompletionTime2, or with status {@code 400 (Bad Request)} if the taskCompletionTime2 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TaskCompletionTime2> createTaskCompletionTime2(@RequestBody TaskCompletionTime2 taskCompletionTime2)
        throws URISyntaxException {
        log.debug("REST request to save TaskCompletionTime2 : {}", taskCompletionTime2);
        if (taskCompletionTime2.getId() != null) {
            throw new BadRequestAlertException("A new taskCompletionTime2 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskCompletionTime2 result = taskCompletionTime2Repository.save(taskCompletionTime2);
        return ResponseEntity
            .created(new URI("/api/task-completion-time-2-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-completion-time-2-s/:id} : Updates an existing taskCompletionTime2.
     *
     * @param id the id of the taskCompletionTime2 to save.
     * @param taskCompletionTime2 the taskCompletionTime2 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskCompletionTime2,
     * or with status {@code 400 (Bad Request)} if the taskCompletionTime2 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taskCompletionTime2 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TaskCompletionTime2> updateTaskCompletionTime2(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TaskCompletionTime2 taskCompletionTime2
    ) throws URISyntaxException {
        log.debug("REST request to update TaskCompletionTime2 : {}, {}", id, taskCompletionTime2);
        if (taskCompletionTime2.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskCompletionTime2.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!taskCompletionTime2Repository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TaskCompletionTime2 result = taskCompletionTime2Repository.save(taskCompletionTime2);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, taskCompletionTime2.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /task-completion-time-2-s/:id} : Partial updates given fields of an existing taskCompletionTime2, field will ignore if it is null
     *
     * @param id the id of the taskCompletionTime2 to save.
     * @param taskCompletionTime2 the taskCompletionTime2 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskCompletionTime2,
     * or with status {@code 400 (Bad Request)} if the taskCompletionTime2 is not valid,
     * or with status {@code 404 (Not Found)} if the taskCompletionTime2 is not found,
     * or with status {@code 500 (Internal Server Error)} if the taskCompletionTime2 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TaskCompletionTime2> partialUpdateTaskCompletionTime2(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TaskCompletionTime2 taskCompletionTime2
    ) throws URISyntaxException {
        log.debug("REST request to partial update TaskCompletionTime2 partially : {}, {}", id, taskCompletionTime2);
        if (taskCompletionTime2.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskCompletionTime2.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!taskCompletionTime2Repository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TaskCompletionTime2> result = taskCompletionTime2Repository
            .findById(taskCompletionTime2.getId())
            .map(existingTaskCompletionTime2 -> {
                if (taskCompletionTime2.getParticipantName() != null) {
                    existingTaskCompletionTime2.setParticipantName(taskCompletionTime2.getParticipantName());
                }
                if (taskCompletionTime2.getSex() != null) {
                    existingTaskCompletionTime2.setSex(taskCompletionTime2.getSex());
                }
                if (taskCompletionTime2.getAge() != null) {
                    existingTaskCompletionTime2.setAge(taskCompletionTime2.getAge());
                }
                if (taskCompletionTime2.getTimeSeconds() != null) {
                    existingTaskCompletionTime2.setTimeSeconds(taskCompletionTime2.getTimeSeconds());
                }

                return existingTaskCompletionTime2;
            })
            .map(taskCompletionTime2Repository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, taskCompletionTime2.getId().toString())
        );
    }

    /**
     * {@code GET  /task-completion-time-2-s} : get all the taskCompletionTime2s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taskCompletionTime2s in body.
     */
    @GetMapping("")
    public List<TaskCompletionTime2> getAllTaskCompletionTime2s() {
        log.debug("REST request to get all TaskCompletionTime2s");
        return taskCompletionTime2Repository.findAll();
    }

    /**
     * {@code GET  /task-completion-time-2-s/:id} : get the "id" taskCompletionTime2.
     *
     * @param id the id of the taskCompletionTime2 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taskCompletionTime2, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TaskCompletionTime2> getTaskCompletionTime2(@PathVariable Long id) {
        log.debug("REST request to get TaskCompletionTime2 : {}", id);
        Optional<TaskCompletionTime2> taskCompletionTime2 = taskCompletionTime2Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(taskCompletionTime2);
    }

    /**
     * {@code DELETE  /task-completion-time-2-s/:id} : delete the "id" taskCompletionTime2.
     *
     * @param id the id of the taskCompletionTime2 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskCompletionTime2(@PathVariable Long id) {
        log.debug("REST request to delete TaskCompletionTime2 : {}", id);
        taskCompletionTime2Repository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
