package ee.wisercat.filters.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class Task5TestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Task5 getTask5Sample1() {
        return new Task5().id(1L).participantName("participantName1").age(1).taskCompletionTimeSeconds(1).errors(1);
    }

    public static Task5 getTask5Sample2() {
        return new Task5().id(2L).participantName("participantName2").age(2).taskCompletionTimeSeconds(2).errors(2);
    }

    public static Task5 getTask5RandomSampleGenerator() {
        return new Task5()
            .id(longCount.incrementAndGet())
            .participantName(UUID.randomUUID().toString())
            .age(intCount.incrementAndGet())
            .taskCompletionTimeSeconds(intCount.incrementAndGet())
            .errors(intCount.incrementAndGet());
    }
}
