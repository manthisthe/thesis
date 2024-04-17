package ee.wisercat.filters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ee.wisercat.filters.IntegrationTest;
import ee.wisercat.filters.domain.TaskCompletionTime2;
import ee.wisercat.filters.domain.enumeration.Sex;
import ee.wisercat.filters.repository.TaskCompletionTime2Repository;
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
 * Integration tests for the {@link TaskCompletionTime2Resource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TaskCompletionTime2ResourceIT {

    private static final String DEFAULT_PARTICIPANT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARTICIPANT_NAME = "BBBBBBBBBB";

    private static final Sex DEFAULT_SEX = Sex.M;
    private static final Sex UPDATED_SEX = Sex.F;

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final Integer DEFAULT_TIME_SECONDS = 1;
    private static final Integer UPDATED_TIME_SECONDS = 2;

    private static final String ENTITY_API_URL = "/api/task-completion-time-2-s";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TaskCompletionTime2Repository taskCompletionTime2Repository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTaskCompletionTime2MockMvc;

    private TaskCompletionTime2 taskCompletionTime2;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskCompletionTime2 createEntity(EntityManager em) {
        TaskCompletionTime2 taskCompletionTime2 = new TaskCompletionTime2()
            .participantName(DEFAULT_PARTICIPANT_NAME)
            .sex(DEFAULT_SEX)
            .age(DEFAULT_AGE)
            .timeSeconds(DEFAULT_TIME_SECONDS);
        return taskCompletionTime2;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskCompletionTime2 createUpdatedEntity(EntityManager em) {
        TaskCompletionTime2 taskCompletionTime2 = new TaskCompletionTime2()
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timeSeconds(UPDATED_TIME_SECONDS);
        return taskCompletionTime2;
    }

    @BeforeEach
    public void initTest() {
        taskCompletionTime2 = createEntity(em);
    }

    @Test
    @Transactional
    void createTaskCompletionTime2() throws Exception {
        int databaseSizeBeforeCreate = taskCompletionTime2Repository.findAll().size();
        // Create the TaskCompletionTime2
        restTaskCompletionTime2MockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskCompletionTime2))
            )
            .andExpect(status().isCreated());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeCreate + 1);
        TaskCompletionTime2 testTaskCompletionTime2 = taskCompletionTime2List.get(taskCompletionTime2List.size() - 1);
        assertThat(testTaskCompletionTime2.getParticipantName()).isEqualTo(DEFAULT_PARTICIPANT_NAME);
        assertThat(testTaskCompletionTime2.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTaskCompletionTime2.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTaskCompletionTime2.getTimeSeconds()).isEqualTo(DEFAULT_TIME_SECONDS);
    }

    @Test
    @Transactional
    void createTaskCompletionTime2WithExistingId() throws Exception {
        // Create the TaskCompletionTime2 with an existing ID
        taskCompletionTime2.setId(1L);

        int databaseSizeBeforeCreate = taskCompletionTime2Repository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskCompletionTime2MockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskCompletionTime2))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTaskCompletionTime2s() throws Exception {
        // Initialize the database
        taskCompletionTime2Repository.saveAndFlush(taskCompletionTime2);

        // Get all the taskCompletionTime2List
        restTaskCompletionTime2MockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskCompletionTime2.getId().intValue())))
            .andExpect(jsonPath("$.[*].participantName").value(hasItem(DEFAULT_PARTICIPANT_NAME)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].timeSeconds").value(hasItem(DEFAULT_TIME_SECONDS)));
    }

    @Test
    @Transactional
    void getTaskCompletionTime2() throws Exception {
        // Initialize the database
        taskCompletionTime2Repository.saveAndFlush(taskCompletionTime2);

        // Get the taskCompletionTime2
        restTaskCompletionTime2MockMvc
            .perform(get(ENTITY_API_URL_ID, taskCompletionTime2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(taskCompletionTime2.getId().intValue()))
            .andExpect(jsonPath("$.participantName").value(DEFAULT_PARTICIPANT_NAME))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.timeSeconds").value(DEFAULT_TIME_SECONDS));
    }

    @Test
    @Transactional
    void getNonExistingTaskCompletionTime2() throws Exception {
        // Get the taskCompletionTime2
        restTaskCompletionTime2MockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTaskCompletionTime2() throws Exception {
        // Initialize the database
        taskCompletionTime2Repository.saveAndFlush(taskCompletionTime2);

        int databaseSizeBeforeUpdate = taskCompletionTime2Repository.findAll().size();

        // Update the taskCompletionTime2
        TaskCompletionTime2 updatedTaskCompletionTime2 = taskCompletionTime2Repository.findById(taskCompletionTime2.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTaskCompletionTime2 are not directly saved in db
        em.detach(updatedTaskCompletionTime2);
        updatedTaskCompletionTime2
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timeSeconds(UPDATED_TIME_SECONDS);

        restTaskCompletionTime2MockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTaskCompletionTime2.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTaskCompletionTime2))
            )
            .andExpect(status().isOk());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeUpdate);
        TaskCompletionTime2 testTaskCompletionTime2 = taskCompletionTime2List.get(taskCompletionTime2List.size() - 1);
        assertThat(testTaskCompletionTime2.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTaskCompletionTime2.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTaskCompletionTime2.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTaskCompletionTime2.getTimeSeconds()).isEqualTo(UPDATED_TIME_SECONDS);
    }

    @Test
    @Transactional
    void putNonExistingTaskCompletionTime2() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTime2Repository.findAll().size();
        taskCompletionTime2.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskCompletionTime2MockMvc
            .perform(
                put(ENTITY_API_URL_ID, taskCompletionTime2.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTime2))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTaskCompletionTime2() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTime2Repository.findAll().size();
        taskCompletionTime2.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskCompletionTime2MockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTime2))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTaskCompletionTime2() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTime2Repository.findAll().size();
        taskCompletionTime2.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskCompletionTime2MockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskCompletionTime2))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTaskCompletionTime2WithPatch() throws Exception {
        // Initialize the database
        taskCompletionTime2Repository.saveAndFlush(taskCompletionTime2);

        int databaseSizeBeforeUpdate = taskCompletionTime2Repository.findAll().size();

        // Update the taskCompletionTime2 using partial update
        TaskCompletionTime2 partialUpdatedTaskCompletionTime2 = new TaskCompletionTime2();
        partialUpdatedTaskCompletionTime2.setId(taskCompletionTime2.getId());

        partialUpdatedTaskCompletionTime2.participantName(UPDATED_PARTICIPANT_NAME).timeSeconds(UPDATED_TIME_SECONDS);

        restTaskCompletionTime2MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskCompletionTime2.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskCompletionTime2))
            )
            .andExpect(status().isOk());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeUpdate);
        TaskCompletionTime2 testTaskCompletionTime2 = taskCompletionTime2List.get(taskCompletionTime2List.size() - 1);
        assertThat(testTaskCompletionTime2.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTaskCompletionTime2.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testTaskCompletionTime2.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testTaskCompletionTime2.getTimeSeconds()).isEqualTo(UPDATED_TIME_SECONDS);
    }

    @Test
    @Transactional
    void fullUpdateTaskCompletionTime2WithPatch() throws Exception {
        // Initialize the database
        taskCompletionTime2Repository.saveAndFlush(taskCompletionTime2);

        int databaseSizeBeforeUpdate = taskCompletionTime2Repository.findAll().size();

        // Update the taskCompletionTime2 using partial update
        TaskCompletionTime2 partialUpdatedTaskCompletionTime2 = new TaskCompletionTime2();
        partialUpdatedTaskCompletionTime2.setId(taskCompletionTime2.getId());

        partialUpdatedTaskCompletionTime2
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timeSeconds(UPDATED_TIME_SECONDS);

        restTaskCompletionTime2MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskCompletionTime2.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskCompletionTime2))
            )
            .andExpect(status().isOk());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeUpdate);
        TaskCompletionTime2 testTaskCompletionTime2 = taskCompletionTime2List.get(taskCompletionTime2List.size() - 1);
        assertThat(testTaskCompletionTime2.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testTaskCompletionTime2.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testTaskCompletionTime2.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testTaskCompletionTime2.getTimeSeconds()).isEqualTo(UPDATED_TIME_SECONDS);
    }

    @Test
    @Transactional
    void patchNonExistingTaskCompletionTime2() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTime2Repository.findAll().size();
        taskCompletionTime2.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskCompletionTime2MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, taskCompletionTime2.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTime2))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTaskCompletionTime2() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTime2Repository.findAll().size();
        taskCompletionTime2.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskCompletionTime2MockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTime2))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTaskCompletionTime2() throws Exception {
        int databaseSizeBeforeUpdate = taskCompletionTime2Repository.findAll().size();
        taskCompletionTime2.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskCompletionTime2MockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskCompletionTime2))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskCompletionTime2 in the database
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTaskCompletionTime2() throws Exception {
        // Initialize the database
        taskCompletionTime2Repository.saveAndFlush(taskCompletionTime2);

        int databaseSizeBeforeDelete = taskCompletionTime2Repository.findAll().size();

        // Delete the taskCompletionTime2
        restTaskCompletionTime2MockMvc
            .perform(delete(ENTITY_API_URL_ID, taskCompletionTime2.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaskCompletionTime2> taskCompletionTime2List = taskCompletionTime2Repository.findAll();
        assertThat(taskCompletionTime2List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
