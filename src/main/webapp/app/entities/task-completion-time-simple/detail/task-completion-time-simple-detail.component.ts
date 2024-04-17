import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITaskCompletionTimeSimple } from '../task-completion-time-simple.model';

@Component({
  standalone: true,
  selector: 'jhi-task-completion-time-simple-detail',
  templateUrl: './task-completion-time-simple-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TaskCompletionTimeSimpleDetailComponent {
  @Input() taskCompletionTimeSimple: ITaskCompletionTimeSimple | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
