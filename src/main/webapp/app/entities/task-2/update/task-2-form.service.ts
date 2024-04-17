import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITask2, NewTask2 } from '../task-2.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITask2 for edit and NewTask2FormGroupInput for create.
 */
type Task2FormGroupInput = ITask2 | PartialWithRequiredKeyOf<NewTask2>;

type Task2FormDefaults = Pick<NewTask2, 'id'>;

type Task2FormGroupContent = {
  id: FormControl<ITask2['id'] | NewTask2['id']>;
  participantName: FormControl<ITask2['participantName']>;
  sex: FormControl<ITask2['sex']>;
  age: FormControl<ITask2['age']>;
  taskCompletionTimeSeconds: FormControl<ITask2['taskCompletionTimeSeconds']>;
  errors: FormControl<ITask2['errors']>;
};

export type Task2FormGroup = FormGroup<Task2FormGroupContent>;

@Injectable({ providedIn: 'root' })
export class Task2FormService {
  createTask2FormGroup(task2: Task2FormGroupInput = { id: null }): Task2FormGroup {
    const task2RawValue = {
      ...this.getFormDefaults(),
      ...task2,
    };
    return new FormGroup<Task2FormGroupContent>({
      id: new FormControl(
        { value: task2RawValue.id, disabled: true },
        {
          nonNullable: true,
          //validators: [Validators.required],
        },
      ),
      participantName: new FormControl(task2RawValue.participantName, {
        //validators: [Validators.required],
      }),
      sex: new FormControl(task2RawValue.sex, {
        //validators: [Validators.required],
      }),
      age: new FormControl(task2RawValue.age, {
        //validators: [Validators.required],
      }),
      taskCompletionTimeSeconds: new FormControl(task2RawValue.taskCompletionTimeSeconds),
      errors: new FormControl(task2RawValue.errors),
    });
  }

  getTask2(form: Task2FormGroup): ITask2 | NewTask2 {
    return form.getRawValue() as ITask2 | NewTask2;
  }

  resetForm(form: Task2FormGroup, task2: Task2FormGroupInput): void {
    const task2RawValue = { ...this.getFormDefaults(), ...task2 };
    form.reset(
      {
        ...task2RawValue,
        id: { value: task2RawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): Task2FormDefaults {
    return {
      id: null,
    };
  }
}
