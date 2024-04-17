package ee.wisercat.filters.repository;

import ee.wisercat.filters.domain.RevocabilityPasswordChangeTime;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the RevocabilityPasswordChangeTime entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RevocabilityPasswordChangeTimeRepository extends JpaRepository<RevocabilityPasswordChangeTime, Long> {}
