package ee.wisercat.filters.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ee.wisercat.filters.IntegrationTest;
import ee.wisercat.filters.domain.RevocabilityPasswordChangeTime;
import ee.wisercat.filters.domain.enumeration.Sex;
import ee.wisercat.filters.repository.RevocabilityPasswordChangeTimeRepository;
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
 * Integration tests for the {@link RevocabilityPasswordChangeTimeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RevocabilityPasswordChangeTimeResourceIT {

    private static final String DEFAULT_PARTICIPANT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PARTICIPANT_NAME = "BBBBBBBBBB";

    private static final Sex DEFAULT_SEX = Sex.M;
    private static final Sex UPDATED_SEX = Sex.F;

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final Integer DEFAULT_TIME_SECONDS = 1;
    private static final Integer UPDATED_TIME_SECONDS = 2;

    private static final Integer DEFAULT_ERRORS = 1;
    private static final Integer UPDATED_ERRORS = 2;

    private static final String ENTITY_API_URL = "/api/revocability-password-change-times";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RevocabilityPasswordChangeTimeRepository revocabilityPasswordChangeTimeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRevocabilityPasswordChangeTimeMockMvc;

    private RevocabilityPasswordChangeTime revocabilityPasswordChangeTime;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RevocabilityPasswordChangeTime createEntity(EntityManager em) {
        RevocabilityPasswordChangeTime revocabilityPasswordChangeTime = new RevocabilityPasswordChangeTime()
            .participantName(DEFAULT_PARTICIPANT_NAME)
            .sex(DEFAULT_SEX)
            .age(DEFAULT_AGE)
            .timeSeconds(DEFAULT_TIME_SECONDS)
            .errors(DEFAULT_ERRORS);
        return revocabilityPasswordChangeTime;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RevocabilityPasswordChangeTime createUpdatedEntity(EntityManager em) {
        RevocabilityPasswordChangeTime revocabilityPasswordChangeTime = new RevocabilityPasswordChangeTime()
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timeSeconds(UPDATED_TIME_SECONDS)
            .errors(UPDATED_ERRORS);
        return revocabilityPasswordChangeTime;
    }

    @BeforeEach
    public void initTest() {
        revocabilityPasswordChangeTime = createEntity(em);
    }

    @Test
    @Transactional
    void createRevocabilityPasswordChangeTime() throws Exception {
        int databaseSizeBeforeCreate = revocabilityPasswordChangeTimeRepository.findAll().size();
        // Create the RevocabilityPasswordChangeTime
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(revocabilityPasswordChangeTime))
            )
            .andExpect(status().isCreated());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeCreate + 1);
        RevocabilityPasswordChangeTime testRevocabilityPasswordChangeTime = revocabilityPasswordChangeTimeList.get(
            revocabilityPasswordChangeTimeList.size() - 1
        );
        assertThat(testRevocabilityPasswordChangeTime.getParticipantName()).isEqualTo(DEFAULT_PARTICIPANT_NAME);
        assertThat(testRevocabilityPasswordChangeTime.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testRevocabilityPasswordChangeTime.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testRevocabilityPasswordChangeTime.getTimeSeconds()).isEqualTo(DEFAULT_TIME_SECONDS);
        assertThat(testRevocabilityPasswordChangeTime.getErrors()).isEqualTo(DEFAULT_ERRORS);
    }

    @Test
    @Transactional
    void createRevocabilityPasswordChangeTimeWithExistingId() throws Exception {
        // Create the RevocabilityPasswordChangeTime with an existing ID
        revocabilityPasswordChangeTime.setId(1L);

        int databaseSizeBeforeCreate = revocabilityPasswordChangeTimeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(revocabilityPasswordChangeTime))
            )
            .andExpect(status().isBadRequest());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRevocabilityPasswordChangeTimes() throws Exception {
        // Initialize the database
        revocabilityPasswordChangeTimeRepository.saveAndFlush(revocabilityPasswordChangeTime);

        // Get all the revocabilityPasswordChangeTimeList
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(revocabilityPasswordChangeTime.getId().intValue())))
            .andExpect(jsonPath("$.[*].participantName").value(hasItem(DEFAULT_PARTICIPANT_NAME)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].timeSeconds").value(hasItem(DEFAULT_TIME_SECONDS)))
            .andExpect(jsonPath("$.[*].errors").value(hasItem(DEFAULT_ERRORS)));
    }

    @Test
    @Transactional
    void getRevocabilityPasswordChangeTime() throws Exception {
        // Initialize the database
        revocabilityPasswordChangeTimeRepository.saveAndFlush(revocabilityPasswordChangeTime);

        // Get the revocabilityPasswordChangeTime
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(get(ENTITY_API_URL_ID, revocabilityPasswordChangeTime.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(revocabilityPasswordChangeTime.getId().intValue()))
            .andExpect(jsonPath("$.participantName").value(DEFAULT_PARTICIPANT_NAME))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.timeSeconds").value(DEFAULT_TIME_SECONDS))
            .andExpect(jsonPath("$.errors").value(DEFAULT_ERRORS));
    }

    @Test
    @Transactional
    void getNonExistingRevocabilityPasswordChangeTime() throws Exception {
        // Get the revocabilityPasswordChangeTime
        restRevocabilityPasswordChangeTimeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRevocabilityPasswordChangeTime() throws Exception {
        // Initialize the database
        revocabilityPasswordChangeTimeRepository.saveAndFlush(revocabilityPasswordChangeTime);

        int databaseSizeBeforeUpdate = revocabilityPasswordChangeTimeRepository.findAll().size();

        // Update the revocabilityPasswordChangeTime
        RevocabilityPasswordChangeTime updatedRevocabilityPasswordChangeTime = revocabilityPasswordChangeTimeRepository
            .findById(revocabilityPasswordChangeTime.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedRevocabilityPasswordChangeTime are not directly saved in db
        em.detach(updatedRevocabilityPasswordChangeTime);
        updatedRevocabilityPasswordChangeTime
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timeSeconds(UPDATED_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRevocabilityPasswordChangeTime.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRevocabilityPasswordChangeTime))
            )
            .andExpect(status().isOk());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeUpdate);
        RevocabilityPasswordChangeTime testRevocabilityPasswordChangeTime = revocabilityPasswordChangeTimeList.get(
            revocabilityPasswordChangeTimeList.size() - 1
        );
        assertThat(testRevocabilityPasswordChangeTime.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testRevocabilityPasswordChangeTime.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testRevocabilityPasswordChangeTime.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testRevocabilityPasswordChangeTime.getTimeSeconds()).isEqualTo(UPDATED_TIME_SECONDS);
        assertThat(testRevocabilityPasswordChangeTime.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void putNonExistingRevocabilityPasswordChangeTime() throws Exception {
        int databaseSizeBeforeUpdate = revocabilityPasswordChangeTimeRepository.findAll().size();
        revocabilityPasswordChangeTime.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, revocabilityPasswordChangeTime.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(revocabilityPasswordChangeTime))
            )
            .andExpect(status().isBadRequest());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRevocabilityPasswordChangeTime() throws Exception {
        int databaseSizeBeforeUpdate = revocabilityPasswordChangeTimeRepository.findAll().size();
        revocabilityPasswordChangeTime.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(revocabilityPasswordChangeTime))
            )
            .andExpect(status().isBadRequest());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRevocabilityPasswordChangeTime() throws Exception {
        int databaseSizeBeforeUpdate = revocabilityPasswordChangeTimeRepository.findAll().size();
        revocabilityPasswordChangeTime.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(revocabilityPasswordChangeTime))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRevocabilityPasswordChangeTimeWithPatch() throws Exception {
        // Initialize the database
        revocabilityPasswordChangeTimeRepository.saveAndFlush(revocabilityPasswordChangeTime);

        int databaseSizeBeforeUpdate = revocabilityPasswordChangeTimeRepository.findAll().size();

        // Update the revocabilityPasswordChangeTime using partial update
        RevocabilityPasswordChangeTime partialUpdatedRevocabilityPasswordChangeTime = new RevocabilityPasswordChangeTime();
        partialUpdatedRevocabilityPasswordChangeTime.setId(revocabilityPasswordChangeTime.getId());

        partialUpdatedRevocabilityPasswordChangeTime
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timeSeconds(UPDATED_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRevocabilityPasswordChangeTime.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRevocabilityPasswordChangeTime))
            )
            .andExpect(status().isOk());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeUpdate);
        RevocabilityPasswordChangeTime testRevocabilityPasswordChangeTime = revocabilityPasswordChangeTimeList.get(
            revocabilityPasswordChangeTimeList.size() - 1
        );
        assertThat(testRevocabilityPasswordChangeTime.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testRevocabilityPasswordChangeTime.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testRevocabilityPasswordChangeTime.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testRevocabilityPasswordChangeTime.getTimeSeconds()).isEqualTo(UPDATED_TIME_SECONDS);
        assertThat(testRevocabilityPasswordChangeTime.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void fullUpdateRevocabilityPasswordChangeTimeWithPatch() throws Exception {
        // Initialize the database
        revocabilityPasswordChangeTimeRepository.saveAndFlush(revocabilityPasswordChangeTime);

        int databaseSizeBeforeUpdate = revocabilityPasswordChangeTimeRepository.findAll().size();

        // Update the revocabilityPasswordChangeTime using partial update
        RevocabilityPasswordChangeTime partialUpdatedRevocabilityPasswordChangeTime = new RevocabilityPasswordChangeTime();
        partialUpdatedRevocabilityPasswordChangeTime.setId(revocabilityPasswordChangeTime.getId());

        partialUpdatedRevocabilityPasswordChangeTime
            .participantName(UPDATED_PARTICIPANT_NAME)
            .sex(UPDATED_SEX)
            .age(UPDATED_AGE)
            .timeSeconds(UPDATED_TIME_SECONDS)
            .errors(UPDATED_ERRORS);

        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRevocabilityPasswordChangeTime.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRevocabilityPasswordChangeTime))
            )
            .andExpect(status().isOk());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeUpdate);
        RevocabilityPasswordChangeTime testRevocabilityPasswordChangeTime = revocabilityPasswordChangeTimeList.get(
            revocabilityPasswordChangeTimeList.size() - 1
        );
        assertThat(testRevocabilityPasswordChangeTime.getParticipantName()).isEqualTo(UPDATED_PARTICIPANT_NAME);
        assertThat(testRevocabilityPasswordChangeTime.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testRevocabilityPasswordChangeTime.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testRevocabilityPasswordChangeTime.getTimeSeconds()).isEqualTo(UPDATED_TIME_SECONDS);
        assertThat(testRevocabilityPasswordChangeTime.getErrors()).isEqualTo(UPDATED_ERRORS);
    }

    @Test
    @Transactional
    void patchNonExistingRevocabilityPasswordChangeTime() throws Exception {
        int databaseSizeBeforeUpdate = revocabilityPasswordChangeTimeRepository.findAll().size();
        revocabilityPasswordChangeTime.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, revocabilityPasswordChangeTime.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(revocabilityPasswordChangeTime))
            )
            .andExpect(status().isBadRequest());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRevocabilityPasswordChangeTime() throws Exception {
        int databaseSizeBeforeUpdate = revocabilityPasswordChangeTimeRepository.findAll().size();
        revocabilityPasswordChangeTime.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(revocabilityPasswordChangeTime))
            )
            .andExpect(status().isBadRequest());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRevocabilityPasswordChangeTime() throws Exception {
        int databaseSizeBeforeUpdate = revocabilityPasswordChangeTimeRepository.findAll().size();
        revocabilityPasswordChangeTime.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(revocabilityPasswordChangeTime))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RevocabilityPasswordChangeTime in the database
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRevocabilityPasswordChangeTime() throws Exception {
        // Initialize the database
        revocabilityPasswordChangeTimeRepository.saveAndFlush(revocabilityPasswordChangeTime);

        int databaseSizeBeforeDelete = revocabilityPasswordChangeTimeRepository.findAll().size();

        // Delete the revocabilityPasswordChangeTime
        restRevocabilityPasswordChangeTimeMockMvc
            .perform(delete(ENTITY_API_URL_ID, revocabilityPasswordChangeTime.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RevocabilityPasswordChangeTime> revocabilityPasswordChangeTimeList = revocabilityPasswordChangeTimeRepository.findAll();
        assertThat(revocabilityPasswordChangeTimeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
