package ee.wisercat.filters.domain;

import static ee.wisercat.filters.domain.Task1VisibilityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ee.wisercat.filters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class Task1VisibilityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Task1Visibility.class);
        Task1Visibility task1Visibility1 = getTask1VisibilitySample1();
        Task1Visibility task1Visibility2 = new Task1Visibility();
        assertThat(task1Visibility1).isNotEqualTo(task1Visibility2);

        task1Visibility2.setId(task1Visibility1.getId());
        assertThat(task1Visibility1).isEqualTo(task1Visibility2);

        task1Visibility2 = getTask1VisibilitySample2();
        assertThat(task1Visibility1).isNotEqualTo(task1Visibility2);
    }
}
