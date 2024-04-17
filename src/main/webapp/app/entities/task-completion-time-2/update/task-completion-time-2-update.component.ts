import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Sex } from 'app/entities/enumerations/sex.model';
import { ITaskCompletionTime2 } from '../task-completion-time-2.model';
import { TaskCompletionTime2Service } from '../service/task-completion-time-2.service';
import { TaskCompletionTime2FormService, TaskCompletionTime2FormGroup } from './task-completion-time-2-form.service';

@Component({
  standalone: true,
  selector: 'jhi-task-completion-time-2-update',
  templateUrl: './task-completion-time-2-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TaskCompletionTime2UpdateComponent implements OnInit {
  isSaving = false;
  taskCompletionTime2: ITaskCompletionTime2 | null = null;
  sexValues = Object.keys(Sex);

  editForm: TaskCompletionTime2FormGroup = this.taskCompletionTime2FormService.createTaskCompletionTime2FormGroup();

  constructor(
    protected taskCompletionTime2Service: TaskCompletionTime2Service,
    protected taskCompletionTime2FormService: TaskCompletionTime2FormService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taskCompletionTime2 }) => {
      this.taskCompletionTime2 = taskCompletionTime2;
      if (taskCompletionTime2) {
        this.updateForm(taskCompletionTime2);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  goToRegister(): void {
    const dateTime: Date = new Date();
    const mills: number = dateTime.getTime();
    localStorage.setItem('taskStartedTime', mills.toString());

    if (this.editForm.get('participantName')?.value !== '') {
      this.router.navigate(['/account/register'], {
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
    const taskCompletionTime2 = this.taskCompletionTime2FormService.getTaskCompletionTime2(this.editForm);
    if (taskCompletionTime2.id !== null) {
      this.subscribeToSaveResponse(this.taskCompletionTime2Service.update(taskCompletionTime2));
    } else {
      this.subscribeToSaveResponse(this.taskCompletionTime2Service.create(taskCompletionTime2));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskCompletionTime2>>): void {
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

  protected updateForm(taskCompletionTime2: ITaskCompletionTime2): void {
    this.taskCompletionTime2 = taskCompletionTime2;
    this.taskCompletionTime2FormService.resetForm(this.editForm, taskCompletionTime2);
  }
}
