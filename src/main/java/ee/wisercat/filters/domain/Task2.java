package ee.wisercat.filters.domain;

import ee.wisercat.filters.domain.enumeration.Sex;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Task2.
 */
@Entity
@Table(name = "task_2")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Task2 implements Serializable {

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

    @Column(name = "task_completion_time_seconds")
    private Integer taskCompletionTimeSeconds;

    @Column(name = "errors")
    private Integer errors;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Task2 id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParticipantName() {
        return this.participantName;
    }

    public Task2 participantName(String participantName) {
        this.setParticipantName(participantName);
        return this;
    }

    public void setParticipantName(String participantName) {
        this.participantName = participantName;
    }

    public Sex getSex() {
        return this.sex;
    }

    public Task2 sex(Sex sex) {
        this.setSex(sex);
        return this;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public Integer getAge() {
        return this.age;
    }

    public Task2 age(Integer age) {
        this.setAge(age);
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getTaskCompletionTimeSeconds() {
        return this.taskCompletionTimeSeconds;
    }

    public Task2 taskCompletionTimeSeconds(Integer taskCompletionTimeSeconds) {
        this.setTaskCompletionTimeSeconds(taskCompletionTimeSeconds);
        return this;
    }

    public void setTaskCompletionTimeSeconds(Integer taskCompletionTimeSeconds) {
        this.taskCompletionTimeSeconds = taskCompletionTimeSeconds;
    }

    public Integer getErrors() {
        return this.errors;
    }

    public Task2 errors(Integer errors) {
        this.setErrors(errors);
        return this;
    }

    public void setErrors(Integer errors) {
        this.errors = errors;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task2)) {
            return false;
        }
        return getId() != null && getId().equals(((Task2) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Task2{" +
            "id=" + getId() +
            ", participantName='" + getParticipantName() + "'" +
            ", sex='" + getSex() + "'" +
            ", age=" + getAge() +
            ", taskCompletionTimeSeconds=" + getTaskCompletionTimeSeconds() +
            ", errors=" + getErrors() +
            "}";
    }
}
