package ee.wisercat.filters.domain;

import ee.wisercat.filters.domain.enumeration.Sex;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Task1Visibility.
 */
@Entity
@Table(name = "task_1_visibility")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Task1Visibility implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "participant_name", nullable = false)
    private String participantName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sex", nullable = false)
    private Sex sex;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "timecompletion_time_seconds")
    private Integer timecompletionTimeSeconds;

    @Column(name = "errors")
    private Integer errors;

    @Column(name = "task_completed")
    private Boolean taskCompleted;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Task1Visibility id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParticipantName() {
        return this.participantName;
    }

    public Task1Visibility participantName(String participantName) {
        this.setParticipantName(participantName);
        return this;
    }

    public void setParticipantName(String participantName) {
        this.participantName = participantName;
    }

    public Sex getSex() {
        return this.sex;
    }

    public Task1Visibility sex(Sex sex) {
        this.setSex(sex);
        return this;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public Integer getAge() {
        return this.age;
    }

    public Task1Visibility age(Integer age) {
        this.setAge(age);
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getTimecompletionTimeSeconds() {
        return this.timecompletionTimeSeconds;
    }

    public Task1Visibility timecompletionTimeSeconds(Integer timecompletionTimeSeconds) {
        this.setTimecompletionTimeSeconds(timecompletionTimeSeconds);
        return this;
    }

    public void setTimecompletionTimeSeconds(Integer timecompletionTimeSeconds) {
        this.timecompletionTimeSeconds = timecompletionTimeSeconds;
    }

    public Integer getErrors() {
        return this.errors;
    }

    public Task1Visibility errors(Integer errors) {
        this.setErrors(errors);
        return this;
    }

    public void setErrors(Integer errors) {
        this.errors = errors;
    }

    public Boolean getTaskCompleted() {
        return this.taskCompleted;
    }

    public Task1Visibility taskCompleted(Boolean taskCompleted) {
        this.setTaskCompleted(taskCompleted);
        return this;
    }

    public void setTaskCompleted(Boolean taskCompleted) {
        this.taskCompleted = taskCompleted;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task1Visibility)) {
            return false;
        }
        return getId() != null && getId().equals(((Task1Visibility) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Task1Visibility{" +
            "id=" + getId() +
            ", participantName='" + getParticipantName() + "'" +
            ", sex='" + getSex() + "'" +
            ", age=" + getAge() +
            ", timecompletionTimeSeconds=" + getTimecompletionTimeSeconds() +
            ", errors=" + getErrors() +
            ", taskCompleted='" + getTaskCompleted() + "'" +
            "}";
    }
}
