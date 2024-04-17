import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITaskCompletionTimeSimple } from '../task-completion-time-simple.model';
import { TaskCompletionTimeSimpleService } from '../service/task-completion-time-simple.service';

@Component({
  standalone: true,
  templateUrl: './task-completion-time-simple-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TaskCompletionTimeSimpleDeleteDialogComponent {
  taskCompletionTimeSimple?: ITaskCompletionTimeSimple;

  constructor(
    protected taskCompletionTimeSimpleService: TaskCompletionTimeSimpleService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskCompletionTimeSimpleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
