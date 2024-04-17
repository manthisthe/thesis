package ee.wisercat.filters.domain;

import static ee.wisercat.filters.domain.TaskCompletionTimeSimpleTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ee.wisercat.filters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TaskCompletionTimeSimpleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskCompletionTimeSimple.class);
        TaskCompletionTimeSimple taskCompletionTimeSimple1 = getTaskCompletionTimeSimpleSample1();
        TaskCompletionTimeSimple taskCompletionTimeSimple2 = new TaskCompletionTimeSimple();
        assertThat(taskCompletionTimeSimple1).isNotEqualTo(taskCompletionTimeSimple2);

        taskCompletionTimeSimple2.setId(taskCompletionTimeSimple1.getId());
        assertThat(taskCompletionTimeSimple1).isEqualTo(taskCompletionTimeSimple2);

        taskCompletionTimeSimple2 = getTaskCompletionTimeSimpleSample2();
        assertThat(taskCompletionTimeSimple1).isNotEqualTo(taskCompletionTimeSimple2);
    }
}
