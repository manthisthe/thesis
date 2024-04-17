import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITask2 } from '../task-2.model';
import { Task2Service } from '../service/task-2.service';

@Component({
  standalone: true,
  templateUrl: './task-2-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class Task2DeleteDialogComponent {
  task2?: ITask2;

  constructor(
    protected task2Service: Task2Service,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.task2Service.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
