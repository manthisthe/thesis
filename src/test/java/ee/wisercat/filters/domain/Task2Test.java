package ee.wisercat.filters.domain;

import static ee.wisercat.filters.domain.Task2TestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ee.wisercat.filters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class Task2Test {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Task2.class);
        Task2 task21 = getTask2Sample1();
        Task2 task22 = new Task2();
        assertThat(task21).isNotEqualTo(task22);

        task22.setId(task21.getId());
        assertThat(task21).isEqualTo(task22);

        task22 = getTask2Sample2();
        assertThat(task21).isNotEqualTo(task22);
    }
}
