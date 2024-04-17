import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TaskCompletionTime2Service } from '../service/task-completion-time-2.service';
import { ITaskCompletionTime2 } from '../task-completion-time-2.model';
import { TaskCompletionTime2FormService } from './task-completion-time-2-form.service';

import { TaskCompletionTime2UpdateComponent } from './task-completion-time-2-update.component';

describe('TaskCompletionTime2 Management Update Component', () => {
  let comp: TaskCompletionTime2UpdateComponent;
  let fixture: ComponentFixture<TaskCompletionTime2UpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taskCompletionTime2FormService: TaskCompletionTime2FormService;
  let taskCompletionTime2Service: TaskCompletionTime2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TaskCompletionTime2UpdateComponent],
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
      .overrideTemplate(TaskCompletionTime2UpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaskCompletionTime2UpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taskCompletionTime2FormService = TestBed.inject(TaskCompletionTime2FormService);
    taskCompletionTime2Service = TestBed.inject(TaskCompletionTime2Service);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const taskCompletionTime2: ITaskCompletionTime2 = { id: 456 };

      activatedRoute.data = of({ taskCompletionTime2 });
      comp.ngOnInit();

      expect(comp.taskCompletionTime2).toEqual(taskCompletionTime2);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskCompletionTime2>>();
      const taskCompletionTime2 = { id: 123 };
      jest.spyOn(taskCompletionTime2FormService, 'getTaskCompletionTime2').mockReturnValue(taskCompletionTime2);
      jest.spyOn(taskCompletionTime2Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskCompletionTime2 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taskCompletionTime2 }));
      saveSubject.complete();

      // THEN
      expect(taskCompletionTime2FormService.getTaskCompletionTime2).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taskCompletionTime2Service.update).toHaveBeenCalledWith(expect.objectContaining(taskCompletionTime2));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskCompletionTime2>>();
      const taskCompletionTime2 = { id: 123 };
      jest.spyOn(taskCompletionTime2FormService, 'getTaskCompletionTime2').mockReturnValue({ id: null });
      jest.spyOn(taskCompletionTime2Service, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskCompletionTime2: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taskCompletionTime2 }));
      saveSubject.complete();

      // THEN
      expect(taskCompletionTime2FormService.getTaskCompletionTime2).toHaveBeenCalled();
      expect(taskCompletionTime2Service.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskCompletionTime2>>();
      const taskCompletionTime2 = { id: 123 };
      jest.spyOn(taskCompletionTime2Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskCompletionTime2 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taskCompletionTime2Service.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
