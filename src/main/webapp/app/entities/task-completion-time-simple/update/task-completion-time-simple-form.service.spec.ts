import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../task-completion-time-simple.test-samples';

import { TaskCompletionTimeSimpleFormService } from './task-completion-time-simple-form.service';

describe('TaskCompletionTimeSimple Form Service', () => {
  let service: TaskCompletionTimeSimpleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCompletionTimeSimpleFormService);
  });

  describe('Service methods', () => {
    describe('createTaskCompletionTimeSimpleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaskCompletionTimeSimpleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            participantName: expect.any(Object),
            sex: expect.any(Object),
            age: expect.any(Object),
            timeMills: expect.any(Object),
            errors: expect.any(Object),
          }),
        );
      });

      it('passing ITaskCompletionTimeSimple should create a new form with FormGroup', () => {
        const formGroup = service.createTaskCompletionTimeSimpleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            participantName: expect.any(Object),
            sex: expect.any(Object),
            age: expect.any(Object),
            timeMills: expect.any(Object),
            errors: expect.any(Object),
          }),
        );
      });
    });

    describe('getTaskCompletionTimeSimple', () => {
      it('should return NewTaskCompletionTimeSimple for default TaskCompletionTimeSimple initial value', () => {
        const formGroup = service.createTaskCompletionTimeSimpleFormGroup(sampleWithNewData);

        const taskCompletionTimeSimple = service.getTaskCompletionTimeSimple(formGroup) as any;

        expect(taskCompletionTimeSimple).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaskCompletionTimeSimple for empty TaskCompletionTimeSimple initial value', () => {
        const formGroup = service.createTaskCompletionTimeSimpleFormGroup();

        const taskCompletionTimeSimple = service.getTaskCompletionTimeSimple(formGroup) as any;

        expect(taskCompletionTimeSimple).toMatchObject({});
      });

      it('should return ITaskCompletionTimeSimple', () => {
        const formGroup = service.createTaskCompletionTimeSimpleFormGroup(sampleWithRequiredData);

        const taskCompletionTimeSimple = service.getTaskCompletionTimeSimple(formGroup) as any;

        expect(taskCompletionTimeSimple).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaskCompletionTimeSimple should not enable id FormControl', () => {
        const formGroup = service.createTaskCompletionTimeSimpleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaskCompletionTimeSimple should disable id FormControl', () => {
        const formGroup = service.createTaskCompletionTimeSimpleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
