package ee.wisercat.filters.repository;

import ee.wisercat.filters.domain.TaskCompletionTime2;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TaskCompletionTime2 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskCompletionTime2Repository extends JpaRepository<TaskCompletionTime2, Long> {}
