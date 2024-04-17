import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Sex } from 'app/entities/enumerations/sex.model';
import { IRevocabilityPasswordChangeTime } from '../revocability-password-change-time.model';
import { RevocabilityPasswordChangeTimeService } from '../service/revocability-password-change-time.service';
import {
  RevocabilityPasswordChangeTimeFormService,
  RevocabilityPasswordChangeTimeFormGroup,
} from './revocability-password-change-time-form.service';

@Component({
  standalone: true,
  selector: 'jhi-revocability-password-change-time-update',
  templateUrl: './revocability-password-change-time-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RevocabilityPasswordChangeTimeUpdateComponent implements OnInit {
  isSaving = false;
  revocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime | null = null;
  sexValues = Object.keys(Sex);

  editForm: RevocabilityPasswordChangeTimeFormGroup =
    this.revocabilityPasswordChangeTimeFormService.createRevocabilityPasswordChangeTimeFormGroup();

  constructor(
    protected revocabilityPasswordChangeTimeService: RevocabilityPasswordChangeTimeService,
    protected revocabilityPasswordChangeTimeFormService: RevocabilityPasswordChangeTimeFormService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ revocabilityPasswordChangeTime }) => {
      this.revocabilityPasswordChangeTime = revocabilityPasswordChangeTime;
      if (revocabilityPasswordChangeTime) {
        this.updateForm(revocabilityPasswordChangeTime);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const revocabilityPasswordChangeTime = this.revocabilityPasswordChangeTimeFormService.getRevocabilityPasswordChangeTime(this.editForm);
    if (revocabilityPasswordChangeTime.id !== null) {
      this.subscribeToSaveResponse(this.revocabilityPasswordChangeTimeService.update(revocabilityPasswordChangeTime));
    } else {
      this.subscribeToSaveResponse(this.revocabilityPasswordChangeTimeService.create(revocabilityPasswordChangeTime));
    }
  }

  goToChangepass(): void {
    const dateTime: Date = new Date();
    const mills: number = dateTime.getTime();
    localStorage.setItem('taskStartedTime', mills.toString());

    if (this.editForm.get('participantName')?.value !== '') {
      this.router.navigate(['/account/password'], {
        queryParams: {
          participantName: this.editForm.get('participantName')?.value,
          sex: this.editForm.get('sex')?.value,
          age: this.editForm.get('age')?.value,
        },
      });
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRevocabilityPasswordChangeTime>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(revocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime): void {
    this.revocabilityPasswordChangeTime = revocabilityPasswordChangeTime;
    this.revocabilityPasswordChangeTimeFormService.resetForm(this.editForm, revocabilityPasswordChangeTime);
  }
}
