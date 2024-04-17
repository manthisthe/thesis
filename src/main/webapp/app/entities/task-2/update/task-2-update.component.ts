import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Sex } from 'app/entities/enumerations/sex.model';
import { ITask2 } from '../task-2.model';
import { Task2Service } from '../service/task-2.service';
import { Task2FormService, Task2FormGroup } from './task-2-form.service';
import { SharedVariablesService } from 'app/shared/shared-variables.service';

@Component({
  standalone: true,
  selector: 'jhi-task-2-update',
  templateUrl: './task-2-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class Task2UpdateComponent implements OnInit {
  isSaving = false;
  task2: ITask2 | null = null;
  sexValues = Object.keys(Sex);

  editForm: Task2FormGroup = this.task2FormService.createTask2FormGroup();

  constructor(
    private sharedVariablesService: SharedVariablesService,
    protected task2Service: Task2Service,
    protected task2FormService: Task2FormService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task2 }) => {
      this.task2 = task2;
      if (task2) {
        this.updateForm(task2);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task2 = this.task2FormService.getTask2(this.editForm);
    if (task2.id !== null) {
      this.subscribeToSaveResponse(this.task2Service.update(task2));
    } else {
      this.subscribeToSaveResponse(this.task2Service.create(task2));
    }
  }

  startTask2(): void {
    if (
      this.editForm.get('participantName')?.value !== '' &&
      this.editForm.get('sex')?.value !== undefined &&
      this.editForm.get('age')?.value !== undefined
    ) {
      const dateTime: Date = new Date();
      const mills: number = dateTime.getTime();

      //localStorage.setItem('activeTask', 'task2');
      this.sharedVariablesService.setActiveTaskObservable('task2');
      localStorage.setItem('participantName', this.editForm.get('participantName')?.value!);
      localStorage.setItem('sex', this.editForm.get('sex')?.value!);
      const age: string = this.editForm.get('age')!.value!.toString();
      localStorage.setItem('age', age);
      localStorage.setItem('taskStartedTime', mills.toString());

      this.router.navigate(['/account/register-simple']);
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask2>>): void {
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

  protected updateForm(task2: ITask2): void {
    this.task2 = task2;
    this.task2FormService.resetForm(this.editForm, task2);
  }
}
