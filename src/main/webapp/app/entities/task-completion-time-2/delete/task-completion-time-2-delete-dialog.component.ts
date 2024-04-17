import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITaskCompletionTime2 } from '../task-completion-time-2.model';
import { TaskCompletionTime2Service } from '../service/task-completion-time-2.service';

@Component({
  standalone: true,
  templateUrl: './task-completion-time-2-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TaskCompletionTime2DeleteDialogComponent {
  taskCompletionTime2?: ITaskCompletionTime2;

  constructor(
    protected taskCompletionTime2Service: TaskCompletionTime2Service,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskCompletionTime2Service.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
