import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../task-4.test-samples';

import { Task4FormService } from './task-4-form.service';

describe('Task4 Form Service', () => {
  let service: Task4FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Task4FormService);
  });

  describe('Service methods', () => {
    describe('createTask4FormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTask4FormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            participantName: expect.any(Object),
            sex: expect.any(Object),
            age: expect.any(Object),
            taskCompletionTimeSeconds: expect.any(Object),
            errors: expect.any(Object),
          }),
        );
      });

      it('passing ITask4 should create a new form with FormGroup', () => {
        const formGroup = service.createTask4FormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            participantName: expect.any(Object),
            sex: expect.any(Object),
            age: expect.any(Object),
            taskCompletionTimeSeconds: expect.any(Object),
            errors: expect.any(Object),
          }),
        );
      });
    });

    describe('getTask4', () => {
      it('should return NewTask4 for default Task4 initial value', () => {
        const formGroup = service.createTask4FormGroup(sampleWithNewData);

        const task4 = service.getTask4(formGroup) as any;

        expect(task4).toMatchObject(sampleWithNewData);
      });

      it('should return NewTask4 for empty Task4 initial value', () => {
        const formGroup = service.createTask4FormGroup();

        const task4 = service.getTask4(formGroup) as any;

        expect(task4).toMatchObject({});
      });

      it('should return ITask4', () => {
        const formGroup = service.createTask4FormGroup(sampleWithRequiredData);

        const task4 = service.getTask4(formGroup) as any;

        expect(task4).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITask4 should not enable id FormControl', () => {
        const formGroup = service.createTask4FormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTask4 should disable id FormControl', () => {
        const formGroup = service.createTask4FormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
