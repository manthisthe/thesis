package ee.wisercat.filters.domain;

import static ee.wisercat.filters.domain.RevocabilityPasswordChangeTimeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ee.wisercat.filters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RevocabilityPasswordChangeTimeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RevocabilityPasswordChangeTime.class);
        RevocabilityPasswordChangeTime revocabilityPasswordChangeTime1 = getRevocabilityPasswordChangeTimeSample1();
        RevocabilityPasswordChangeTime revocabilityPasswordChangeTime2 = new RevocabilityPasswordChangeTime();
        assertThat(revocabilityPasswordChangeTime1).isNotEqualTo(revocabilityPasswordChangeTime2);

        revocabilityPasswordChangeTime2.setId(revocabilityPasswordChangeTime1.getId());
        assertThat(revocabilityPasswordChangeTime1).isEqualTo(revocabilityPasswordChangeTime2);

        revocabilityPasswordChangeTime2 = getRevocabilityPasswordChangeTimeSample2();
        assertThat(revocabilityPasswordChangeTime1).isNotEqualTo(revocabilityPasswordChangeTime2);
    }
}
