import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../task-completion-time-2.test-samples';

import { TaskCompletionTime2FormService } from './task-completion-time-2-form.service';

describe('TaskCompletionTime2 Form Service', () => {
  let service: TaskCompletionTime2FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCompletionTime2FormService);
  });

  describe('Service methods', () => {
    describe('createTaskCompletionTime2FormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaskCompletionTime2FormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            participantName: expect.any(Object),
            sex: expect.any(Object),
            age: expect.any(Object),
            timeSeconds: expect.any(Object),
          }),
        );
      });

      it('passing ITaskCompletionTime2 should create a new form with FormGroup', () => {
        const formGroup = service.createTaskCompletionTime2FormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            participantName: expect.any(Object),
            sex: expect.any(Object),
            age: expect.any(Object),
            timeSeconds: expect.any(Object),
          }),
        );
      });
    });

    describe('getTaskCompletionTime2', () => {
      it('should return NewTaskCompletionTime2 for default TaskCompletionTime2 initial value', () => {
        const formGroup = service.createTaskCompletionTime2FormGroup(sampleWithNewData);

        const taskCompletionTime2 = service.getTaskCompletionTime2(formGroup) as any;

        expect(taskCompletionTime2).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaskCompletionTime2 for empty TaskCompletionTime2 initial value', () => {
        const formGroup = service.createTaskCompletionTime2FormGroup();

        const taskCompletionTime2 = service.getTaskCompletionTime2(formGroup) as any;

        expect(taskCompletionTime2).toMatchObject({});
      });

      it('should return ITaskCompletionTime2', () => {
        const formGroup = service.createTaskCompletionTime2FormGroup(sampleWithRequiredData);

        const taskCompletionTime2 = service.getTaskCompletionTime2(formGroup) as any;

        expect(taskCompletionTime2).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaskCompletionTime2 should not enable id FormControl', () => {
        const formGroup = service.createTaskCompletionTime2FormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaskCompletionTime2 should disable id FormControl', () => {
        const formGroup = service.createTaskCompletionTime2FormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
