package ee.wisercat.filters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ee.wisercat.filters.IntegrationTest;
import ee.wisercat.filters.domain.Task5;
import ee.wisercat.filters.domain.enumeration.Sex;
import ee.wisercat.filters.repository.Task5Repository;
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
 * Integration tests for the {@link Task5Resource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class Task5ResourceIT {

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

    private static final String ENTITY_API_URL = "/api/task-5-s";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private Task5Repository task5Repository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTask5MockMvc;

    private Task5 task5;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task5 createEntity(EntityManager em) {
        Task5 task5 = new Task5()
            .participantName(DEFAULT_PARTICIPANT_NAME)
            .sex(DEFAULT_SEX)
            .age(DEFAULT_AGE)
            .taskCompletionTimeSeconds(DEFAULT_TASK_COMPLETION_TIME_SECONDS)
            .errors(DEFAULT_ERRORS);
        return task5;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task5 createUpdatedEntity(EntityManager em) {
        Task5 task5 = new Task5()
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);
        return task5;
    }

    @BeforeEach
    public void initTest() {
        task5 = createEntity(em);
    }

    @Test
    @Transactional
    void createTask5() throws Exception {
        int databaseSizeBeforeCreate = task5Repository.findAll().size();
        // Create the Task5
        restTask5MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task5)))
            .andExpect(status().isCreated());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeCreate + 1);
        Task5 testTask5 = task5List.get(task5List.size() - 1);
        assertThat(testTask5.getParticipantName()).isEqualTo(DEFAULT_PARTICIPANT_NAME);
        assertThat(testTask5.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTask5.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTask5.getTaskCompletionTimeSeconds()).isEqualTo(DEFAULT_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask5.getErrors()).isEqualTo(DEFAULT_ERRORS);
    }

    @Test
    @Transactional
    void createTask5WithExistingId() throws Exception {
        // Create the Task5 with an existing ID
        task5.setId(1L);

        int databaseSizeBeforeCreate = task5Repository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTask5MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task5)))
            .andExpect(status().isBadRequest());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkParticipantNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = task5Repository.findAll().size();
        // set the field null
        task5.setParticipantName(null);

        // Create the Task5, which fails.

        restTask5MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task5)))
            .andExpect(status().isBadRequest());

        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSexIsRequired() throws Exception {
        int databaseSizeBeforeTest = task5Repository.findAll().size();
        // set the field null
        task5.setSex(null);

        // Create the Task5, which fails.

        restTask5MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task5)))
            .andExpect(status().isBadRequest());

        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = task5Repository.findAll().size();
        // set the field null
        task5.setAge(null);

        // Create the Task5, which fails.

        restTask5MockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task5)))
            .andExpect(status().isBadRequest());

        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTask5s() throws Exception {
        // Initialize the database
        task5Repository.saveAndFlush(task5);

        // Get all the task5List
        restTask5MockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task5.getId().intValue())))
            .andExpect(jsonPath("$.[*].participantName").value(hasItem(DEFAULT_PARTICIPANT_NAME)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].taskCompletionTimeSeconds").value(hasItem(DEFAULT_TASK_COMPLETION_TIME_SECONDS)))
            .andExpect(jsonPath("$.[*].errors").value(hasItem(DEFAULT_ERRORS)));
    }

    @Test
    @Transactional
    void getTask5() throws Exception {
        // Initialize the database
        task5Repository.saveAndFlush(task5);

        // Get the task5
        restTask5MockMvc
            .perform(get(ENTITY_API_URL_ID, task5.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(task5.getId().intValue()))
            .andExpect(jsonPath("$.participantName").value(DEFAULT_PARTICIPANT_NAME))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.taskCompletionTimeSeconds").value(DEFAULT_TASK_COMPLETION_TIME_SECONDS))
            .andExpect(jsonPath("$.errors").value(DEFAULT_ERRORS));
    }

    @Test
    @Transactional
    void getNonExistingTask5() throws Exception {
        // Get the task5
        restTask5MockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTask5() throws Exception {
        // Initialize the database
        task5Repository.saveAndFlush(task5);

        int databaseSizeBeforeUpdate = task5Repository.findAll().size();

        // Update the task5
        Task5 updatedTask5 = task5Repository.findById(task5.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTask5 are not directly saved in db
        em.detach(updatedTask5);
        updatedTask5
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restTask5MockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTask5.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTask5))
            )
            .andExpect(status().isOk());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeUpdate);
        Task5 testTask5 = task5List.get(task5List.size() - 1);
        assertThat(testTask5.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask5.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask5.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTask5.getTaskCompletionTimeSeconds()).isEqualTo(UPDATED_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask5.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void putNonExistingTask5() throws Exception {
        int databaseSizeBeforeUpdate = task5Repository.findAll().size();
        task5.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTask5MockMvc
            .perform(
                put(ENTITY_API_URL_ID, task5.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(task5))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTask5() throws Exception {
        int databaseSizeBeforeUpdate = task5Repository.findAll().size();
        task5.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask5MockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(task5))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTask5() throws Exception {
        int databaseSizeBeforeUpdate = task5Repository.findAll().size();
        task5.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask5MockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task5)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTask5WithPatch() throws Exception {
        // Initialize the database
        task5Repository.saveAndFlush(task5);

        int databaseSizeBeforeUpdate = task5Repository.findAll().size();

        // Update the task5 using partial update
        Task5 partialUpdatedTask5 = new Task5();
        partialUpdatedTask5.setId(task5.getId());

        restTask5MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask5.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask5))
            )
            .andExpect(status().isOk());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeUpdate);
        Task5 testTask5 = task5List.get(task5List.size() - 1);
        assertThat(testTask5.getParticipantName()).isEqualTo(DEFAULT_PARTICIPANT_NAME);
        assertThat(testTask5.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTask5.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTask5.getTaskCompletionTimeSeconds()).isEqualTo(DEFAULT_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask5.getErrors()).isEqualTo(DEFAULT_ERRORS);
    }

    @Test
    @Transactional
    void fullUpdateTask5WithPatch() throws Exception {
        // Initialize the database
        task5Repository.saveAndFlush(task5);

        int databaseSizeBeforeUpdate = task5Repository.findAll().size();

        // Update the task5 using partial update
        Task5 partialUpdatedTask5 = new Task5();
        partialUpdatedTask5.setId(task5.getId());

        partialUpdatedTask5
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .taskCompletionTimeSeconds(UPDATED_TASK_COMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restTask5MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask5.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask5))
            )
            .andExpect(status().isOk());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeUpdate);
        Task5 testTask5 = task5List.get(task5List.size() - 1);
        assertThat(testTask5.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask5.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask5.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTask5.getTaskCompletionTimeSeconds()).isEqualTo(UPDATED_TASK_COMPLETION_TIME_SECONDS);
        assertThat(testTask5.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void patchNonExistingTask5() throws Exception {
        int databaseSizeBeforeUpdate = task5Repository.findAll().size();
        task5.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTask5MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, task5.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task5))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTask5() throws Exception {
        int databaseSizeBeforeUpdate = task5Repository.findAll().size();
        task5.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask5MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task5))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTask5() throws Exception {
        int databaseSizeBeforeUpdate = task5Repository.findAll().size();
        task5.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask5MockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(task5)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task5 in the database
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTask5() throws Exception {
        // Initialize the database
        task5Repository.saveAndFlush(task5);

        int databaseSizeBeforeDelete = task5Repository.findAll().size();

        // Delete the task5
        restTask5MockMvc
            .perform(delete(ENTITY_API_URL_ID, task5.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Task5> task5List = task5Repository.findAll();
        assertThat(task5List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
