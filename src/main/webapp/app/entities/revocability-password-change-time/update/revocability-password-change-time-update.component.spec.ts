import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RevocabilityPasswordChangeTimeService } from '../service/revocability-password-change-time.service';
import { IRevocabilityPasswordChangeTime } from '../revocability-password-change-time.model';
import { RevocabilityPasswordChangeTimeFormService } from './revocability-password-change-time-form.service';

import { RevocabilityPasswordChangeTimeUpdateComponent } from './revocability-password-change-time-update.component';

describe('RevocabilityPasswordChangeTime Management Update Component', () => {
  let comp: RevocabilityPasswordChangeTimeUpdateComponent;
  let fixture: ComponentFixture<RevocabilityPasswordChangeTimeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let revocabilityPasswordChangeTimeFormService: RevocabilityPasswordChangeTimeFormService;
  let revocabilityPasswordChangeTimeService: RevocabilityPasswordChangeTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), RevocabilityPasswordChangeTimeUpdateComponent],
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
      .overrideTemplate(RevocabilityPasswordChangeTimeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RevocabilityPasswordChangeTimeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    revocabilityPasswordChangeTimeFormService = TestBed.inject(RevocabilityPasswordChangeTimeFormService);
    revocabilityPasswordChangeTimeService = TestBed.inject(RevocabilityPasswordChangeTimeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const revocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime = { id: 456 };

      activatedRoute.data = of({ revocabilityPasswordChangeTime });
      comp.ngOnInit();

      expect(comp.revocabilityPasswordChangeTime).toEqual(revocabilityPasswordChangeTime);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRevocabilityPasswordChangeTime>>();
      const revocabilityPasswordChangeTime = { id: 123 };
      jest
        .spyOn(revocabilityPasswordChangeTimeFormService, 'getRevocabilityPasswordChangeTime')
        .mockReturnValue(revocabilityPasswordChangeTime);
      jest.spyOn(revocabilityPasswordChangeTimeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ revocabilityPasswordChangeTime });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: revocabilityPasswordChangeTime }));
      saveSubject.complete();

      // THEN
      expect(revocabilityPasswordChangeTimeFormService.getRevocabilityPasswordChangeTime).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(revocabilityPasswordChangeTimeService.update).toHaveBeenCalledWith(expect.objectContaining(revocabilityPasswordChangeTime));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRevocabilityPasswordChangeTime>>();
      const revocabilityPasswordChangeTime = { id: 123 };
      jest.spyOn(revocabilityPasswordChangeTimeFormService, 'getRevocabilityPasswordChangeTime').mockReturnValue({ id: null });
      jest.spyOn(revocabilityPasswordChangeTimeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ revocabilityPasswordChangeTime: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: revocabilityPasswordChangeTime }));
      saveSubject.complete();

      // THEN
      expect(revocabilityPasswordChangeTimeFormService.getRevocabilityPasswordChangeTime).toHaveBeenCalled();
      expect(revocabilityPasswordChangeTimeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRevocabilityPasswordChangeTime>>();
      const revocabilityPasswordChangeTime = { id: 123 };
      jest.spyOn(revocabilityPasswordChangeTimeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ revocabilityPasswordChangeTime });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(revocabilityPasswordChangeTimeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
