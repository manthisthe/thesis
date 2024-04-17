import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Sex } from 'app/entities/enumerations/sex.model';
import { ITask5 } from '../task-5.model';
import { Task5Service } from '../service/task-5.service';
import { Task5FormService, Task5FormGroup } from './task-5-form.service';
import { SharedVariablesService } from 'app/shared/shared-variables.service';

@Component({
  standalone: true,
  selector: 'jhi-task-5-update',
  templateUrl: './task-5-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class Task5UpdateComponent implements OnInit {
  isSaving = false;
  task5: ITask5 | null = null;
  sexValues = Object.keys(Sex);

  editForm: Task5FormGroup = this.task5FormService.createTask5FormGroup();

  constructor(
    private sharedVariablesService: SharedVariablesService,
    private router: Router,
    protected task5Service: Task5Service,
    protected task5FormService: Task5FormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task5 }) => {
      this.task5 = task5;
      if (task5) {
        this.updateForm(task5);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task5 = this.task5FormService.getTask5(this.editForm);
    if (task5.id !== null) {
      this.subscribeToSaveResponse(this.task5Service.update(task5));
    } else {
      this.subscribeToSaveResponse(this.task5Service.create(task5));
    }
  }

  startTask5(): void {
    if (
      this.editForm.get('participantName')?.value !== '' &&
      this.editForm.get('sex')?.value !== undefined &&
      this.editForm.get('age')?.value !== undefined
    ) {
      const dateTime: Date = new Date();
      const mills: number = dateTime.getTime();

      this.sharedVariablesService.setActiveTaskObservable('task5');
      localStorage.setItem('participantName', this.editForm.get('participantName')?.value!);
      localStorage.setItem('sex', this.editForm.get('sex')?.value!);
      const age: string = this.editForm.get('age')!.value!.toString();
      localStorage.setItem('age', age);
      localStorage.setItem('taskStartedTime', mills.toString());

      this.router.navigate(['/account/password']);
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask5>>): void {
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

  protected updateForm(task5: ITask5): void {
    this.task5 = task5;
    this.task5FormService.resetForm(this.editForm, task5);
  }
}
