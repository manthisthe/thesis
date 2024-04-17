package ee.wisercat.filters.domain;

import ee.wisercat.filters.domain.enumeration.Sex;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TaskCompletionTimeSimple.
 */
@Entity
@Table(name = "task_completion_time_simple")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskCompletionTimeSimple implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "participant_name")
    private String participantName;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex")
    private Sex sex;

    @Column(name = "age")
    private Integer age;

    @Column(name = "time_mills")
    private Integer timeMills;

    @Column(name = "errors")
    private Integer errors;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TaskCompletionTimeSimple id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParticipantName() {
        return this.participantName;
    }

    public TaskCompletionTimeSimple participantName(String participantName) {
        this.setParticipantName(participantName);
        return this;
    }

    public void setParticipantName(String participantName) {
        this.participantName = participantName;
    }

    public Sex getSex() {
        return this.sex;
    }

    public TaskCompletionTimeSimple sex(Sex sex) {
        this.setSex(sex);
        return this;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public Integer getAge() {
        return this.age;
    }

    public TaskCompletionTimeSimple age(Integer age) {
        this.setAge(age);
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getTimeMills() {
        return this.timeMills;
    }

    public TaskCompletionTimeSimple timeMills(Integer timeMills) {
        this.setTimeMills(timeMills);
        return this;
    }

    public void setTimeMills(Integer timeMills) {
        this.timeMills = timeMills;
    }

    public Integer getErrors() {
        return this.errors;
    }

    public TaskCompletionTimeSimple errors(Integer errors) {
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
        if (!(o instanceof TaskCompletionTimeSimple)) {
            return false;
        }
        return getId() != null && getId().equals(((TaskCompletionTimeSimple) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskCompletionTimeSimple{" +
            "id=" + getId() +
            ", participantName='" + getParticipantName() + "'" +
            ", sex='" + getSex() + "'" +
            ", age=" + getAge() +
            ", timeMills=" + getTimeMills() +
            ", errors=" + getErrors() +
            "}";
    }
}
