package ee.wisercat.filters.domain;

import static ee.wisercat.filters.domain.Task5TestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ee.wisercat.filters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class Task5Test {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Task5.class);
        Task5 task51 = getTask5Sample1();
        Task5 task52 = new Task5();
        assertThat(task51).isNotEqualTo(task52);

        task52.setId(task51.getId());
        assertThat(task51).isEqualTo(task52);

        task52 = getTask5Sample2();
        assertThat(task51).isNotEqualTo(task52);
    }
}
