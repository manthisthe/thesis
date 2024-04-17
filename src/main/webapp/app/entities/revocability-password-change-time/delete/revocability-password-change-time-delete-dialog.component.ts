import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IRevocabilityPasswordChangeTime } from '../revocability-password-change-time.model';
import { RevocabilityPasswordChangeTimeService } from '../service/revocability-password-change-time.service';

@Component({
  standalone: true,
  templateUrl: './revocability-password-change-time-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class RevocabilityPasswordChangeTimeDeleteDialogComponent {
  revocabilityPasswordChangeTime?: IRevocabilityPasswordChangeTime;

  constructor(
    protected revocabilityPasswordChangeTimeService: RevocabilityPasswordChangeTimeService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.revocabilityPasswordChangeTimeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
