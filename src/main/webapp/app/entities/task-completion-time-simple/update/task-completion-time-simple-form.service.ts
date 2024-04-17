import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITaskCompletionTimeSimple, NewTaskCompletionTimeSimple } from '../task-completion-time-simple.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaskCompletionTimeSimple for edit and NewTaskCompletionTimeSimpleFormGroupInput for create.
 */
type TaskCompletionTimeSimpleFormGroupInput = ITaskCompletionTimeSimple | PartialWithRequiredKeyOf<NewTaskCompletionTimeSimple>;

type TaskCompletionTimeSimpleFormDefaults = Pick<NewTaskCompletionTimeSimple, 'id'>;

type TaskCompletionTimeSimpleFormGroupContent = {
  id: FormControl<ITaskCompletionTimeSimple['id'] | NewTaskCompletionTimeSimple['id']>;
  participantName: FormControl<ITaskCompletionTimeSimple['participantName']>;
  sex: FormControl<ITaskCompletionTimeSimple['sex']>;
  age: FormControl<ITaskCompletionTimeSimple['age']>;
  timeMills: FormControl<ITaskCompletionTimeSimple['timeMills']>;
  errors: FormControl<ITaskCompletionTimeSimple['errors']>;
};

export type TaskCompletionTimeSimpleFormGroup = FormGroup<TaskCompletionTimeSimpleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaskCompletionTimeSimpleFormService {
  createTaskCompletionTimeSimpleFormGroup(
    taskCompletionTimeSimple: TaskCompletionTimeSimpleFormGroupInput = { id: null },
  ): TaskCompletionTimeSimpleFormGroup {
    const taskCompletionTimeSimpleRawValue = {
      ...this.getFormDefaults(),
      ...taskCompletionTimeSimple,
    };
    return new FormGroup<TaskCompletionTimeSimpleFormGroupContent>({
      id: new FormControl(
        { value: taskCompletionTimeSimpleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      participantName: new FormControl(taskCompletionTimeSimpleRawValue.participantName, {
        validators: [Validators.required],
      }),
      sex: new FormControl(taskCompletionTimeSimpleRawValue.sex),
      age: new FormControl(taskCompletionTimeSimpleRawValue.age),
      timeMills: new FormControl(taskCompletionTimeSimpleRawValue.timeMills),
      errors: new FormControl(taskCompletionTimeSimpleRawValue.errors),
    });
  }

  getTaskCompletionTimeSimple(form: TaskCompletionTimeSimpleFormGroup): ITaskCompletionTimeSimple | NewTaskCompletionTimeSimple {
    return form.getRawValue() as ITaskCompletionTimeSimple | NewTaskCompletionTimeSimple;
  }

  resetForm(form: TaskCompletionTimeSimpleFormGroup, taskCompletionTimeSimple: TaskCompletionTimeSimpleFormGroupInput): void {
    const taskCompletionTimeSimpleRawValue = { ...this.getFormDefaults(), ...taskCompletionTimeSimple };
    form.reset(
      {
        ...taskCompletionTimeSimpleRawValue,
        id: { value: taskCompletionTimeSimpleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaskCompletionTimeSimpleFormDefaults {
    return {
      id: null,
    };
  }
}
