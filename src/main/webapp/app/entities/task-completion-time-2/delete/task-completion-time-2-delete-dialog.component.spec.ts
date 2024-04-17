jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskCompletionTime2Service } from '../service/task-completion-time-2.service';

import { TaskCompletionTime2DeleteDialogComponent } from './task-completion-time-2-delete-dialog.component';

describe('TaskCompletionTime2 Management Delete Component', () => {
  let comp: TaskCompletionTime2DeleteDialogComponent;
  let fixture: ComponentFixture<TaskCompletionTime2DeleteDialogComponent>;
  let service: TaskCompletionTime2Service;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TaskCompletionTime2DeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(TaskCompletionTime2DeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TaskCompletionTime2DeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TaskCompletionTime2Service);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
