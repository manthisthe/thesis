import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITask2 } from '../task-2.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../task-2.test-samples';

import { Task2Service } from './task-2.service';

const requireRestSample: ITask2 = {
  ...sampleWithRequiredData,
};

describe('Task2 Service', () => {
  let service: Task2Service;
  let httpMock: HttpTestingController;
  let expectedResult: ITask2 | ITask2[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(Task2Service);
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

    it('should create a Task2', () => {
      const task2 = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(task2).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Task2', () => {
      const task2 = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(task2).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Task2', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Task2', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Task2', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTask2ToCollectionIfMissing', () => {
      it('should add a Task2 to an empty array', () => {
        const task2: ITask2 = sampleWithRequiredData;
        expectedResult = service.addTask2ToCollectionIfMissing([], task2);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task2);
      });

      it('should not add a Task2 to an array that contains it', () => {
        const task2: ITask2 = sampleWithRequiredData;
        const task2Collection: ITask2[] = [
          {
            ...task2,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTask2ToCollectionIfMissing(task2Collection, task2);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Task2 to an array that doesn't contain it", () => {
        const task2: ITask2 = sampleWithRequiredData;
        const task2Collection: ITask2[] = [sampleWithPartialData];
        expectedResult = service.addTask2ToCollectionIfMissing(task2Collection, task2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task2);
      });

      it('should add only unique Task2 to an array', () => {
        const task2Array: ITask2[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const task2Collection: ITask2[] = [sampleWithRequiredData];
        expectedResult = service.addTask2ToCollectionIfMissing(task2Collection, ...task2Array);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const task2: ITask2 = sampleWithRequiredData;
        const task22: ITask2 = sampleWithPartialData;
        expectedResult = service.addTask2ToCollectionIfMissing([], task2, task22);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task2);
        expect(expectedResult).toContain(task22);
      });

      it('should accept null and undefined values', () => {
        const task2: ITask2 = sampleWithRequiredData;
        expectedResult = service.addTask2ToCollectionIfMissing([], null, task2, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task2);
      });

      it('should return initial array if no Task2 is added', () => {
        const task2Collection: ITask2[] = [sampleWithRequiredData];
        expectedResult = service.addTask2ToCollectionIfMissing(task2Collection, undefined, null);
        expect(expectedResult).toEqual(task2Collection);
      });
    });

    describe('compareTask2', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTask2(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTask2(entity1, entity2);
        const compareResult2 = service.compareTask2(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTask2(entity1, entity2);
        const compareResult2 = service.compareTask2(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTask2(entity1, entity2);
        const compareResult2 = service.compareTask2(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
