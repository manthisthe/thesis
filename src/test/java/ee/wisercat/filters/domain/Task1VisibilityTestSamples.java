package ee.wisercat.filters.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class Task1VisibilityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Task1Visibility getTask1VisibilitySample1() {
        return new Task1Visibility().id(1L).participantName("participantName1").age(1).timecompletionTimeSeconds(1).errors(1);
    }

    public static Task1Visibility getTask1VisibilitySample2() {
        return new Task1Visibility().id(2L).participantName("participantName2").age(2).timecompletionTimeSeconds(2).errors(2);
    }

    public static Task1Visibility getTask1VisibilityRandomSampleGenerator() {
        return new Task1Visibility()
            .id(longCount.incrementAndGet())
            .participantName(UUID.randomUUID().toString())
            .age(intCount.incrementAndGet())
            .timecompletionTimeSeconds(intCount.incrementAndGet())
            .errors(intCount.incrementAndGet());
    }
}
