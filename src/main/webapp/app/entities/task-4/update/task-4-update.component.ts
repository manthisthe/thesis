import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Sex } from 'app/entities/enumerations/sex.model';
import { ITask4 } from '../task-4.model';
import { Task4Service } from '../service/task-4.service';
import { Task4FormService, Task4FormGroup } from './task-4-form.service';
import { SharedVariablesService } from 'app/shared/shared-variables.service';

@Component({
  standalone: true,
  selector: 'jhi-task-4-update',
  templateUrl: './task-4-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class Task4UpdateComponent implements OnInit {
  isSaving = false;
  task4: ITask4 | null = null;
  sexValues = Object.keys(Sex);

  editForm: Task4FormGroup = this.task4FormService.createTask4FormGroup();

  constructor(
    private sharedVariablesService: SharedVariablesService,
    protected router: Router,
    protected task4Service: Task4Service,
    protected task4FormService: Task4FormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task4 }) => {
      this.task4 = task4;
      if (task4) {
        this.updateForm(task4);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task4 = this.task4FormService.getTask4(this.editForm);
    if (task4.id !== null) {
      this.subscribeToSaveResponse(this.task4Service.update(task4));
    } else {
      this.subscribeToSaveResponse(this.task4Service.create(task4));
    }
  }

  startTask4(): void {
    if (
      this.editForm.get('participantName')?.value !== '' &&
      this.editForm.get('sex')?.value !== undefined &&
      this.editForm.get('age')?.value !== undefined
    ) {
      const dateTime: Date = new Date();
      const mills: number = dateTime.getTime();

      //localStorage.setItem('activeTask', 'task2');
      this.sharedVariablesService.setActiveTaskObservable('task4');
      localStorage.setItem('participantName', this.editForm.get('participantName')?.value!);
      localStorage.setItem('sex', this.editForm.get('sex')?.value!);
      const age: string = this.editForm.get('age')!.value!.toString();
      localStorage.setItem('age', age);
      localStorage.setItem('taskStartedTime', mills.toString());

      this.router.navigate(['/account/register']);
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask4>>): void {
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

  protected updateForm(task4: ITask4): void {
    this.task4 = task4;
    this.task4FormService.resetForm(this.editForm, task4);
  }
}
