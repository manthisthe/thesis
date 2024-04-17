import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Sex } from 'app/entities/enumerations/sex.model';
import { ITask3 } from '../task-3.model';
import { Task3Service } from '../service/task-3.service';
import { Task3FormService, Task3FormGroup } from './task-3-form.service';
import { SharedVariablesService } from 'app/shared/shared-variables.service';

@Component({
  standalone: true,
  selector: 'jhi-task-3-update',
  templateUrl: './task-3-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class Task3UpdateComponent implements OnInit {
  isSaving = false;
  task3: ITask3 | null = null;
  sexValues = Object.keys(Sex);

  editForm: Task3FormGroup = this.task3FormService.createTask3FormGroup();

  constructor(
    private sharedVariablesService: SharedVariablesService,
    protected task3Service: Task3Service,
    protected task3FormService: Task3FormService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task3 }) => {
      this.task3 = task3;
      if (task3) {
        this.updateForm(task3);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task3 = this.task3FormService.getTask3(this.editForm);
    if (task3.id !== null) {
      this.subscribeToSaveResponse(this.task3Service.update(task3));
    } else {
      this.subscribeToSaveResponse(this.task3Service.create(task3));
    }
  }

  startTask3(): void {
    if (
      this.editForm.get('participantName')?.value !== '' &&
      this.editForm.get('sex')?.value !== undefined &&
      this.editForm.get('age')?.value !== undefined
    ) {
      const dateTime: Date = new Date();
      const mills: number = dateTime.getTime();

      this.sharedVariablesService.setActiveTaskObservable('task3');
      localStorage.setItem('participantName', this.editForm.get('participantName')?.value!);
      localStorage.setItem('sex', this.editForm.get('sex')?.value!);
      const age: string = this.editForm.get('age')!.value!.toString();
      localStorage.setItem('age', age);
      localStorage.setItem('taskStartedTime', mills.toString());

      this.router.navigate(['/account/password-simple']);
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask3>>): void {
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

  protected updateForm(task3: ITask3): void {
    this.task3 = task3;
    this.task3FormService.resetForm(this.editForm, task3);
  }
}
