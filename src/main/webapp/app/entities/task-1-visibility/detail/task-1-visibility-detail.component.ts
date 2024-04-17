import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITask1Visibility } from '../task-1-visibility.model';

@Component({
  standalone: true,
  selector: 'jhi-task-1-visibility-detail',
  templateUrl: './task-1-visibility-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class Task1VisibilityDetailComponent {
  @Input() task1Visibility: ITask1Visibility | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
