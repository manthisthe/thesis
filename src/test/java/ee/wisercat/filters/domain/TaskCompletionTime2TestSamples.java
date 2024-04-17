package ee.wisercat.filters.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class TaskCompletionTime2TestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static TaskCompletionTime2 getTaskCompletionTime2Sample1() {
        return new TaskCompletionTime2().id(1L).participantName("participantName1").age(1).timeSeconds(1);
    }

    public static TaskCompletionTime2 getTaskCompletionTime2Sample2() {
        return new TaskCompletionTime2().id(2L).participantName("participantName2").age(2).timeSeconds(2);
    }

    public static TaskCompletionTime2 getTaskCompletionTime2RandomSampleGenerator() {
        return new TaskCompletionTime2()
            .id(longCount.incrementAndGet())
            .participantName(UUID.randomUUID().toString())
            .age(intCount.incrementAndGet())
            .timeSeconds(intCount.incrementAndGet());
    }
}
