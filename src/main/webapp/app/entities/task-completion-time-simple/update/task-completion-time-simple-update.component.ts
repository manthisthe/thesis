import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Sex } from 'app/entities/enumerations/sex.model';
import { ITaskCompletionTimeSimple, NewTaskCompletionTimeSimple } from '../task-completion-time-simple.model';
import { TaskCompletionTimeSimpleService } from '../service/task-completion-time-simple.service';
import { TaskCompletionTimeSimpleFormService, TaskCompletionTimeSimpleFormGroup } from './task-completion-time-simple-form.service';

@Component({
  standalone: true,
  selector: 'jhi-task-completion-time-simple-update',
  templateUrl: './task-completion-time-simple-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaskCompletionTimeSimpleUpdateComponent implements OnInit {
  isSaving = false;
  taskCompletionTimeSimple: ITaskCompletionTimeSimple | null = null;
  sexValues = Object.keys(Sex);

  editForm: TaskCompletionTimeSimpleFormGroup = this.taskCompletionTimeSimpleFormService.createTaskCompletionTimeSimpleFormGroup();

  constructor(
    protected taskCompletionTimeSimpleService: TaskCompletionTimeSimpleService,
    protected taskCompletionTimeSimpleFormService: TaskCompletionTimeSimpleFormService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taskCompletionTimeSimple }) => {
      this.taskCompletionTimeSimple = taskCompletionTimeSimple;
      if (taskCompletionTimeSimple) {
        this.updateForm(taskCompletionTimeSimple);
      }
    });
    this.editForm.get('participantName')?.setValue('');
  }

  previousState(): void {
    window.history.back();
  }

  goToRegisterSimple(): void {
    const dateTime: Date = new Date();
    const mills: number = dateTime.getTime();
    localStorage.setItem('taskStartedTime', mills.toString());

    if (this.editForm.get('participantName')?.value !== '') {
      this.router.navigate(['/account/register-simple'], {
        queryParams: {
          participantName: this.editForm.get('participantName')?.value,
          sex: this.editForm.get('sex')?.value,
          age: this.editForm.get('age')?.value,
        },
      });
    }
  }

  save(): void {
    this.isSaving = true;
    const taskCompletionTimeSimple = this.taskCompletionTimeSimpleFormService.getTaskCompletionTimeSimple(this.editForm);
    if (taskCompletionTimeSimple.id !== null) {
      this.subscribeToSaveResponse(this.taskCompletionTimeSimpleService.update(taskCompletionTimeSimple));
    } else {
      this.subscribeToSaveResponse(this.taskCompletionTimeSimpleService.create(taskCompletionTimeSimple));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskCompletionTimeSimple>>): void {
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

  protected updateForm(taskCompletionTimeSimple: ITaskCompletionTimeSimple): void {
    this.taskCompletionTimeSimple = taskCompletionTimeSimple;
    this.taskCompletionTimeSimpleFormService.resetForm(this.editForm, taskCompletionTimeSimple);
  }
}
