import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITask3 } from '../task-3.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../task-3.test-samples';

import { Task3Service } from './task-3.service';

const requireRestSample: ITask3 = {
  ...sampleWithRequiredData,
};

describe('Task3 Service', () => {
  let service: Task3Service;
  let httpMock: HttpTestingController;
  let expectedResult: ITask3 | ITask3[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(Task3Service);
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

    it('should create a Task3', () => {
      const task3 = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(task3).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Task3', () => {
      const task3 = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(task3).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Task3', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Task3', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Task3', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTask3ToCollectionIfMissing', () => {
      it('should add a Task3 to an empty array', () => {
        const task3: ITask3 = sampleWithRequiredData;
        expectedResult = service.addTask3ToCollectionIfMissing([], task3);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task3);
      });

      it('should not add a Task3 to an array that contains it', () => {
        const task3: ITask3 = sampleWithRequiredData;
        const task3Collection: ITask3[] = [
          {
            ...task3,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTask3ToCollectionIfMissing(task3Collection, task3);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Task3 to an array that doesn't contain it", () => {
        const task3: ITask3 = sampleWithRequiredData;
        const task3Collection: ITask3[] = [sampleWithPartialData];
        expectedResult = service.addTask3ToCollectionIfMissing(task3Collection, task3);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task3);
      });

      it('should add only unique Task3 to an array', () => {
        const task3Array: ITask3[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const task3Collection: ITask3[] = [sampleWithRequiredData];
        expectedResult = service.addTask3ToCollectionIfMissing(task3Collection, ...task3Array);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const task3: ITask3 = sampleWithRequiredData;
        const task32: ITask3 = sampleWithPartialData;
        expectedResult = service.addTask3ToCollectionIfMissing([], task3, task32);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task3);
        expect(expectedResult).toContain(task32);
      });

      it('should accept null and undefined values', () => {
        const task3: ITask3 = sampleWithRequiredData;
        expectedResult = service.addTask3ToCollectionIfMissing([], null, task3, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task3);
      });

      it('should return initial array if no Task3 is added', () => {
        const task3Collection: ITask3[] = [sampleWithRequiredData];
        expectedResult = service.addTask3ToCollectionIfMissing(task3Collection, undefined, null);
        expect(expectedResult).toEqual(task3Collection);
      });
    });

    describe('compareTask3', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTask3(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTask3(entity1, entity2);
        const compareResult2 = service.compareTask3(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTask3(entity1, entity2);
        const compareResult2 = service.compareTask3(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTask3(entity1, entity2);
        const compareResult2 = service.compareTask3(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
