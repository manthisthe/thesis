package ee.wisercat.filters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ee.wisercat.filters.IntegrationTest;
import ee.wisercat.filters.domain.Task3;
import ee.wisercat.filters.domain.enumeration.Sex;
import ee.wisercat.filters.repository.Task3Repository;
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
 * Integration tests for the {@link Task3Resource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class Task3ResourceIT {

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

    private static final String ENTITY_API_URL = "/api/task-3-s";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private Task3Repository task3Repository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTask3MockMvc;

    private Task3 task3;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task3 createEntity(EntityManager em) {
        Task3 task3 = new Task3()
            .participantName(DEFAULT_PARTICIPANT_NAME)
            .sex(DEFAULT_SEX)
            .age(DEFAULT_AGE)
            .taskCompletionTimeSeconds(DEFAULT_TASK_COMPLETION_TIME_SECONDS)
            .errors(DEFAULT_ERRORS);
        return task3;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task3 createUpdatedEntity(EntityManager em) {
        Task3 task3 = new Task3()
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);
        return task3;
    }

    @BeforeEach
    public void initTest() {
        task3 = createEntity(em);
    }

    @Test
    @Transactional
    void createTask3() throws Exception {
        int databaseSizeBeforeCreate = task3Repository.findAll().size();
        // Create the Task3
        restTask3MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task3)))
            .andExpect(status().isCreated());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeCreate + 1);
        Task3 testTask3 = task3List.get(task3List.size() - 1);
        assertThat(testTask3.getParticipantName()).isEqualTo(DEFAULT_PARTICIPANT_NAME);
        assertThat(testTask3.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTask3.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTask3.getTaskCompletionTimeSeconds()).isEqualTo(DEFAULT_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask3.getErrors()).isEqualTo(DEFAULT_ERRORS);
    }

    @Test
    @Transactional
    void createTask3WithExistingId() throws Exception {
        // Create the Task3 with an existing ID
        task3.setId(1L);

        int databaseSizeBeforeCreate = task3Repository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTask3MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task3)))
            .andExpect(status().isBadRequest());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkParticipantNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = task3Repository.findAll().size();
        // set the field null
        task3.setParticipantName(null);

        // Create the Task3, which fails.

        restTask3MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task3)))
            .andExpect(status().isBadRequest());

        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSexIsRequired() throws Exception {
        int databaseSizeBeforeTest = task3Repository.findAll().size();
        // set the field null
        task3.setSex(null);

        // Create the Task3, which fails.

        restTask3MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task3)))
            .andExpect(status().isBadRequest());

        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = task3Repository.findAll().size();
        // set the field null
        task3.setAge(null);

        // Create the Task3, which fails.

        restTask3MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task3)))
            .andExpect(status().isBadRequest());

        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTask3s() throws Exception {
        // Initialize the database
        task3Repository.saveAndFlush(task3);

        // Get all the task3List
        restTask3MockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task3.getId().intValue())))
            .andExpect(jsonPath("$.[*].participantName").value(hasItem(DEFAULT_PARTICIPANT_NAME)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].taskCompletionTimeSeconds").value(hasItem(DEFAULT_TASK_COMPLETION_TIME_SECONDS)))
            .andExpect(jsonPath("$.[*].errors").value(hasItem(DEFAULT_ERRORS)));
    }

    @Test
    @Transactional
    void getTask3() throws Exception {
        // Initialize the database
        task3Repository.saveAndFlush(task3);

        // Get the task3
        restTask3MockMvc
            .perform(get(ENTITY_API_URL_ID, task3.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(task3.getId().intValue()))
            .andExpect(jsonPath("$.participantName").value(DEFAULT_PARTICIPANT_NAME))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.taskCompletionTimeSeconds").value(DEFAULT_TASK_COMPLETION_TIME_SECONDS))
            .andExpect(jsonPath("$.errors").value(DEFAULT_ERRORS));
    }

    @Test
    @Transactional
    void getNonExistingTask3() throws Exception {
        // Get the task3
        restTask3MockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTask3() throws Exception {
        // Initialize the database
        task3Repository.saveAndFlush(task3);

        int databaseSizeBeforeUpdate = task3Repository.findAll().size();

        // Update the task3
        Task3 updatedTask3 = task3Repository.findById(task3.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTask3 are not directly saved in db
        em.detach(updatedTask3);
        updatedTask3
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restTask3MockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTask3.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTask3))
            )
            .andExpect(status().isOk());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeUpdate);
        Task3 testTask3 = task3List.get(task3List.size() - 1);
        assertThat(testTask3.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask3.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask3.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTask3.getTaskCompletionTimeSeconds()).isEqualTo(UPDATED_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask3.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void putNonExistingTask3() throws Exception {
        int databaseSizeBeforeUpdate = task3Repository.findAll().size();
        task3.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTask3MockMvc
            .perform(
                put(ENTITY_API_URL_ID, task3.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(task3))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTask3() throws Exception {
        int databaseSizeBeforeUpdate = task3Repository.findAll().size();
        task3.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask3MockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(task3))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTask3() throws Exception {
        int databaseSizeBeforeUpdate = task3Repository.findAll().size();
        task3.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask3MockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task3)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTask3WithPatch() throws Exception {
        // Initialize the database
        task3Repository.saveAndFlush(task3);

        int databaseSizeBeforeUpdate = task3Repository.findAll().size();

        // Update the task3 using partial update
        Task3 partialUpdatedTask3 = new Task3();
        partialUpdatedTask3.setId(task3.getId());

        partialUpdatedTask3.participantName(UPDATED_PARTICIPANT_NAME).errors(UPDATED_ERRORS);

        restTask3MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask3.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask3))
            )
            .andExpect(status().isOk());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeUpdate);
        Task3 testTask3 = task3List.get(task3List.size() - 1);
        assertThat(testTask3.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask3.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTask3.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTask3.getTaskCompletionTimeSeconds()).isEqualTo(DEFAULT_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask3.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void fullUpdateTask3WithPatch() throws Exception {
        // Initialize the database
        task3Repository.saveAndFlush(task3);

        int databaseSizeBeforeUpdate = task3Repository.findAll().size();

        // Update the task3 using partial update
        Task3 partialUpdatedTask3 = new Task3();
        partialUpdatedTask3.setId(task3.getId());

        partialUpdatedTask3
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restTask3MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask3.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask3))
            )
            .andExpect(status().isOk());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeUpdate);
        Task3 testTask3 = task3List.get(task3List.size() - 1);
        assertThat(testTask3.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask3.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask3.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTask3.getTaskCompletionTimeSeconds()).isEqualTo(UPDATED_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask3.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void patchNonExistingTask3() throws Exception {
        int databaseSizeBeforeUpdate = task3Repository.findAll().size();
        task3.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTask3MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, task3.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task3))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTask3() throws Exception {
        int databaseSizeBeforeUpdate = task3Repository.findAll().size();
        task3.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask3MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task3))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTask3() throws Exception {
        int databaseSizeBeforeUpdate = task3Repository.findAll().size();
        task3.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask3MockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(task3)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task3 in the database
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTask3() throws Exception {
        // Initialize the database
        task3Repository.saveAndFlush(task3);

        int databaseSizeBeforeDelete = task3Repository.findAll().size();

        // Delete the task3
        restTask3MockMvc
            .perform(delete(ENTITY_API_URL_ID, task3.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Task3> task3List = task3Repository.findAll();
        assertThat(task3List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
