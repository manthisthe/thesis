import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../task-5.test-samples';

import { Task5FormService } from './task-5-form.service';

describe('Task5 Form Service', () => {
  let service: Task5FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Task5FormService);
  });

  describe('Service methods', () => {
    describe('createTask5FormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTask5FormGroup();

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

      it('passing ITask5 should create a new form with FormGroup', () => {
        const formGroup = service.createTask5FormGroup(sampleWithRequiredData);

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

    describe('getTask5', () => {
      it('should return NewTask5 for default Task5 initial value', () => {
        const formGroup = service.createTask5FormGroup(sampleWithNewData);

        const task5 = service.getTask5(formGroup) as any;

        expect(task5).toMatchObject(sampleWithNewData);
      });

      it('should return NewTask5 for empty Task5 initial value', () => {
        const formGroup = service.createTask5FormGroup();

        const task5 = service.getTask5(formGroup) as any;

        expect(task5).toMatchObject({});
      });

      it('should return ITask5', () => {
        const formGroup = service.createTask5FormGroup(sampleWithRequiredData);

        const task5 = service.getTask5(formGroup) as any;

        expect(task5).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITask5 should not enable id FormControl', () => {
        const formGroup = service.createTask5FormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTask5 should disable id FormControl', () => {
        const formGroup = service.createTask5FormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
