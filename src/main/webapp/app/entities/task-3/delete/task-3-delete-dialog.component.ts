import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITask3 } from '../task-3.model';
import { Task3Service } from '../service/task-3.service';

@Component({
  standalone: true,
  templateUrl: './task-3-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class Task3DeleteDialogComponent {
  task3?: ITask3;

  constructor(
    protected task3Service: Task3Service,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.task3Service.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
