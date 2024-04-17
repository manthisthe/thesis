import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITask1Visibility } from '../task-1-visibility.model';
import { Task1VisibilityService } from '../service/task-1-visibility.service';

@Component({
  standalone: true,
  templateUrl: './task-1-visibility-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class Task1VisibilityDeleteDialogComponent {
  task1Visibility?: ITask1Visibility;

  constructor(
    protected task1VisibilityService: Task1VisibilityService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.task1VisibilityService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
