package ee.wisercat.filters.repository;

import ee.wisercat.filters.domain.TaskCompletionTimeSimple;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TaskCompletionTimeSimple entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskCompletionTimeSimpleRepository extends JpaRepository<TaskCompletionTimeSimple, Long> {}
