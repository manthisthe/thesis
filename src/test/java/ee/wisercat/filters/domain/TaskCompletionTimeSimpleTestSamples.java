package ee.wisercat.filters.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class TaskCompletionTimeSimpleTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static TaskCompletionTimeSimple getTaskCompletionTimeSimpleSample1() {
        return new TaskCompletionTimeSimple().id(1L).participantName("participantName1").age(1).timeMills(1).errors(1);
    }

    public static TaskCompletionTimeSimple getTaskCompletionTimeSimpleSample2() {
        return new TaskCompletionTimeSimple().id(2L).participantName("participantName2").age(2).timeMills(2).errors(2);
    }

    public static TaskCompletionTimeSimple getTaskCompletionTimeSimpleRandomSampleGenerator() {
        return new TaskCompletionTimeSimple()
            .id(longCount.incrementAndGet())
            .participantName(UUID.randomUUID().toString())
            .age(intCount.incrementAndGet())
            .timeMills(intCount.incrementAndGet())
            .errors(intCount.incrementAndGet());
    }
}
