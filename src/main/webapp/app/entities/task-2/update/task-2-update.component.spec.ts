import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { Task2Service } from '../service/task-2.service';
import { ITask2 } from '../task-2.model';
import { Task2FormService } from './task-2-form.service';

import { Task2UpdateComponent } from './task-2-update.component';

describe('Task2 Management Update Component', () => {
  let comp: Task2UpdateComponent;
  let fixture: ComponentFixture<Task2UpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let task2FormService: Task2FormService;
  let task2Service: Task2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), Task2UpdateComponent],
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
      .overrideTemplate(Task2UpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Task2UpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    task2FormService = TestBed.inject(Task2FormService);
    task2Service = TestBed.inject(Task2Service);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const task2: ITask2 = { id: 456 };

      activatedRoute.data = of({ task2 });
      comp.ngOnInit();

      expect(comp.task2).toEqual(task2);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask2>>();
      const task2 = { id: 123 };
      jest.spyOn(task2FormService, 'getTask2').mockReturnValue(task2);
      jest.spyOn(task2Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task2 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task2 }));
      saveSubject.complete();

      // THEN
      expect(task2FormService.getTask2).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(task2Service.update).toHaveBeenCalledWith(expect.objectContaining(task2));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask2>>();
      const task2 = { id: 123 };
      jest.spyOn(task2FormService, 'getTask2').mockReturnValue({ id: null });
      jest.spyOn(task2Service, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task2: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task2 }));
      saveSubject.complete();

      // THEN
      expect(task2FormService.getTask2).toHaveBeenCalled();
      expect(task2Service.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask2>>();
      const task2 = { id: 123 };
      jest.spyOn(task2Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task2 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(task2Service.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
