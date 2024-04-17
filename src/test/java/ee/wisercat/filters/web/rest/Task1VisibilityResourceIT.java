package ee.wisercat.filters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ee.wisercat.filters.IntegrationTest;
import ee.wisercat.filters.domain.Task1Visibility;
import ee.wisercat.filters.domain.enumeration.Sex;
import ee.wisercat.filters.repository.Task1VisibilityRepository;
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
 * Integration tests for the {@link Task1VisibilityResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class Task1VisibilityResourceIT {

    private static final String DEFAULT_PARTICIPANT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARTICIPANT_NAME = "BBBBBBBBBB";

    private static final Sex DEFAULT_SEX = Sex.M;
    private static final Sex UPDATED_SEX = Sex.F;

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final Integer DEFAULT_TIMECOMPLETION_TIME_SECONDS = 1;
    private static final Integer UPDATED_TIMECOMPLETION_TIME_SECONDS = 2;

    private static final Integer DEFAULT_ERRORS = 1;
    private static final Integer UPDATED_ERRORS = 2;

    private static final Boolean DEFAULT_TASK_COMPLETED = false;
    private static final Boolean UPDATED_TASK_COMPLETED = true;

    private static final String ENTITY_API_URL = "/api/task-1-visibilities";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private Task1VisibilityRepository task1VisibilityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTask1VisibilityMockMvc;

    private Task1Visibility task1Visibility;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task1Visibility createEntity(EntityManager em) {
        Task1Visibility task1Visibility = new Task1Visibility()
            .participantName(DEFAULT_PARTICIPANT_NAME)
            .sex(DEFAULT_SEX)
            .age(DEFAULT_AGE)
            .timecompletionTimeSeconds(DEFAULT_TIMECOMPLETION_TIME_SECONDS)
            .errors(DEFAULT_ERRORS)
            .taskCompleted(DEFAULT_TASK_COMPLETED);
        return task1Visibility;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Task1Visibility createUpdatedEntity(EntityManager em) {
        Task1Visibility task1Visibility = new Task1Visibility()
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timecompletionTimeSeconds(UPDATED_TIMECOMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS)
            .taskCompleted(UPDATED_TASK_COMPLETED);
        return task1Visibility;
    }

    @BeforeEach
    public void initTest() {
        task1Visibility = createEntity(em);
    }

    @Test
    @Transactional
    void createTask1Visibility() throws Exception {
        int databaseSizeBeforeCreate = task1VisibilityRepository.findAll().size();
        // Create the Task1Visibility
        restTask1VisibilityMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isCreated());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeCreate + 1);
        Task1Visibility testTask1Visibility = task1VisibilityList.get(task1VisibilityList.size() - 1);
        assertThat(testTask1Visibility.getParticipantName()).isEqualTo(DEFAULT_PARTICIPANT_NAME);
        assertThat(testTask1Visibility.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTask1Visibility.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTask1Visibility.getTimecompletionTimeSeconds()).isEqualTo(DEFAULT_TIMECOMPLETION_TIME_SECONDS);
        assertThat(testTask1Visibility.getErrors()).isEqualTo(DEFAULT_ERRORS);
        assertThat(testTask1Visibility.getTaskCompleted()).isEqualTo(DEFAULT_TASK_COMPLETED);
    }

    @Test
    @Transactional
    void createTask1VisibilityWithExistingId() throws Exception {
        // Create the Task1Visibility with an existing ID
        task1Visibility.setId(1L);

        int databaseSizeBeforeCreate = task1VisibilityRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTask1VisibilityMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkParticipantNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = task1VisibilityRepository.findAll().size();
        // set the field null
        task1Visibility.setParticipantName(null);

        // Create the Task1Visibility, which fails.

        restTask1VisibilityMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isBadRequest());

        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSexIsRequired() throws Exception {
        int databaseSizeBeforeTest = task1VisibilityRepository.findAll().size();
        // set the field null
        task1Visibility.setSex(null);

        // Create the Task1Visibility, which fails.

        restTask1VisibilityMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isBadRequest());

        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = task1VisibilityRepository.findAll().size();
        // set the field null
        task1Visibility.setAge(null);

        // Create the Task1Visibility, which fails.

        restTask1VisibilityMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isBadRequest());

        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTask1Visibilities() throws Exception {
        // Initialize the database
        task1VisibilityRepository.saveAndFlush(task1Visibility);

        // Get all the task1VisibilityList
        restTask1VisibilityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(task1Visibility.getId().intValue())))
            .andExpect(jsonPath("$.[*].participantName").value(hasItem(DEFAULT_PARTICIPANT_NAME)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].timecompletionTimeSeconds").value(hasItem(DEFAULT_TIMECOMPLETION_TIME_SECONDS)))
            .andExpect(jsonPath("$.[*].errors").value(hasItem(DEFAULT_ERRORS)))
            .andExpect(jsonPath("$.[*].taskCompleted").value(hasItem(DEFAULT_TASK_COMPLETED.booleanValue())));
    }

    @Test
    @Transactional
    void getTask1Visibility() throws Exception {
        // Initialize the database
        task1VisibilityRepository.saveAndFlush(task1Visibility);

        // Get the task1Visibility
        restTask1VisibilityMockMvc
            .perform(get(ENTITY_API_URL_ID, task1Visibility.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(task1Visibility.getId().intValue()))
            .andExpect(jsonPath("$.participantName").value(DEFAULT_PARTICIPANT_NAME))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.timecompletionTimeSeconds").value(DEFAULT_TIMECOMPLETION_TIME_SECONDS))
            .andExpect(jsonPath("$.errors").value(DEFAULT_ERRORS))
            .andExpect(jsonPath("$.taskCompleted").value(DEFAULT_TASK_COMPLETED.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingTask1Visibility() throws Exception {
        // Get the task1Visibility
        restTask1VisibilityMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTask1Visibility() throws Exception {
        // Initialize the database
        task1VisibilityRepository.saveAndFlush(task1Visibility);

        int databaseSizeBeforeUpdate = task1VisibilityRepository.findAll().size();

        // Update the task1Visibility
        Task1Visibility updatedTask1Visibility = task1VisibilityRepository.findById(task1Visibility.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTask1Visibility are not directly saved in db
        em.detach(updatedTask1Visibility);
        updatedTask1Visibility
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timecompletionTimeSeconds(UPDATED_TIMECOMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS)
            .taskCompleted(UPDATED_TASK_COMPLETED);

        restTask1VisibilityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTask1Visibility.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTask1Visibility))
            )
            .andExpect(status().isOk());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeUpdate);
        Task1Visibility testTask1Visibility = task1VisibilityList.get(task1VisibilityList.size() - 1);
        assertThat(testTask1Visibility.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask1Visibility.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask1Visibility.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTask1Visibility.getTimecompletionTimeSeconds()).isEqualTo(UPDATED_TIMECOMPLETION_TIME_SECONDS);
        assertThat(testTask1Visibility.getErrors()).isEqualTo(UPDATED_ERRORS);
        assertThat(testTask1Visibility.getTaskCompleted()).isEqualTo(UPDATED_TASK_COMPLETED);
    }

    @Test
    @Transactional
    void putNonExistingTask1Visibility() throws Exception {
        int databaseSizeBeforeUpdate = task1VisibilityRepository.findAll().size();
        task1Visibility.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTask1VisibilityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, task1Visibility.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTask1Visibility() throws Exception {
        int databaseSizeBeforeUpdate = task1VisibilityRepository.findAll().size();
        task1Visibility.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask1VisibilityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTask1Visibility() throws Exception {
        int databaseSizeBeforeUpdate = task1VisibilityRepository.findAll().size();
        task1Visibility.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask1VisibilityMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTask1VisibilityWithPatch() throws Exception {
        // Initialize the database
        task1VisibilityRepository.saveAndFlush(task1Visibility);

        int databaseSizeBeforeUpdate = task1VisibilityRepository.findAll().size();

        // Update the task1Visibility using partial update
        Task1Visibility partialUpdatedTask1Visibility = new Task1Visibility();
        partialUpdatedTask1Visibility.setId(task1Visibility.getId());

        partialUpdatedTask1Visibility
            .participantName(UPDATED_PARTICIPANT_NAME)
            .errors(UPDATED_ERRORS)
            .taskCompleted(UPDATED_TASK_COMPLETED);

        restTask1VisibilityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask1Visibility.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask1Visibility))
            )
            .andExpect(status().isOk());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeUpdate);
        Task1Visibility testTask1Visibility = task1VisibilityList.get(task1VisibilityList.size() - 1);
        assertThat(testTask1Visibility.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask1Visibility.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTask1Visibility.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTask1Visibility.getTimecompletionTimeSeconds()).isEqualTo(DEFAULT_TIMECOMPLETION_TIME_SECONDS);
        assertThat(testTask1Visibility.getErrors()).isEqualTo(UPDATED_ERRORS);
        assertThat(testTask1Visibility.getTaskCompleted()).isEqualTo(UPDATED_TASK_COMPLETED);
    }

    @Test
    @Transactional
    void fullUpdateTask1VisibilityWithPatch() throws Exception {
        // Initialize the database
        task1VisibilityRepository.saveAndFlush(task1Visibility);

        int databaseSizeBeforeUpdate = task1VisibilityRepository.findAll().size();

        // Update the task1Visibility using partial update
        Task1Visibility partialUpdatedTask1Visibility = new Task1Visibility();
        partialUpdatedTask1Visibility.setId(task1Visibility.getId());

        partialUpdatedTask1Visibility
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timecompletionTimeSeconds(UPDATED_TIMECOMPLETION_TIME_SECONDS)
            .errors(UPDATED_ERRORS)
            .taskCompleted(UPDATED_TASK_COMPLETED);

        restTask1VisibilityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTask1Visibility.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTask1Visibility))
            )
            .andExpect(status().isOk());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeUpdate);
        Task1Visibility testTask1Visibility = task1VisibilityList.get(task1VisibilityList.size() - 1);
        assertThat(testTask1Visibility.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTask1Visibility.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTask1Visibility.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTask1Visibility.getTimecompletionTimeSeconds()).isEqualTo(UPDATED_TIMECOMPLETION_TIME_SECONDS);
        assertThat(testTask1Visibility.getErrors()).isEqualTo(UPDATED_ERRORS);
        assertThat(testTask1Visibility.getTaskCompleted()).isEqualTo(UPDATED_TASK_COMPLETED);
    }

    @Test
    @Transactional
    void patchNonExistingTask1Visibility() throws Exception {
        int databaseSizeBeforeUpdate = task1VisibilityRepository.findAll().size();
        task1Visibility.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTask1VisibilityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, task1Visibility.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTask1Visibility() throws Exception {
        int databaseSizeBeforeUpdate = task1VisibilityRepository.findAll().size();
        task1Visibility.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask1VisibilityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isBadRequest());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTask1Visibility() throws Exception {
        int databaseSizeBeforeUpdate = task1VisibilityRepository.findAll().size();
        task1Visibility.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTask1VisibilityMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(task1Visibility))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Task1Visibility in the database
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTask1Visibility() throws Exception {
        // Initialize the database
        task1VisibilityRepository.saveAndFlush(task1Visibility);

        int databaseSizeBeforeDelete = task1VisibilityRepository.findAll().size();

        // Delete the task1Visibility
        restTask1VisibilityMockMvc
            .perform(delete(ENTITY_API_URL_ID, task1Visibility.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Task1Visibility> task1VisibilityList = task1VisibilityRepository.findAll();
        assertThat(task1VisibilityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
