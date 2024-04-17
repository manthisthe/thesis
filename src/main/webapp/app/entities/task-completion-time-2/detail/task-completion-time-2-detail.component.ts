import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITaskCompletionTime2 } from '../task-completion-time-2.model';

@Component({
  standalone: true,
  selector: 'jhi-task-completion-time-2-detail',
  templateUrl: './task-completion-time-2-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TaskCompletionTime2DetailComponent {
  @Input() taskCompletionTime2: ITaskCompletionTime2 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
