import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITask3, NewTask3 } from '../task-3.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITask3 for edit and NewTask3FormGroupInput for create.
 */
type Task3FormGroupInput = ITask3 | PartialWithRequiredKeyOf<NewTask3>;

type Task3FormDefaults = Pick<NewTask3, 'id'>;

type Task3FormGroupContent = {
  id: FormControl<ITask3['id'] | NewTask3['id']>;
  participantName: FormControl<ITask3['participantName']>;
  sex: FormControl<ITask3['sex']>;
  age: FormControl<ITask3['age']>;
  taskCompletionTimeSeconds: FormControl<ITask3['taskCompletionTimeSeconds']>;
  errors: FormControl<ITask3['errors']>;
};

export type Task3FormGroup = FormGroup<Task3FormGroupContent>;

@Injectable({ providedIn: 'root' })
export class Task3FormService {
  createTask3FormGroup(task3: Task3FormGroupInput = { id: null }): Task3FormGroup {
    const task3RawValue = {
      ...this.getFormDefaults(),
      ...task3,
    };
    return new FormGroup<Task3FormGroupContent>({
      id: new FormControl(
        { value: task3RawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      participantName: new FormControl(task3RawValue.participantName, {
        validators: [Validators.required],
      }),
      sex: new FormControl(task3RawValue.sex, {
        validators: [Validators.required],
      }),
      age: new FormControl(task3RawValue.age, {
        validators: [Validators.required],
      }),
      taskCompletionTimeSeconds: new FormControl(task3RawValue.taskCompletionTimeSeconds),
      errors: new FormControl(task3RawValue.errors),
    });
  }

  getTask3(form: Task3FormGroup): ITask3 | NewTask3 {
    return form.getRawValue() as ITask3 | NewTask3;
  }

  resetForm(form: Task3FormGroup, task3: Task3FormGroupInput): void {
    const task3RawValue = { ...this.getFormDefaults(), ...task3 };
    form.reset(
      {
        ...task3RawValue,
        id: { value: task3RawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): Task3FormDefaults {
    return {
      id: null,
    };
  }
}
