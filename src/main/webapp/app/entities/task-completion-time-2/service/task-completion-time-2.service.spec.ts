import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITaskCompletionTime2 } from '../task-completion-time-2.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../task-completion-time-2.test-samples';

import { TaskCompletionTime2Service } from './task-completion-time-2.service';

const requireRestSample: ITaskCompletionTime2 = {
  ...sampleWithRequiredData,
};

describe('TaskCompletionTime2 Service', () => {
  let service: TaskCompletionTime2Service;
  let httpMock: HttpTestingController;
  let expectedResult: ITaskCompletionTime2 | ITaskCompletionTime2[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TaskCompletionTime2Service);
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

    it('should create a TaskCompletionTime2', () => {
      const taskCompletionTime2 = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taskCompletionTime2).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaskCompletionTime2', () => {
      const taskCompletionTime2 = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taskCompletionTime2).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaskCompletionTime2', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaskCompletionTime2', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaskCompletionTime2', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaskCompletionTime2ToCollectionIfMissing', () => {
      it('should add a TaskCompletionTime2 to an empty array', () => {
        const taskCompletionTime2: ITaskCompletionTime2 = sampleWithRequiredData;
        expectedResult = service.addTaskCompletionTime2ToCollectionIfMissing([], taskCompletionTime2);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taskCompletionTime2);
      });

      it('should not add a TaskCompletionTime2 to an array that contains it', () => {
        const taskCompletionTime2: ITaskCompletionTime2 = sampleWithRequiredData;
        const taskCompletionTime2Collection: ITaskCompletionTime2[] = [
          {
            ...taskCompletionTime2,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaskCompletionTime2ToCollectionIfMissing(taskCompletionTime2Collection, taskCompletionTime2);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaskCompletionTime2 to an array that doesn't contain it", () => {
        const taskCompletionTime2: ITaskCompletionTime2 = sampleWithRequiredData;
        const taskCompletionTime2Collection: ITaskCompletionTime2[] = [sampleWithPartialData];
        expectedResult = service.addTaskCompletionTime2ToCollectionIfMissing(taskCompletionTime2Collection, taskCompletionTime2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taskCompletionTime2);
      });

      it('should add only unique TaskCompletionTime2 to an array', () => {
        const taskCompletionTime2Array: ITaskCompletionTime2[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taskCompletionTime2Collection: ITaskCompletionTime2[] = [sampleWithRequiredData];
        expectedResult = service.addTaskCompletionTime2ToCollectionIfMissing(taskCompletionTime2Collection, ...taskCompletionTime2Array);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taskCompletionTime2: ITaskCompletionTime2 = sampleWithRequiredData;
        const taskCompletionTime22: ITaskCompletionTime2 = sampleWithPartialData;
        expectedResult = service.addTaskCompletionTime2ToCollectionIfMissing([], taskCompletionTime2, taskCompletionTime22);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taskCompletionTime2);
        expect(expectedResult).toContain(taskCompletionTime22);
      });

      it('should accept null and undefined values', () => {
        const taskCompletionTime2: ITaskCompletionTime2 = sampleWithRequiredData;
        expectedResult = service.addTaskCompletionTime2ToCollectionIfMissing([], null, taskCompletionTime2, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taskCompletionTime2);
      });

      it('should return initial array if no TaskCompletionTime2 is added', () => {
        const taskCompletionTime2Collection: ITaskCompletionTime2[] = [sampleWithRequiredData];
        expectedResult = service.addTaskCompletionTime2ToCollectionIfMissing(taskCompletionTime2Collection, undefined, null);
        expect(expectedResult).toEqual(taskCompletionTime2Collection);
      });
    });

    describe('compareTaskCompletionTime2', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaskCompletionTime2(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaskCompletionTime2(entity1, entity2);
        const compareResult2 = service.compareTaskCompletionTime2(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaskCompletionTime2(entity1, entity2);
        const compareResult2 = service.compareTaskCompletionTime2(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaskCompletionTime2(entity1, entity2);
        const compareResult2 = service.compareTaskCompletionTime2(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
