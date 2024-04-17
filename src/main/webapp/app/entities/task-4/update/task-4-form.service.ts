import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITask4, NewTask4 } from '../task-4.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITask4 for edit and NewTask4FormGroupInput for create.
 */
type Task4FormGroupInput = ITask4 | PartialWithRequiredKeyOf<NewTask4>;

type Task4FormDefaults = Pick<NewTask4, 'id'>;

type Task4FormGroupContent = {
  id: FormControl<ITask4['id'] | NewTask4['id']>;
  participantName: FormControl<ITask4['participantName']>;
  sex: FormControl<ITask4['sex']>;
  age: FormControl<ITask4['age']>;
  taskCompletionTimeSeconds: FormControl<ITask4['taskCompletionTimeSeconds']>;
  errors: FormControl<ITask4['errors']>;
};

export type Task4FormGroup = FormGroup<Task4FormGroupContent>;

@Injectable({ providedIn: 'root' })
export class Task4FormService {
  createTask4FormGroup(task4: Task4FormGroupInput = { id: null }): Task4FormGroup {
    const task4RawValue = {
      ...this.getFormDefaults(),
      ...task4,
    };
    return new FormGroup<Task4FormGroupContent>({
      id: new FormControl(
        { value: task4RawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      participantName: new FormControl(task4RawValue.participantName, {
        validators: [Validators.required],
      }),
      sex: new FormControl(task4RawValue.sex, {
        validators: [Validators.required],
      }),
      age: new FormControl(task4RawValue.age, {
        validators: [Validators.required],
      }),
      taskCompletionTimeSeconds: new FormControl(task4RawValue.taskCompletionTimeSeconds),
      errors: new FormControl(task4RawValue.errors),
    });
  }

  getTask4(form: Task4FormGroup): ITask4 | NewTask4 {
    return form.getRawValue() as ITask4 | NewTask4;
  }

  resetForm(form: Task4FormGroup, task4: Task4FormGroupInput): void {
    const task4RawValue = { ...this.getFormDefaults(), ...task4 };
    form.reset(
      {
        ...task4RawValue,
        id: { value: task4RawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): Task4FormDefaults {
    return {
      id: null,
    };
  }
}
