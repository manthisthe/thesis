import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Sex } from 'app/entities/enumerations/sex.model';
import { ITask1Visibility } from '../task-1-visibility.model';
import { Task1VisibilityService } from '../service/task-1-visibility.service';
import { Task1VisibilityFormService, Task1VisibilityFormGroup } from './task-1-visibility-form.service';
import { SharedVariablesService } from 'app/shared/shared-variables.service';

@Component({
  standalone: true,
  selector: 'jhi-task-1-visibility-update',
  templateUrl: './task-1-visibility-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class Task1VisibilityUpdateComponent implements OnInit {
  isSaving = false;
  task1Visibility: ITask1Visibility | null = null;
  sexValues = Object.keys(Sex);
  form1Visible = true;

  editForm: Task1VisibilityFormGroup = this.task1VisibilityFormService.createTask1VisibilityFormGroup();

  constructor(
    private sharedVariablesService: SharedVariablesService,
    protected task1VisibilityService: Task1VisibilityService,
    protected task1VisibilityFormService: Task1VisibilityFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task1Visibility }) => {
      this.task1Visibility = task1Visibility;
      if (task1Visibility) {
        this.updateForm(task1Visibility);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task1Visibility = this.task1VisibilityFormService.getTask1Visibility(this.editForm);
    if (task1Visibility.id !== null) {
      this.subscribeToSaveResponse(this.task1VisibilityService.update(task1Visibility));
    } else {
      this.subscribeToSaveResponse(this.task1VisibilityService.create(task1Visibility));
    }
  }

  startTask1(): void {
    const dateTime: Date = new Date();
    const mills: number = dateTime.getTime();

    //localStorage.setItem('activeTask', 'task1');
    this.sharedVariablesService.setActiveTaskObservable('task1');

    localStorage.setItem('participantName', this.editForm.get('participantName')?.value!);
    localStorage.setItem('sex', this.editForm.get('sex')?.value!);
    const age: string = this.editForm.get('age')!.value!.toString();
    localStorage.setItem('age', age);
    localStorage.setItem('taskStartedTime', mills.toString());

    this.form1Visible = false;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask1Visibility>>): void {
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

  protected updateForm(task1Visibility: ITask1Visibility): void {
    this.task1Visibility = task1Visibility;
    this.task1VisibilityFormService.resetForm(this.editForm, task1Visibility);
  }
}
