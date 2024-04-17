jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Task1VisibilityService } from '../service/task-1-visibility.service';

import { Task1VisibilityDeleteDialogComponent } from './task-1-visibility-delete-dialog.component';

describe('Task1Visibility Management Delete Component', () => {
  let comp: Task1VisibilityDeleteDialogComponent;
  let fixture: ComponentFixture<Task1VisibilityDeleteDialogComponent>;
  let service: Task1VisibilityService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, Task1VisibilityDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(Task1VisibilityDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(Task1VisibilityDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(Task1VisibilityService);
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
