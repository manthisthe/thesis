import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../task-1-visibility.test-samples';

import { Task1VisibilityFormService } from './task-1-visibility-form.service';

describe('Task1Visibility Form Service', () => {
  let service: Task1VisibilityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Task1VisibilityFormService);
  });

  describe('Service methods', () => {
    describe('createTask1VisibilityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTask1VisibilityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            participantName: expect.any(Object),
            sex: expect.any(Object),
            age: expect.any(Object),
            timecompletionTimeSeconds: expect.any(Object),
            errors: expect.any(Object),
            taskCompleted: expect.any(Object),
          }),
        );
      });

      it('passing ITask1Visibility should create a new form with FormGroup', () => {
        const formGroup = service.createTask1VisibilityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            participantName: expect.any(Object),
            sex: expect.any(Object),
            age: expect.any(Object),
            timecompletionTimeSeconds: expect.any(Object),
            errors: expect.any(Object),
            taskCompleted: expect.any(Object),
          }),
        );
      });
    });

    describe('getTask1Visibility', () => {
      it('should return NewTask1Visibility for default Task1Visibility initial value', () => {
        const formGroup = service.createTask1VisibilityFormGroup(sampleWithNewData);

        const task1Visibility = service.getTask1Visibility(formGroup) as any;

        expect(task1Visibility).toMatchObject(sampleWithNewData);
      });

      it('should return NewTask1Visibility for empty Task1Visibility initial value', () => {
        const formGroup = service.createTask1VisibilityFormGroup();

        const task1Visibility = service.getTask1Visibility(formGroup) as any;

        expect(task1Visibility).toMatchObject({});
      });

      it('should return ITask1Visibility', () => {
        const formGroup = service.createTask1VisibilityFormGroup(sampleWithRequiredData);

        const task1Visibility = service.getTask1Visibility(formGroup) as any;

        expect(task1Visibility).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITask1Visibility should not enable id FormControl', () => {
        const formGroup = service.createTask1VisibilityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTask1Visibility should disable id FormControl', () => {
        const formGroup = service.createTask1VisibilityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
