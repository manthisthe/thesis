package ee.wisercat.filters.repository;

import ee.wisercat.filters.domain.Task1Visibility;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Task1Visibility entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Task1VisibilityRepository extends JpaRepository<Task1Visibility, Long> {}
