package ee.wisercat.filters.repository;

import ee.wisercat.filters.domain.Task3;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Task3 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Task3Repository extends JpaRepository<Task3, Long> {}
