import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../revocability-password-change-time.test-samples';

import { RevocabilityPasswordChangeTimeFormService } from './revocability-password-change-time-form.service';

describe('RevocabilityPasswordChangeTime Form Service', () => {
  let service: RevocabilityPasswordChangeTimeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevocabilityPasswordChangeTimeFormService);
  });

  describe('Service methods', () => {
    describe('createRevocabilityPasswordChangeTimeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRevocabilityPasswordChangeTimeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            participantName: expect.any(Object),
            sex: expect.any(Object),
            age: expect.any(Object),
            timeSeconds: expect.any(Object),
            errors: expect.any(Object),
          }),
        );
      });

      it('passing IRevocabilityPasswordChangeTime should create a new form with FormGroup', () => {
        const formGroup = service.createRevocabilityPasswordChangeTimeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            participantName: expect.any(Object),
            sex: expect.any(Object),
            age: expect.any(Object),
            timeSeconds: expect.any(Object),
            errors: expect.any(Object),
          }),
        );
      });
    });

    describe('getRevocabilityPasswordChangeTime', () => {
      it('should return NewRevocabilityPasswordChangeTime for default RevocabilityPasswordChangeTime initial value', () => {
        const formGroup = service.createRevocabilityPasswordChangeTimeFormGroup(sampleWithNewData);

        const revocabilityPasswordChangeTime = service.getRevocabilityPasswordChangeTime(formGroup) as any;

        expect(revocabilityPasswordChangeTime).toMatchObject(sampleWithNewData);
      });

      it('should return NewRevocabilityPasswordChangeTime for empty RevocabilityPasswordChangeTime initial value', () => {
        const formGroup = service.createRevocabilityPasswordChangeTimeFormGroup();

        const revocabilityPasswordChangeTime = service.getRevocabilityPasswordChangeTime(formGroup) as any;

        expect(revocabilityPasswordChangeTime).toMatchObject({});
      });

      it('should return IRevocabilityPasswordChangeTime', () => {
        const formGroup = service.createRevocabilityPasswordChangeTimeFormGroup(sampleWithRequiredData);

        const revocabilityPasswordChangeTime = service.getRevocabilityPasswordChangeTime(formGroup) as any;

        expect(revocabilityPasswordChangeTime).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRevocabilityPasswordChangeTime should not enable id FormControl', () => {
        const formGroup = service.createRevocabilityPasswordChangeTimeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRevocabilityPasswordChangeTime should disable id FormControl', () => {
        const formGroup = service.createRevocabilityPasswordChangeTimeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
