package ee.wisercat.filters.domain;

import static ee.wisercat.filters.domain.Task4TestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ee.wisercat.filters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class Task4Test {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Task4.class);
        Task4 task41 = getTask4Sample1();
        Task4 task42 = new Task4();
        assertThat(task41).isNotEqualTo(task42);

        task42.setId(task41.getId());
        assertThat(task41).isEqualTo(task42);

        task42 = getTask4Sample2();
        assertThat(task41).isNotEqualTo(task42);
    }
}
