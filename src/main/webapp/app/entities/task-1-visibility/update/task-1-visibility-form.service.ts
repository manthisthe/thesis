import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITask1Visibility, NewTask1Visibility } from '../task-1-visibility.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITask1Visibility for edit and NewTask1VisibilityFormGroupInput for create.
 */
type Task1VisibilityFormGroupInput = ITask1Visibility | PartialWithRequiredKeyOf<NewTask1Visibility>;

type Task1VisibilityFormDefaults = Pick<NewTask1Visibility, 'id' | 'taskCompleted'>;

type Task1VisibilityFormGroupContent = {
  id: FormControl<ITask1Visibility['id'] | NewTask1Visibility['id']>;
  participantName: FormControl<ITask1Visibility['participantName']>;
  sex: FormControl<ITask1Visibility['sex']>;
  age: FormControl<ITask1Visibility['age']>;
  timecompletionTimeSeconds: FormControl<ITask1Visibility['timecompletionTimeSeconds']>;
  errors: FormControl<ITask1Visibility['errors']>;
  taskCompleted: FormControl<ITask1Visibility['taskCompleted']>;
};

export type Task1VisibilityFormGroup = FormGroup<Task1VisibilityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class Task1VisibilityFormService {
  createTask1VisibilityFormGroup(task1Visibility: Task1VisibilityFormGroupInput = { id: null }): Task1VisibilityFormGroup {
    const task1VisibilityRawValue = {
      ...this.getFormDefaults(),
      ...task1Visibility,
    };
    return new FormGroup<Task1VisibilityFormGroupContent>({
      id: new FormControl(
        { value: task1VisibilityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      participantName: new FormControl(task1VisibilityRawValue.participantName, {
        validators: [Validators.required],
      }),
      sex: new FormControl(task1VisibilityRawValue.sex, {
        validators: [Validators.required],
      }),
      age: new FormControl(task1VisibilityRawValue.age, {
        validators: [Validators.required],
      }),
      timecompletionTimeSeconds: new FormControl(task1VisibilityRawValue.timecompletionTimeSeconds),
      errors: new FormControl(task1VisibilityRawValue.errors),
      taskCompleted: new FormControl(task1VisibilityRawValue.taskCompleted),
    });
  }

  getTask1Visibility(form: Task1VisibilityFormGroup): ITask1Visibility | NewTask1Visibility {
    return form.getRawValue() as ITask1Visibility | NewTask1Visibility;
  }

  resetForm(form: Task1VisibilityFormGroup, task1Visibility: Task1VisibilityFormGroupInput): void {
    const task1VisibilityRawValue = { ...this.getFormDefaults(), ...task1Visibility };
    form.reset(
      {
        ...task1VisibilityRawValue,
        id: { value: task1VisibilityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): Task1VisibilityFormDefaults {
    return {
      id: null,
      taskCompleted: false,
    };
  }
}
