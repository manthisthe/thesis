import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../task-2.test-samples';

import { Task2FormService } from './task-2-form.service';

describe('Task2 Form Service', () => {
  let service: Task2FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Task2FormService);
  });

  describe('Service methods', () => {
    describe('createTask2FormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTask2FormGroup();

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

      it('passing ITask2 should create a new form with FormGroup', () => {
        const formGroup = service.createTask2FormGroup(sampleWithRequiredData);

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

    describe('getTask2', () => {
      it('should return NewTask2 for default Task2 initial value', () => {
        const formGroup = service.createTask2FormGroup(sampleWithNewData);

        const task2 = service.getTask2(formGroup) as any;

        expect(task2).toMatchObject(sampleWithNewData);
      });

      it('should return NewTask2 for empty Task2 initial value', () => {
        const formGroup = service.createTask2FormGroup();

        const task2 = service.getTask2(formGroup) as any;

        expect(task2).toMatchObject({});
      });

      it('should return ITask2', () => {
        const formGroup = service.createTask2FormGroup(sampleWithRequiredData);

        const task2 = service.getTask2(formGroup) as any;

        expect(task2).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITask2 should not enable id FormControl', () => {
        const formGroup = service.createTask2FormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTask2 should disable id FormControl', () => {
        const formGroup = service.createTask2FormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
