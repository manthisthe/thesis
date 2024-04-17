import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITaskCompletionTime2, NewTaskCompletionTime2 } from '../task-completion-time-2.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaskCompletionTime2 for edit and NewTaskCompletionTime2FormGroupInput for create.
 */
type TaskCompletionTime2FormGroupInput = ITaskCompletionTime2 | PartialWithRequiredKeyOf<NewTaskCompletionTime2>;

type TaskCompletionTime2FormDefaults = Pick<NewTaskCompletionTime2, 'id'>;

type TaskCompletionTime2FormGroupContent = {
  id: FormControl<ITaskCompletionTime2['id'] | NewTaskCompletionTime2['id']>;
  participantName: FormControl<ITaskCompletionTime2['participantName']>;
  sex: FormControl<ITaskCompletionTime2['sex']>;
  age: FormControl<ITaskCompletionTime2['age']>;
  timeSeconds: FormControl<ITaskCompletionTime2['timeSeconds']>;
};

export type TaskCompletionTime2FormGroup = FormGroup<TaskCompletionTime2FormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaskCompletionTime2FormService {
  createTaskCompletionTime2FormGroup(taskCompletionTime2: TaskCompletionTime2FormGroupInput = { id: null }): TaskCompletionTime2FormGroup {
    const taskCompletionTime2RawValue = {
      ...this.getFormDefaults(),
      ...taskCompletionTime2,
    };
    return new FormGroup<TaskCompletionTime2FormGroupContent>({
      id: new FormControl(
        { value: taskCompletionTime2RawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      participantName: new FormControl(taskCompletionTime2RawValue.participantName),
      sex: new FormControl(taskCompletionTime2RawValue.sex),
      age: new FormControl(taskCompletionTime2RawValue.age),
      timeSeconds: new FormControl(taskCompletionTime2RawValue.timeSeconds),
    });
  }

  getTaskCompletionTime2(form: TaskCompletionTime2FormGroup): ITaskCompletionTime2 | NewTaskCompletionTime2 {
    return form.getRawValue() as ITaskCompletionTime2 | NewTaskCompletionTime2;
  }

  resetForm(form: TaskCompletionTime2FormGroup, taskCompletionTime2: TaskCompletionTime2FormGroupInput): void {
    const taskCompletionTime2RawValue = { ...this.getFormDefaults(), ...taskCompletionTime2 };
    form.reset(
      {
        ...taskCompletionTime2RawValue,
        id: { value: taskCompletionTime2RawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaskCompletionTime2FormDefaults {
    return {
      id: null,
    };
  }
}
