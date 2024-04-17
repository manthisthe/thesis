package ee.wisercat.filters.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class RevocabilityPasswordChangeTimeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static RevocabilityPasswordChangeTime getRevocabilityPasswordChangeTimeSample1() {
        return new RevocabilityPasswordChangeTime().id(1L).participantName("participantName1").age(1).timeSeconds(1).errors(1);
    }

    public static RevocabilityPasswordChangeTime getRevocabilityPasswordChangeTimeSample2() {
        return new RevocabilityPasswordChangeTime().id(2L).participantName("participantName2").age(2).timeSeconds(2).errors(2);
    }

    public static RevocabilityPasswordChangeTime getRevocabilityPasswordChangeTimeRandomSampleGenerator() {
        return new RevocabilityPasswordChangeTime()
            .id(longCount.incrementAndGet())
            .participantName(UUID.randomUUID().toString())
            .age(intCount.incrementAndGet())
            .timeSeconds(intCount.incrementAndGet())
            .errors(intCount.incrementAndGet());
    }
}
