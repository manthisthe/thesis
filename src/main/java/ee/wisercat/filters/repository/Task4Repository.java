package ee.wisercat.filters.repository;

import ee.wisercat.filters.domain.Task4;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Task4 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Task4Repository extends JpaRepository<Task4, Long> {}
