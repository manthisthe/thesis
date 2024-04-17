package ee.wisercat.filters.repository;

import ee.wisercat.filters.domain.Task2;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Task2 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Task2Repository extends JpaRepository<Task2, Long> {}
