import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRevocabilityPasswordChangeTime, NewRevocabilityPasswordChangeTime } from '../revocability-password-change-time.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRevocabilityPasswordChangeTime for edit and NewRevocabilityPasswordChangeTimeFormGroupInput for create.
 */
type RevocabilityPasswordChangeTimeFormGroupInput =
  | IRevocabilityPasswordChangeTime
  | PartialWithRequiredKeyOf<NewRevocabilityPasswordChangeTime>;

type RevocabilityPasswordChangeTimeFormDefaults = Pick<NewRevocabilityPasswordChangeTime, 'id'>;

type RevocabilityPasswordChangeTimeFormGroupContent = {
  id: FormControl<IRevocabilityPasswordChangeTime['id'] | NewRevocabilityPasswordChangeTime['id']>;
  participantName: FormControl<IRevocabilityPasswordChangeTime['participantName']>;
  sex: FormControl<IRevocabilityPasswordChangeTime['sex']>;
  age: FormControl<IRevocabilityPasswordChangeTime['age']>;
  timeSeconds: FormControl<IRevocabilityPasswordChangeTime['timeSeconds']>;
  errors: FormControl<IRevocabilityPasswordChangeTime['errors']>;
};

export type RevocabilityPasswordChangeTimeFormGroup = FormGroup<RevocabilityPasswordChangeTimeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RevocabilityPasswordChangeTimeFormService {
  createRevocabilityPasswordChangeTimeFormGroup(
    revocabilityPasswordChangeTime: RevocabilityPasswordChangeTimeFormGroupInput = { id: null },
  ): RevocabilityPasswordChangeTimeFormGroup {
    const revocabilityPasswordChangeTimeRawValue = {
      ...this.getFormDefaults(),
      ...revocabilityPasswordChangeTime,
    };
    return new FormGroup<RevocabilityPasswordChangeTimeFormGroupContent>({
      id: new FormControl(
        { value: revocabilityPasswordChangeTimeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      participantName: new FormControl(revocabilityPasswordChangeTimeRawValue.participantName),
      sex: new FormControl(revocabilityPasswordChangeTimeRawValue.sex),
      age: new FormControl(revocabilityPasswordChangeTimeRawValue.age),
      timeSeconds: new FormControl(revocabilityPasswordChangeTimeRawValue.timeSeconds),
      errors: new FormControl(revocabilityPasswordChangeTimeRawValue.errors),
    });
  }

  getRevocabilityPasswordChangeTime(
    form: RevocabilityPasswordChangeTimeFormGroup,
  ): IRevocabilityPasswordChangeTime | NewRevocabilityPasswordChangeTime {
    return form.getRawValue() as IRevocabilityPasswordChangeTime | NewRevocabilityPasswordChangeTime;
  }

  resetForm(
    form: RevocabilityPasswordChangeTimeFormGroup,
    revocabilityPasswordChangeTime: RevocabilityPasswordChangeTimeFormGroupInput,
  ): void {
    const revocabilityPasswordChangeTimeRawValue = { ...this.getFormDefaults(), ...revocabilityPasswordChangeTime };
    form.reset(
      {
        ...revocabilityPasswordChangeTimeRawValue,
        id: { value: revocabilityPasswordChangeTimeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RevocabilityPasswordChangeTimeFormDefaults {
    return {
      id: null,
    };
  }
}
