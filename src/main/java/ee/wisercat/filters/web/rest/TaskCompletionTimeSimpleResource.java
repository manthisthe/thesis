package ee.wisercat.filters.web.rest;

import ee.wisercat.filters.domain.TaskCompletionTimeSimple;
import ee.wisercat.filters.repository.TaskCompletionTimeSimpleRepository;
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
 * REST controller for managing {@link ee.wisercat.filters.domain.TaskCompletionTimeSimple}.
 */
@RestController
@RequestMapping("/api/task-completion-time-simples")
@Transactional
public class TaskCompletionTimeSimpleResource {

    private final Logger log = LoggerFactory.getLogger(TaskCompletionTimeSimpleResource.class);

    private static final String ENTITY_NAME = "taskCompletionTimeSimple";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskCompletionTimeSimpleRepository taskCompletionTimeSimpleRepository;

    public TaskCompletionTimeSimpleResource(TaskCompletionTimeSimpleRepository taskCompletionTimeSimpleRepository) {
        this.taskCompletionTimeSimpleRepository = taskCompletionTimeSimpleRepository;
    }

    /**
     * {@code POST  /task-completion-time-simples} : Create a new taskCompletionTimeSimple.
     *
     * @param taskCompletionTimeSimple the taskCompletionTimeSimple to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taskCompletionTimeSimple, or with status {@code 400 (Bad Request)} if the taskCompletionTimeSimple has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TaskCompletionTimeSimple> createTaskCompletionTimeSimple(
        @RequestBody TaskCompletionTimeSimple taskCompletionTimeSimple
    ) throws URISyntaxException {
        log.debug("REST request to save TaskCompletionTimeSimple : {}", taskCompletionTimeSimple);
        if (taskCompletionTimeSimple.getId() != null) {
            throw new BadRequestAlertException("A new taskCompletionTimeSimple cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskCompletionTimeSimple result = taskCompletionTimeSimpleRepository.save(taskCompletionTimeSimple);
        return ResponseEntity
            .created(new URI("/api/task-completion-time-simples/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-completion-time-simples/:id} : Updates an existing taskCompletionTimeSimple.
     *
     * @param id the id of the taskCompletionTimeSimple to save.
     * @param taskCompletionTimeSimple the taskCompletionTimeSimple to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskCompletionTimeSimple,
     * or with status {@code 400 (Bad Request)} if the taskCompletionTimeSimple is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taskCompletionTimeSimple couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TaskCompletionTimeSimple> updateTaskCompletionTimeSimple(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TaskCompletionTimeSimple taskCompletionTimeSimple
    ) throws URISyntaxException {
        log.debug("REST request to update TaskCompletionTimeSimple : {}, {}", id, taskCompletionTimeSimple);
        if (taskCompletionTimeSimple.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskCompletionTimeSimple.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!taskCompletionTimeSimpleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TaskCompletionTimeSimple result = taskCompletionTimeSimpleRepository.save(taskCompletionTimeSimple);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, taskCompletionTimeSimple.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /task-completion-time-simples/:id} : Partial updates given fields of an existing taskCompletionTimeSimple, field will ignore if it is null
     *
     * @param id the id of the taskCompletionTimeSimple to save.
     * @param taskCompletionTimeSimple the taskCompletionTimeSimple to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskCompletionTimeSimple,
     * or with status {@code 400 (Bad Request)} if the taskCompletionTimeSimple is not valid,
     * or with status {@code 404 (Not Found)} if the taskCompletionTimeSimple is not found,
     * or with status {@code 500 (Internal Server Error)} if the taskCompletionTimeSimple couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TaskCompletionTimeSimple> partialUpdateTaskCompletionTimeSimple(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TaskCompletionTimeSimple taskCompletionTimeSimple
    ) throws URISyntaxException {
        log.debug("REST request to partial update TaskCompletionTimeSimple partially : {}, {}", id, taskCompletionTimeSimple);
        if (taskCompletionTimeSimple.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskCompletionTimeSimple.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!taskCompletionTimeSimpleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TaskCompletionTimeSimple> result = taskCompletionTimeSimpleRepository
            .findById(taskCompletionTimeSimple.getId())
            .map(existingTaskCompletionTimeSimple -> {
                if (taskCompletionTimeSimple.getParticipantName() != null) {
                    existingTaskCompletionTimeSimple.setParticipantName(taskCompletionTimeSimple.getParticipantName());
                }
                if (taskCompletionTimeSimple.getSex() != null) {
                    existingTaskCompletionTimeSimple.setSex(taskCompletionTimeSimple.getSex());
                }
                if (taskCompletionTimeSimple.getAge() != null) {
                    existingTaskCompletionTimeSimple.setAge(taskCompletionTimeSimple.getAge());
                }
                if (taskCompletionTimeSimple.getTimeMills() != null) {
                    existingTaskCompletionTimeSimple.setTimeMills(taskCompletionTimeSimple.getTimeMills());
                }
                if (taskCompletionTimeSimple.getErrors() != null) {
                    existingTaskCompletionTimeSimple.setErrors(taskCompletionTimeSimple.getErrors());
                }

                return existingTaskCompletionTimeSimple;
            })
            .map(taskCompletionTimeSimpleRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, taskCompletionTimeSimple.getId().toString())
        );
    }

    /**
     * {@code GET  /task-completion-time-simples} : get all the taskCompletionTimeSimples.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taskCompletionTimeSimples in body.
     */
    @GetMapping("")
    public List<TaskCompletionTimeSimple> getAllTaskCompletionTimeSimples() {
        log.debug("REST request to get all TaskCompletionTimeSimples");
        return taskCompletionTimeSimpleRepository.findAll();
    }

    /**
     * {@code GET  /task-completion-time-simples/:id} : get the "id" taskCompletionTimeSimple.
     *
     * @param id the id of the taskCompletionTimeSimple to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taskCompletionTimeSimple, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TaskCompletionTimeSimple> getTaskCompletionTimeSimple(@PathVariable Long id) {
        log.debug("REST request to get TaskCompletionTimeSimple : {}", id);
        Optional<TaskCompletionTimeSimple> taskCompletionTimeSimple = taskCompletionTimeSimpleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(taskCompletionTimeSimple);
    }

    /**
     * {@code DELETE  /task-completion-time-simples/:id} : delete the "id" taskCompletionTimeSimple.
     *
     * @param id the id of the taskCompletionTimeSimple to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskCompletionTimeSimple(@PathVariable Long id) {
        log.debug("REST request to delete TaskCompletionTimeSimple : {}", id);
        taskCompletionTimeSimpleRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
