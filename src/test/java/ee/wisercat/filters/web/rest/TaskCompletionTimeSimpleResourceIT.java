package ee.wisercat.filters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ee.wisercat.filters.IntegrationTest;
import ee.wisercat.filters.domain.TaskCompletionTimeSimple;
import ee.wisercat.filters.domain.enumeration.Sex;
import ee.wisercat.filters.repository.TaskCompletionTimeSimpleRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TaskCompletionTimeSimpleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TaskCompletionTimeSimpleResourceIT {

    private static final String DEFAULT_PARTICIPANT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARTICIPANT_NAME = "BBBBBBBBBB";

    private static final Sex DEFAULT_SEX = Sex.M;
    private static final Sex UPDATED_SEX = Sex.F;

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final Integer DEFAULT_TIME_MILLS = 1;
    private static final Integer UPDATED_TIME_MILLS = 2;

    private static final Integer DEFAULT_ERRORS = 1;
    private static final Integer UPDATED_ERRORS = 2;

    private static final String ENTITY_API_URL = "/api/task-completion-time-simples";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TaskCompletionTimeSimpleRepository taskCompletionTimeSimpleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTaskCompletionTimeSimpleMockMvc;

    private TaskCompletionTimeSimple taskCompletionTimeSimple;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskCompletionTimeSimple createEntity(EntityManager em) {
        TaskCompletionTimeSimple taskCompletionTimeSimple = new TaskCompletionTimeSimple()
            .participantName(DEFAULT_PARTICIPANT_NAME)
            .sex(DEFAULT_SEX)
            .age(DEFAULT_AGE)
            .timeMills(DEFAULT_TIME_MILLS)
            .errors(DEFAULT_ERRORS);
        return taskCompletionTimeSimple;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskCompletionTimeSimple createUpdatedEntity(EntityManager em) {
        TaskCompletionTimeSimple taskCompletionTimeSimple = new TaskCompletionTimeSimple()
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timeMills(UPDATED_TIME_MILLS)
            .errors(UPDATED_ERRORS);
        return taskCompletionTimeSimple;
    }

    @BeforeEach
    public void initTest() {
        taskCompletionTimeSimple = createEntity(em);
    }

    @Test
    @Transactional
    void createTaskCompletionTimeSimple() throws Exception {
        int databaseSizeBeforeCreate = taskCompletionTimeSimpleRepository.findAll().size();
        // Create the TaskCompletionTimeSimple
        restTaskCompletionTimeSimpleMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTimeSimple))
            )
            .andExpect(status().isCreated());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeCreate + 1);
        TaskCompletionTimeSimple testTaskCompletionTimeSimple = taskCompletionTimeSimpleList.get(taskCompletionTimeSimpleList.size() - 1);
        assertThat(testTaskCompletionTimeSimple.getParticipantName()).isEqualTo(DEFAULT_PARTICIPANT_NAME);
        assertThat(testTaskCompletionTimeSimple.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTaskCompletionTimeSimple.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTaskCompletionTimeSimple.getTimeMills()).isEqualTo(DEFAULT_TIME_MILLS);
        assertThat(testTaskCompletionTimeSimple.getErrors()).isEqualTo(DEFAULT_ERRORS);
    }

    @Test
    @Transactional
    void createTaskCompletionTimeSimpleWithExistingId() throws Exception {
        // Create the TaskCompletionTimeSimple with an existing ID
        taskCompletionTimeSimple.setId(1L);

        int databaseSizeBeforeCreate = taskCompletionTimeSimpleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskCompletionTimeSimpleMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTimeSimple))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTaskCompletionTimeSimples() throws Exception {
        // Initialize the database
        taskCompletionTimeSimpleRepository.saveAndFlush(taskCompletionTimeSimple);

        // Get all the taskCompletionTimeSimpleList
        restTaskCompletionTimeSimpleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskCompletionTimeSimple.getId().intValue())))
            .andExpect(jsonPath("$.[*].participantName").value(hasItem(DEFAULT_PARTICIPANT_NAME)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].timeMills").value(hasItem(DEFAULT_TIME_MILLS)))
            .andExpect(jsonPath("$.[*].errors").value(hasItem(DEFAULT_ERRORS)));
    }

    @Test
    @Transactional
    void getTaskCompletionTimeSimple() throws Exception {
        // Initialize the database
        taskCompletionTimeSimpleRepository.saveAndFlush(taskCompletionTimeSimple);

        // Get the taskCompletionTimeSimple
        restTaskCompletionTimeSimpleMockMvc
            .perform(get(ENTITY_API_URL_ID, taskCompletionTimeSimple.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(taskCompletionTimeSimple.getId().intValue()))
            .andExpect(jsonPath("$.participantName").value(DEFAULT_PARTICIPANT_NAME))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.timeMills").value(DEFAULT_TIME_MILLS))
            .andExpect(jsonPath("$.errors").value(DEFAULT_ERRORS));
    }

    @Test
    @Transactional
    void getNonExistingTaskCompletionTimeSimple() throws Exception {
        // Get the taskCompletionTimeSimple
        restTaskCompletionTimeSimpleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTaskCompletionTimeSimple() throws Exception {
        // Initialize the database
        taskCompletionTimeSimpleRepository.saveAndFlush(taskCompletionTimeSimple);

        int databaseSizeBeforeUpdate = taskCompletionTimeSimpleRepository.findAll().size();

        // Update the taskCompletionTimeSimple
        TaskCompletionTimeSimple updatedTaskCompletionTimeSimple = taskCompletionTimeSimpleRepository
            .findById(taskCompletionTimeSimple.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedTaskCompletionTimeSimple are not directly saved in db
        em.detach(updatedTaskCompletionTimeSimple);
        updatedTaskCompletionTimeSimple
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timeMills(UPDATED_TIME_MILLS)
            .errors(UPDATED_ERRORS);

        restTaskCompletionTimeSimpleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTaskCompletionTimeSimple.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTaskCompletionTimeSimple))
            )
            .andExpect(status().isOk());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeUpdate);
        TaskCompletionTimeSimple testTaskCompletionTimeSimple = taskCompletionTimeSimpleList.get(taskCompletionTimeSimpleList.size() - 1);
        assertThat(testTaskCompletionTimeSimple.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTaskCompletionTimeSimple.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTaskCompletionTimeSimple.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTaskCompletionTimeSimple.getTimeMills()).isEqualTo(UPDATED_TIME_MILLS);
        assertThat(testTaskCompletionTimeSimple.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void putNonExistingTaskCompletionTimeSimple() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTimeSimpleRepository.findAll().size();
        taskCompletionTimeSimple.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskCompletionTimeSimpleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, taskCompletionTimeSimple.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTimeSimple))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTaskCompletionTimeSimple() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTimeSimpleRepository.findAll().size();
        taskCompletionTimeSimple.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskCompletionTimeSimpleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTimeSimple))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTaskCompletionTimeSimple() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTimeSimpleRepository.findAll().size();
        taskCompletionTimeSimple.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskCompletionTimeSimpleMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTimeSimple))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTaskCompletionTimeSimpleWithPatch() throws Exception {
        // Initialize the database
        taskCompletionTimeSimpleRepository.saveAndFlush(taskCompletionTimeSimple);

        int databaseSizeBeforeUpdate = taskCompletionTimeSimpleRepository.findAll().size();

        // Update the taskCompletionTimeSimple using partial update
        TaskCompletionTimeSimple partialUpdatedTaskCompletionTimeSimple = new TaskCompletionTimeSimple();
        partialUpdatedTaskCompletionTimeSimple.setId(taskCompletionTimeSimple.getId());

        partialUpdatedTaskCompletionTimeSimple.sex(UPDATED_SEX).age(UPDATED_AGE);

        restTaskCompletionTimeSimpleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskCompletionTimeSimple.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskCompletionTimeSimple))
            )
            .andExpect(status().isOk());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeUpdate);
        TaskCompletionTimeSimple testTaskCompletionTimeSimple = taskCompletionTimeSimpleList.get(taskCompletionTimeSimpleList.size() - 1);
        assertThat(testTaskCompletionTimeSimple.getParticipantName()).isEqualTo(DEFAULT_PARTICIPANT_NAME);
        assertThat(testTaskCompletionTimeSimple.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTaskCompletionTimeSimple.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTaskCompletionTimeSimple.getTimeMills()).isEqualTo(DEFAULT_TIME_MILLS);
        assertThat(testTaskCompletionTimeSimple.getErrors()).isEqualTo(DEFAULT_ERRORS);
    }

    @Test
    @Transactional
    void fullUpdateTaskCompletionTimeSimpleWithPatch() throws Exception {
        // Initialize the database
        taskCompletionTimeSimpleRepository.saveAndFlush(taskCompletionTimeSimple);

        int databaseSizeBeforeUpdate = taskCompletionTimeSimpleRepository.findAll().size();

        // Update the taskCompletionTimeSimple using partial update
        TaskCompletionTimeSimple partialUpdatedTaskCompletionTimeSimple = new TaskCompletionTimeSimple();
        partialUpdatedTaskCompletionTimeSimple.setId(taskCompletionTimeSimple.getId());

        partialUpdatedTaskCompletionTimeSimple
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timeMills(UPDATED_TIME_MILLS)
            .errors(UPDATED_ERRORS);

        restTaskCompletionTimeSimpleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskCompletionTimeSimple.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskCompletionTimeSimple))
            )
            .andExpect(status().isOk());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeUpdate);
        TaskCompletionTimeSimple testTaskCompletionTimeSimple = taskCompletionTimeSimpleList.get(taskCompletionTimeSimpleList.size() - 1);
        assertThat(testTaskCompletionTimeSimple.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTaskCompletionTimeSimple.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTaskCompletionTimeSimple.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTaskCompletionTimeSimple.getTimeMills()).isEqualTo(UPDATED_TIME_MILLS);
        assertThat(testTaskCompletionTimeSimple.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void patchNonExistingTaskCompletionTimeSimple() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTimeSimpleRepository.findAll().size();
        taskCompletionTimeSimple.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskCompletionTimeSimpleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, taskCompletionTimeSimple.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTimeSimple))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTaskCompletionTimeSimple() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTimeSimpleRepository.findAll().size();
        taskCompletionTimeSimple.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskCompletionTimeSimpleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTimeSimple))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTaskCompletionTimeSimple() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTimeSimpleRepository.findAll().size();
        taskCompletionTimeSimple.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskCompletionTimeSimpleMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTimeSimple))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskCompletionTimeSimple in the database
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTaskCompletionTimeSimple() throws Exception {
        // Initialize the database
        taskCompletionTimeSimpleRepository.saveAndFlush(taskCompletionTimeSimple);

        int databaseSizeBeforeDelete = taskCompletionTimeSimpleRepository.findAll().size();

        // Delete the taskCompletionTimeSimple
        restTaskCompletionTimeSimpleMockMvc
            .perform(delete(ENTITY_API_URL_ID, taskCompletionTimeSimple.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaskCompletionTimeSimple> taskCompletionTimeSimpleList = taskCompletionTimeSimpleRepository.findAll();
        assertThat(taskCompletionTimeSimpleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
