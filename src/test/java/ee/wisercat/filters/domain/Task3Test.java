package ee.wisercat.filters.domain;

import static ee.wisercat.filters.domain.Task3TestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ee.wisercat.filters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class Task3Test {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Task3.class);
        Task3 task31 = getTask3Sample1();
        Task3 task32 = new Task3();
        assertThat(task31).isNotEqualTo(task32);

        task32.setId(task31.getId());
        assertThat(task31).isEqualTo(task32);

        task32 = getTask3Sample2();
        assertThat(task31).isNotEqualTo(task32);
    }
}
