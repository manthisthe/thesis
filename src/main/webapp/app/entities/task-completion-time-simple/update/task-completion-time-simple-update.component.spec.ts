import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TaskCompletionTimeSimpleService } from '../service/task-completion-time-simple.service';
import { ITaskCompletionTimeSimple } from '../task-completion-time-simple.model';
import { TaskCompletionTimeSimpleFormService } from './task-completion-time-simple-form.service';

import { TaskCompletionTimeSimpleUpdateComponent } from './task-completion-time-simple-update.component';

describe('TaskCompletionTimeSimple Management Update Component', () => {
  let comp: TaskCompletionTimeSimpleUpdateComponent;
  let fixture: ComponentFixture<TaskCompletionTimeSimpleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taskCompletionTimeSimpleFormService: TaskCompletionTimeSimpleFormService;
  let taskCompletionTimeSimpleService: TaskCompletionTimeSimpleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TaskCompletionTimeSimpleUpdateComponent],
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
      .overrideTemplate(TaskCompletionTimeSimpleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaskCompletionTimeSimpleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taskCompletionTimeSimpleFormService = TestBed.inject(TaskCompletionTimeSimpleFormService);
    taskCompletionTimeSimpleService = TestBed.inject(TaskCompletionTimeSimpleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const taskCompletionTimeSimple: ITaskCompletionTimeSimple = { id: 456 };

      activatedRoute.data = of({ taskCompletionTimeSimple });
      comp.ngOnInit();

      expect(comp.taskCompletionTimeSimple).toEqual(taskCompletionTimeSimple);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskCompletionTimeSimple>>();
      const taskCompletionTimeSimple = { id: 123 };
      jest.spyOn(taskCompletionTimeSimpleFormService, 'getTaskCompletionTimeSimple').mockReturnValue(taskCompletionTimeSimple);
      jest.spyOn(taskCompletionTimeSimpleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskCompletionTimeSimple });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taskCompletionTimeSimple }));
      saveSubject.complete();

      // THEN
      expect(taskCompletionTimeSimpleFormService.getTaskCompletionTimeSimple).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taskCompletionTimeSimpleService.update).toHaveBeenCalledWith(expect.objectContaining(taskCompletionTimeSimple));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskCompletionTimeSimple>>();
      const taskCompletionTimeSimple = { id: 123 };
      jest.spyOn(taskCompletionTimeSimpleFormService, 'getTaskCompletionTimeSimple').mockReturnValue({ id: null });
      jest.spyOn(taskCompletionTimeSimpleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskCompletionTimeSimple: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taskCompletionTimeSimple }));
      saveSubject.complete();

      // THEN
      expect(taskCompletionTimeSimpleFormService.getTaskCompletionTimeSimple).toHaveBeenCalled();
      expect(taskCompletionTimeSimpleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskCompletionTimeSimple>>();
      const taskCompletionTimeSimple = { id: 123 };
      jest.spyOn(taskCompletionTimeSimpleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskCompletionTimeSimple });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taskCompletionTimeSimpleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
