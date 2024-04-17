import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITaskCompletionTimeSimple } from '../task-completion-time-simple.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../task-completion-time-simple.test-samples';

import { TaskCompletionTimeSimpleService } from './task-completion-time-simple.service';

const requireRestSample: ITaskCompletionTimeSimple = {
  ...sampleWithRequiredData,
};

describe('TaskCompletionTimeSimple Service', () => {
  let service: TaskCompletionTimeSimpleService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaskCompletionTimeSimple | ITaskCompletionTimeSimple[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TaskCompletionTimeSimpleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a TaskCompletionTimeSimple', () => {
      const taskCompletionTimeSimple = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taskCompletionTimeSimple).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaskCompletionTimeSimple', () => {
      const taskCompletionTimeSimple = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taskCompletionTimeSimple).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaskCompletionTimeSimple', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaskCompletionTimeSimple', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaskCompletionTimeSimple', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaskCompletionTimeSimpleToCollectionIfMissing', () => {
      it('should add a TaskCompletionTimeSimple to an empty array', () => {
        const taskCompletionTimeSimple: ITaskCompletionTimeSimple = sampleWithRequiredData;
        expectedResult = service.addTaskCompletionTimeSimpleToCollectionIfMissing([], taskCompletionTimeSimple);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taskCompletionTimeSimple);
      });

      it('should not add a TaskCompletionTimeSimple to an array that contains it', () => {
        const taskCompletionTimeSimple: ITaskCompletionTimeSimple = sampleWithRequiredData;
        const taskCompletionTimeSimpleCollection: ITaskCompletionTimeSimple[] = [
          {
            ...taskCompletionTimeSimple,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaskCompletionTimeSimpleToCollectionIfMissing(
          taskCompletionTimeSimpleCollection,
          taskCompletionTimeSimple,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaskCompletionTimeSimple to an array that doesn't contain it", () => {
        const taskCompletionTimeSimple: ITaskCompletionTimeSimple = sampleWithRequiredData;
        const taskCompletionTimeSimpleCollection: ITaskCompletionTimeSimple[] = [sampleWithPartialData];
        expectedResult = service.addTaskCompletionTimeSimpleToCollectionIfMissing(
          taskCompletionTimeSimpleCollection,
          taskCompletionTimeSimple,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taskCompletionTimeSimple);
      });

      it('should add only unique TaskCompletionTimeSimple to an array', () => {
        const taskCompletionTimeSimpleArray: ITaskCompletionTimeSimple[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const taskCompletionTimeSimpleCollection: ITaskCompletionTimeSimple[] = [sampleWithRequiredData];
        expectedResult = service.addTaskCompletionTimeSimpleToCollectionIfMissing(
          taskCompletionTimeSimpleCollection,
          ...taskCompletionTimeSimpleArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taskCompletionTimeSimple: ITaskCompletionTimeSimple = sampleWithRequiredData;
        const taskCompletionTimeSimple2: ITaskCompletionTimeSimple = sampleWithPartialData;
        expectedResult = service.addTaskCompletionTimeSimpleToCollectionIfMissing([], taskCompletionTimeSimple, taskCompletionTimeSimple2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taskCompletionTimeSimple);
        expect(expectedResult).toContain(taskCompletionTimeSimple2);
      });

      it('should accept null and undefined values', () => {
        const taskCompletionTimeSimple: ITaskCompletionTimeSimple = sampleWithRequiredData;
        expectedResult = service.addTaskCompletionTimeSimpleToCollectionIfMissing([], null, taskCompletionTimeSimple, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taskCompletionTimeSimple);
      });

      it('should return initial array if no TaskCompletionTimeSimple is added', () => {
        const taskCompletionTimeSimpleCollection: ITaskCompletionTimeSimple[] = [sampleWithRequiredData];
        expectedResult = service.addTaskCompletionTimeSimpleToCollectionIfMissing(taskCompletionTimeSimpleCollection, undefined, null);
        expect(expectedResult).toEqual(taskCompletionTimeSimpleCollection);
      });
    });

    describe('compareTaskCompletionTimeSimple', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaskCompletionTimeSimple(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaskCompletionTimeSimple(entity1, entity2);
        const compareResult2 = service.compareTaskCompletionTimeSimple(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaskCompletionTimeSimple(entity1, entity2);
        const compareResult2 = service.compareTaskCompletionTimeSimple(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaskCompletionTimeSimple(entity1, entity2);
        const compareResult2 = service.compareTaskCompletionTimeSimple(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
