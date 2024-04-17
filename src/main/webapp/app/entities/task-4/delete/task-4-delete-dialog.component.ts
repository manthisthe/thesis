import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITask4 } from '../task-4.model';
import { Task4Service } from '../service/task-4.service';

@Component({
  standalone: true,
  templateUrl: './task-4-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class Task4DeleteDialogComponent {
  task4?: ITask4;

  constructor(
    protected task4Service: Task4Service,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.task4Service.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
