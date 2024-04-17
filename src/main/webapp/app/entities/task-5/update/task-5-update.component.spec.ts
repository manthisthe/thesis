import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { Task5Service } from '../service/task-5.service';
import { ITask5 } from '../task-5.model';
import { Task5FormService } from './task-5-form.service';

import { Task5UpdateComponent } from './task-5-update.component';

describe('Task5 Management Update Component', () => {
  let comp: Task5UpdateComponent;
  let fixture: ComponentFixture<Task5UpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let task5FormService: Task5FormService;
  let task5Service: Task5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), Task5UpdateComponent],
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
      .overrideTemplate(Task5UpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Task5UpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    task5FormService = TestBed.inject(Task5FormService);
    task5Service = TestBed.inject(Task5Service);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const task5: ITask5 = { id: 456 };

      activatedRoute.data = of({ task5 });
      comp.ngOnInit();

      expect(comp.task5).toEqual(task5);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask5>>();
      const task5 = { id: 123 };
      jest.spyOn(task5FormService, 'getTask5').mockReturnValue(task5);
      jest.spyOn(task5Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task5 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task5 }));
      saveSubject.complete();

      // THEN
      expect(task5FormService.getTask5).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(task5Service.update).toHaveBeenCalledWith(expect.objectContaining(task5));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask5>>();
      const task5 = { id: 123 };
      jest.spyOn(task5FormService, 'getTask5').mockReturnValue({ id: null });
      jest.spyOn(task5Service, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task5: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task5 }));
      saveSubject.complete();

      // THEN
      expect(task5FormService.getTask5).toHaveBeenCalled();
      expect(task5Service.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask5>>();
      const task5 = { id: 123 };
      jest.spyOn(task5Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task5 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(task5Service.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
