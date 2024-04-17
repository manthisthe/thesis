package ee.wisercat.filters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ee.wisercat.filters.IntegrationTest;
import ee.wisercat.filters.domain.Task4;
import ee.wisercat.filters.domain.enumeration.Sex;
import ee.wisercat.filters.repository.Task4Repository;
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
 * Integration tests for the {@link Task4Resource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class Task4ResourceIT {

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

    private static final String ENTITY_API_URL = "/api/task-4-s";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private Task4Repository task4Repository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTask4MockMvc;

    private Task4 task4;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task4 createEntity(EntityManager em) {
        Task4 task4 = new Task4()
            .participantName(DEFAULT_PARTICIPANT_NAME)
            .sex(DEFAULT_SEX)
            .age(DEFAULT_AGE)
            .taskCompletionTimeSeconds(DEFAULT_TASK_COMPLETION_TIME_SECONDS)
            .errors(DEFAULT_ERRORS);
        return task4;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task4 createUpdatedEntity(EntityManager em) {
        Task4 task4 = new Task4()
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);
        return task4;
    }

    @BeforeEach
    public void initTest() {
        task4 = createEntity(em);
    }

    @Test
    @Transactional
    void createTask4() throws Exception {
        int databaseSizeBeforeCreate = task4Repository.findAll().size();
        // Create the Task4
        restTask4MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task4)))
            .andExpect(status().isCreated());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeCreate + 1);
        Task4 testTask4 = task4List.get(task4List.size() - 1);
        assertThat(testTask4.getParticipantName()).isEqualTo(DEFAULT_PARTICIPANT_NAME);
        assertThat(testTask4.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTask4.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTask4.getTaskCompletionTimeSeconds()).isEqualTo(DEFAULT_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask4.getErrors()).isEqualTo(DEFAULT_ERRORS);
    }

    @Test
    @Transactional
    void createTask4WithExistingId() throws Exception {
        // Create the Task4 with an existing ID
        task4.setId(1L);

        int databaseSizeBeforeCreate = task4Repository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTask4MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task4)))
            .andExpect(status().isBadRequest());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkParticipantNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = task4Repository.findAll().size();
        // set the field null
        task4.setParticipantName(null);

        // Create the Task4, which fails.

        restTask4MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task4)))
            .andExpect(status().isBadRequest());

        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSexIsRequired() throws Exception {
        int databaseSizeBeforeTest = task4Repository.findAll().size();
        // set the field null
        task4.setSex(null);

        // Create the Task4, which fails.

        restTask4MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task4)))
            .andExpect(status().isBadRequest());

        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = task4Repository.findAll().size();
        // set the field null
        task4.setAge(null);

        // Create the Task4, which fails.

        restTask4MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task4)))
            .andExpect(status().isBadRequest());

        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTask4s() throws Exception {
        // Initialize the database
        task4Repository.saveAndFlush(task4);

        // Get all the task4List
        restTask4MockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task4.getId().intValue())))
            .andExpect(jsonPath("$.[*].participantName").value(hasItem(DEFAULT_PARTICIPANT_NAME)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].taskCompletionTimeSeconds").value(hasItem(DEFAULT_TASK_COMPLETION_TIME_SECONDS)))
            .andExpect(jsonPath("$.[*].errors").value(hasItem(DEFAULT_ERRORS)));
    }

    @Test
    @Transactional
    void getTask4() throws Exception {
        // Initialize the database
        task4Repository.saveAndFlush(task4);

        // Get the task4
        restTask4MockMvc
            .perform(get(ENTITY_API_URL_ID, task4.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(task4.getId().intValue()))
            .andExpect(jsonPath("$.participantName").value(DEFAULT_PARTICIPANT_NAME))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.taskCompletionTimeSeconds").value(DEFAULT_TASK_COMPLETION_TIME_SECONDS))
            .andExpect(jsonPath("$.errors").value(DEFAULT_ERRORS));
    }

    @Test
    @Transactional
    void getNonExistingTask4() throws Exception {
        // Get the task4
        restTask4MockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTask4() throws Exception {
        // Initialize the database
        task4Repository.saveAndFlush(task4);

        int databaseSizeBeforeUpdate = task4Repository.findAll().size();

        // Update the task4
        Task4 updatedTask4 = task4Repository.findById(task4.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTask4 are not directly saved in db
        em.detach(updatedTask4);
        updatedTask4
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restTask4MockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTask4.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTask4))
            )
            .andExpect(status().isOk());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeUpdate);
        Task4 testTask4 = task4List.get(task4List.size() - 1);
        assertThat(testTask4.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask4.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask4.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTask4.getTaskCompletionTimeSeconds()).isEqualTo(UPDATED_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask4.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void putNonExistingTask4() throws Exception {
        int databaseSizeBeforeUpdate = task4Repository.findAll().size();
        task4.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTask4MockMvc
            .perform(
                put(ENTITY_API_URL_ID, task4.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(task4))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTask4() throws Exception {
        int databaseSizeBeforeUpdate = task4Repository.findAll().size();
        task4.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask4MockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(task4))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTask4() throws Exception {
        int databaseSizeBeforeUpdate = task4Repository.findAll().size();
        task4.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask4MockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task4)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTask4WithPatch() throws Exception {
        // Initialize the database
        task4Repository.saveAndFlush(task4);

        int databaseSizeBeforeUpdate = task4Repository.findAll().size();

        // Update the task4 using partial update
        Task4 partialUpdatedTask4 = new Task4();
        partialUpdatedTask4.setId(task4.getId());

        partialUpdatedTask4
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS);

        restTask4MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask4.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask4))
            )
            .andExpect(status().isOk());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeUpdate);
        Task4 testTask4 = task4List.get(task4List.size() - 1);
        assertThat(testTask4.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask4.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask4.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTask4.getTaskCompletionTimeSeconds()).isEqualTo(UPDATED_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask4.getErrors()).isEqualTo(DEFAULT_ERRORS);
    }

    @Test
    @Transactional
    void fullUpdateTask4WithPatch() throws Exception {
        // Initialize the database
        task4Repository.saveAndFlush(task4);

        int databaseSizeBeforeUpdate = task4Repository.findAll().size();

        // Update the task4 using partial update
        Task4 partialUpdatedTask4 = new Task4();
        partialUpdatedTask4.setId(task4.getId());

        partialUpdatedTask4
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restTask4MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask4.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask4))
            )
            .andExpect(status().isOk());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeUpdate);
        Task4 testTask4 = task4List.get(task4List.size() - 1);
        assertThat(testTask4.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask4.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask4.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTask4.getTaskCompletionTimeSeconds()).isEqualTo(UPDATED_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask4.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void patchNonExistingTask4() throws Exception {
        int databaseSizeBeforeUpdate = task4Repository.findAll().size();
        task4.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTask4MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, task4.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task4))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTask4() throws Exception {
        int databaseSizeBeforeUpdate = task4Repository.findAll().size();
        task4.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask4MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task4))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTask4() throws Exception {
        int databaseSizeBeforeUpdate = task4Repository.findAll().size();
        task4.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask4MockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(task4)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task4 in the database
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTask4() throws Exception {
        // Initialize the database
        task4Repository.saveAndFlush(task4);

        int databaseSizeBeforeDelete = task4Repository.findAll().size();

        // Delete the task4
        restTask4MockMvc
            .perform(delete(ENTITY_API_URL_ID, task4.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Task4> task4List = task4Repository.findAll();
        assertThat(task4List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
