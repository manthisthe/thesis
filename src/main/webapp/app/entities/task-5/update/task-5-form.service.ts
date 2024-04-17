import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITask5, NewTask5 } from '../task-5.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITask5 for edit and NewTask5FormGroupInput for create.
 */
type Task5FormGroupInput = ITask5 | PartialWithRequiredKeyOf<NewTask5>;

type Task5FormDefaults = Pick<NewTask5, 'id'>;

type Task5FormGroupContent = {
  id: FormControl<ITask5['id'] | NewTask5['id']>;
  participantName: FormControl<ITask5['participantName']>;
  sex: FormControl<ITask5['sex']>;
  age: FormControl<ITask5['age']>;
  taskCompletionTimeSeconds: FormControl<ITask5['taskCompletionTimeSeconds']>;
  errors: FormControl<ITask5['errors']>;
};

export type Task5FormGroup = FormGroup<Task5FormGroupContent>;

@Injectable({ providedIn: 'root' })
export class Task5FormService {
  createTask5FormGroup(task5: Task5FormGroupInput = { id: null }): Task5FormGroup {
    const task5RawValue = {
      ...this.getFormDefaults(),
      ...task5,
    };
    return new FormGroup<Task5FormGroupContent>({
      id: new FormControl(
        { value: task5RawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      participantName: new FormControl(task5RawValue.participantName, {
        validators: [Validators.required],
      }),
      sex: new FormControl(task5RawValue.sex, {
        validators: [Validators.required],
      }),
      age: new FormControl(task5RawValue.age, {
        validators: [Validators.required],
      }),
      taskCompletionTimeSeconds: new FormControl(task5RawValue.taskCompletionTimeSeconds),
      errors: new FormControl(task5RawValue.errors),
    });
  }

  getTask5(form: Task5FormGroup): ITask5 | NewTask5 {
    return form.getRawValue() as ITask5 | NewTask5;
  }

  resetForm(form: Task5FormGroup, task5: Task5FormGroupInput): void {
    const task5RawValue = { ...this.getFormDefaults(), ...task5 };
    form.reset(
      {
        ...task5RawValue,
        id: { value: task5RawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): Task5FormDefaults {
    return {
      id: null,
    };
  }
}
