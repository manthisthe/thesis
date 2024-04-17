import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { Task1VisibilityService } from '../service/task-1-visibility.service';
import { ITask1Visibility } from '../task-1-visibility.model';
import { Task1VisibilityFormService } from './task-1-visibility-form.service';

import { Task1VisibilityUpdateComponent } from './task-1-visibility-update.component';

describe('Task1Visibility Management Update Component', () => {
  let comp: Task1VisibilityUpdateComponent;
  let fixture: ComponentFixture<Task1VisibilityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let task1VisibilityFormService: Task1VisibilityFormService;
  let task1VisibilityService: Task1VisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), Task1VisibilityUpdateComponent],
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
      .overrideTemplate(Task1VisibilityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Task1VisibilityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    task1VisibilityFormService = TestBed.inject(Task1VisibilityFormService);
    task1VisibilityService = TestBed.inject(Task1VisibilityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const task1Visibility: ITask1Visibility = { id: 456 };

      activatedRoute.data = of({ task1Visibility });
      comp.ngOnInit();

      expect(comp.task1Visibility).toEqual(task1Visibility);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask1Visibility>>();
      const task1Visibility = { id: 123 };
      jest.spyOn(task1VisibilityFormService, 'getTask1Visibility').mockReturnValue(task1Visibility);
      jest.spyOn(task1VisibilityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task1Visibility });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task1Visibility }));
      saveSubject.complete();

      // THEN
      expect(task1VisibilityFormService.getTask1Visibility).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(task1VisibilityService.update).toHaveBeenCalledWith(expect.objectContaining(task1Visibility));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask1Visibility>>();
      const task1Visibility = { id: 123 };
      jest.spyOn(task1VisibilityFormService, 'getTask1Visibility').mockReturnValue({ id: null });
      jest.spyOn(task1VisibilityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task1Visibility: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task1Visibility }));
      saveSubject.complete();

      // THEN
      expect(task1VisibilityFormService.getTask1Visibility).toHaveBeenCalled();
      expect(task1VisibilityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask1Visibility>>();
      const task1Visibility = { id: 123 };
      jest.spyOn(task1VisibilityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task1Visibility });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(task1VisibilityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
