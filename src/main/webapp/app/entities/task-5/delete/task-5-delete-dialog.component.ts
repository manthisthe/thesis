import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITask5 } from '../task-5.model';
import { Task5Service } from '../service/task-5.service';

@Component({
  standalone: true,
  templateUrl: './task-5-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class Task5DeleteDialogComponent {
  task5?: ITask5;

  constructor(
    protected task5Service: Task5Service,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.task5Service.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
