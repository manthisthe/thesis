import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { Task3Service } from '../service/task-3.service';
import { ITask3 } from '../task-3.model';
import { Task3FormService } from './task-3-form.service';

import { Task3UpdateComponent } from './task-3-update.component';

describe('Task3 Management Update Component', () => {
  let comp: Task3UpdateComponent;
  let fixture: ComponentFixture<Task3UpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let task3FormService: Task3FormService;
  let task3Service: Task3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), Task3UpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(Task3UpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Task3UpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    task3FormService = TestBed.inject(Task3FormService);
    task3Service = TestBed.inject(Task3Service);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const task3: ITask3 = { id: 456 };

      activatedRoute.data = of({ task3 });
      comp.ngOnInit();

      expect(comp.task3).toEqual(task3);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask3>>();
      const task3 = { id: 123 };
      jest.spyOn(task3FormService, 'getTask3').mockReturnValue(task3);
      jest.spyOn(task3Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task3 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task3 }));
      saveSubject.complete();

      // THEN
      expect(task3FormService.getTask3).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(task3Service.update).toHaveBeenCalledWith(expect.objectContaining(task3));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask3>>();
      const task3 = { id: 123 };
      jest.spyOn(task3FormService, 'getTask3').mockReturnValue({ id: null });
      jest.spyOn(task3Service, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task3: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task3 }));
      saveSubject.complete();

      // THEN
      expect(task3FormService.getTask3).toHaveBeenCalled();
      expect(task3Service.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask3>>();
      const task3 = { id: 123 };
      jest.spyOn(task3Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task3 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(task3Service.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
