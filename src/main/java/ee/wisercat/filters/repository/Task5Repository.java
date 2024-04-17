package ee.wisercat.filters.repository;

import ee.wisercat.filters.domain.Task5;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Task5 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Task5Repository extends JpaRepository<Task5, Long> {}
