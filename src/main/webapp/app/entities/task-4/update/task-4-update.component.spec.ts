import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { Task4Service } from '../service/task-4.service';
import { ITask4 } from '../task-4.model';
import { Task4FormService } from './task-4-form.service';

import { Task4UpdateComponent } from './task-4-update.component';

describe('Task4 Management Update Component', () => {
  let comp: Task4UpdateComponent;
  let fixture: ComponentFixture<Task4UpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let task4FormService: Task4FormService;
  let task4Service: Task4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), Task4UpdateComponent],
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
      .overrideTemplate(Task4UpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Task4UpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    task4FormService = TestBed.inject(Task4FormService);
    task4Service = TestBed.inject(Task4Service);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const task4: ITask4 = { id: 456 };

      activatedRoute.data = of({ task4 });
      comp.ngOnInit();

      expect(comp.task4).toEqual(task4);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask4>>();
      const task4 = { id: 123 };
      jest.spyOn(task4FormService, 'getTask4').mockReturnValue(task4);
      jest.spyOn(task4Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task4 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task4 }));
      saveSubject.complete();

      // THEN
      expect(task4FormService.getTask4).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(task4Service.update).toHaveBeenCalledWith(expect.objectContaining(task4));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask4>>();
      const task4 = { id: 123 };
      jest.spyOn(task4FormService, 'getTask4').mockReturnValue({ id: null });
      jest.spyOn(task4Service, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task4: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task4 }));
      saveSubject.complete();

      // THEN
      expect(task4FormService.getTask4).toHaveBeenCalled();
      expect(task4Service.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask4>>();
      const task4 = { id: 123 };
      jest.spyOn(task4Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task4 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(task4Service.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
