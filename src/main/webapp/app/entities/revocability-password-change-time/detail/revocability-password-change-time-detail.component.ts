import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IRevocabilityPasswordChangeTime } from '../revocability-password-change-time.model';

@Component({
  standalone: true,
  selector: 'jhi-revocability-password-change-time-detail',
  templateUrl: './revocability-password-change-time-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class RevocabilityPasswordChangeTimeDetailComponent {
  @Input() revocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
