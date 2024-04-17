package ee.wisercat.filters.domain;

import static ee.wisercat.filters.domain.TaskCompletionTime2TestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ee.wisercat.filters.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TaskCompletionTime2Test {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskCompletionTime2.class);
        TaskCompletionTime2 taskCompletionTime21 = getTaskCompletionTime2Sample1();
        TaskCompletionTime2 taskCompletionTime22 = new TaskCompletionTime2();
        assertThat(taskCompletionTime21).isNotEqualTo(taskCompletionTime22);

        taskCompletionTime22.setId(taskCompletionTime21.getId());
        assertThat(taskCompletionTime21).isEqualTo(taskCompletionTime22);

        taskCompletionTime22 = getTaskCompletionTime2Sample2();
        assertThat(taskCompletionTime21).isNotEqualTo(taskCompletionTime22);
    }
}
