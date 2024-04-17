import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../task-3.test-samples';

import { Task3FormService } from './task-3-form.service';

describe('Task3 Form Service', () => {
  let service: Task3FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Task3FormService);
  });

  describe('Service methods', () => {
    describe('createTask3FormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTask3FormGroup();

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

      it('passing ITask3 should create a new form with FormGroup', () => {
        const formGroup = service.createTask3FormGroup(sampleWithRequiredData);

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

    describe('getTask3', () => {
      it('should return NewTask3 for default Task3 initial value', () => {
        const formGroup = service.createTask3FormGroup(sampleWithNewData);

        const task3 = service.getTask3(formGroup) as any;

        expect(task3).toMatchObject(sampleWithNewData);
      });

      it('should return NewTask3 for empty Task3 initial value', () => {
        const formGroup = service.createTask3FormGroup();

        const task3 = service.getTask3(formGroup) as any;

        expect(task3).toMatchObject({});
      });

      it('should return ITask3', () => {
        const formGroup = service.createTask3FormGroup(sampleWithRequiredData);

        const task3 = service.getTask3(formGroup) as any;

        expect(task3).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITask3 should not enable id FormControl', () => {
        const formGroup = service.createTask3FormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTask3 should disable id FormControl', () => {
        const formGroup = service.createTask3FormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
