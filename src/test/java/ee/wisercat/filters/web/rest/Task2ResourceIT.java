package ee.wisercat.filters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ee.wisercat.filters.IntegrationTest;
import ee.wisercat.filters.domain.Task2;
import ee.wisercat.filters.domain.enumeration.Sex;
import ee.wisercat.filters.repository.Task2Repository;
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
 * Integration tests for the {@link Task2Resource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class Task2ResourceIT {

    private static final String DEFAULT_PARTICIPANT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARTICIPANT_NAME = "BBBBBBBBBB";

    private static final Sex DEFAULT_SEX = Sex.M;
    private static final Sex UPDATED_SEX = Sex.F;

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final Integer DEFAULT_TASK_COMPLETION_TIME_SECONDS = 1;
    private static final Integer UPDATED_TASK_COMPLETION_TIME_SECONDS = 2;

    private static final Integer DEFAULT_ERRORS = 1;
    private static final Integer UPDATED_ERRORS = 2;

    private static final String ENTITY_API_URL = "/api/task-2-s";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private Task2Repository task2Repository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTask2MockMvc;

    private Task2 task2;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task2 createEntity(EntityManager em) {
        Task2 task2 = new Task2()
            .participantName(DEFAULT_PARTICIPANT_NAME)
            .sex(DEFAULT_SEX)
            .age(DEFAULT_AGE)
            .taskCompletionTimeSeconds(DEFAULT_TASK_COMPLETION_TIME_SECONDS)
            .errors(DEFAULT_ERRORS);
        return task2;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task2 createUpdatedEntity(EntityManager em) {
        Task2 task2 = new Task2()
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);
        return task2;
    }

    @BeforeEach
    public void initTest() {
        task2 = createEntity(em);
    }

    @Test
    @Transactional
    void createTask2() throws Exception {
        int databaseSizeBeforeCreate = task2Repository.findAll().size();
        // Create the Task2
        restTask2MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task2)))
            .andExpect(status().isCreated());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeCreate + 1);
        Task2 testTask2 = task2List.get(task2List.size() - 1);
        assertThat(testTask2.getParticipantName()).isEqualTo(DEFAULT_PARTICIPANT_NAME);
        assertThat(testTask2.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTask2.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTask2.getTaskCompletionTimeSeconds()).isEqualTo(DEFAULT_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask2.getErrors()).isEqualTo(DEFAULT_ERRORS);
    }

    @Test
    @Transactional
    void createTask2WithExistingId() throws Exception {
        // Create the Task2 with an existing ID
        task2.setId(1L);

        int databaseSizeBeforeCreate = task2Repository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTask2MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task2)))
            .andExpect(status().isBadRequest());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkParticipantNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = task2Repository.findAll().size();
        // set the field null
        task2.setParticipantName(null);

        // Create the Task2, which fails.

        restTask2MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task2)))
            .andExpect(status().isBadRequest());

        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSexIsRequired() throws Exception {
        int databaseSizeBeforeTest = task2Repository.findAll().size();
        // set the field null
        task2.setSex(null);

        // Create the Task2, which fails.

        restTask2MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task2)))
            .andExpect(status().isBadRequest());

        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = task2Repository.findAll().size();
        // set the field null
        task2.setAge(null);

        // Create the Task2, which fails.

        restTask2MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task2)))
            .andExpect(status().isBadRequest());

        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTask2s() throws Exception {
        // Initialize the database
        task2Repository.saveAndFlush(task2);

        // Get all the task2List
        restTask2MockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task2.getId().intValue())))
            .andExpect(jsonPath("$.[*].participantName").value(hasItem(DEFAULT_PARTICIPANT_NAME)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].taskCompletionTimeSeconds").value(hasItem(DEFAULT_TASK_COMPLETION_TIME_SECONDS)))
            .andExpect(jsonPath("$.[*].errors").value(hasItem(DEFAULT_ERRORS)));
    }

    @Test
    @Transactional
    void getTask2() throws Exception {
        // Initialize the database
        task2Repository.saveAndFlush(task2);

        // Get the task2
        restTask2MockMvc
            .perform(get(ENTITY_API_URL_ID, task2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(task2.getId().intValue()))
            .andExpect(jsonPath("$.participantName").value(DEFAULT_PARTICIPANT_NAME))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.taskCompletionTimeSeconds").value(DEFAULT_TASK_COMPLETION_TIME_SECONDS))
            .andExpect(jsonPath("$.errors").value(DEFAULT_ERRORS));
    }

    @Test
    @Transactional
    void getNonExistingTask2() throws Exception {
        // Get the task2
        restTask2MockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTask2() throws Exception {
        // Initialize the database
        task2Repository.saveAndFlush(task2);

        int databaseSizeBeforeUpdate = task2Repository.findAll().size();

        // Update the task2
        Task2 updatedTask2 = task2Repository.findById(task2.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTask2 are not directly saved in db
        em.detach(updatedTask2);
        updatedTask2
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restTask2MockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTask2.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTask2))
            )
            .andExpect(status().isOk());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeUpdate);
        Task2 testTask2 = task2List.get(task2List.size() - 1);
        assertThat(testTask2.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask2.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask2.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTask2.getTaskCompletionTimeSeconds()).isEqualTo(UPDATED_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask2.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void putNonExistingTask2() throws Exception {
        int databaseSizeBeforeUpdate = task2Repository.findAll().size();
        task2.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTask2MockMvc
            .perform(
                put(ENTITY_API_URL_ID, task2.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(task2))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTask2() throws Exception {
        int databaseSizeBeforeUpdate = task2Repository.findAll().size();
        task2.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask2MockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(task2))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTask2() throws Exception {
        int databaseSizeBeforeUpdate = task2Repository.findAll().size();
        task2.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask2MockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task2)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTask2WithPatch() throws Exception {
        // Initialize the database
        task2Repository.saveAndFlush(task2);

        int databaseSizeBeforeUpdate = task2Repository.findAll().size();

        // Update the task2 using partial update
        Task2 partialUpdatedTask2 = new Task2();
        partialUpdatedTask2.setId(task2.getId());

        partialUpdatedTask2
            .participantName(UPDATED_PARTICIPANT_NAME)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restTask2MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask2.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask2))
            )
            .andExpect(status().isOk());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeUpdate);
        Task2 testTask2 = task2List.get(task2List.size() - 1);
        assertThat(testTask2.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask2.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTask2.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTask2.getTaskCompletionTimeSeconds()).isEqualTo(UPDATED_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask2.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void fullUpdateTask2WithPatch() throws Exception {
        // Initialize the database
        task2Repository.saveAndFlush(task2);

        int databaseSizeBeforeUpdate = task2Repository.findAll().size();

        // Update the task2 using partial update
        Task2 partialUpdatedTask2 = new Task2();
        partialUpdatedTask2.setId(task2.getId());

        partialUpdatedTask2
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restTask2MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask2.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask2))
            )
            .andExpect(status().isOk());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeUpdate);
        Task2 testTask2 = task2List.get(task2List.size() - 1);
        assertThat(testTask2.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask2.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask2.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTask2.getTaskCompletionTimeSeconds()).isEqualTo(UPDATED_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask2.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void patchNonExistingTask2() throws Exception {
        int databaseSizeBeforeUpdate = task2Repository.findAll().size();
        task2.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTask2MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, task2.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task2))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTask2() throws Exception {
        int databaseSizeBeforeUpdate = task2Repository.findAll().size();
        task2.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask2MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task2))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTask2() throws Exception {
        int databaseSizeBeforeUpdate = task2Repository.findAll().size();
        task2.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask2MockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(task2)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task2 in the database
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTask2() throws Exception {
        // Initialize the database
        task2Repository.saveAndFlush(task2);

        int databaseSizeBeforeDelete = task2Repository.findAll().size();

        // Delete the task2
        restTask2MockMvc
            .perform(delete(ENTITY_API_URL_ID, task2.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Task2> task2List = task2Repository.findAll();
        assertThat(task2List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
