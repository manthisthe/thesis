import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITask4 } from '../task-4.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../task-4.test-samples';

import { Task4Service } from './task-4.service';

const requireRestSample: ITask4 = {
  ...sampleWithRequiredData,
};

describe('Task4 Service', () => {
  let service: Task4Service;
  let httpMock: HttpTestingController;
  let expectedResult: ITask4 | ITask4[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(Task4Service);
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

    it('should create a Task4', () => {
      const task4 = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(task4).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Task4', () => {
      const task4 = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(task4).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Task4', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Task4', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Task4', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTask4ToCollectionIfMissing', () => {
      it('should add a Task4 to an empty array', () => {
        const task4: ITask4 = sampleWithRequiredData;
        expectedResult = service.addTask4ToCollectionIfMissing([], task4);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task4);
      });

      it('should not add a Task4 to an array that contains it', () => {
        const task4: ITask4 = sampleWithRequiredData;
        const task4Collection: ITask4[] = [
          {
            ...task4,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTask4ToCollectionIfMissing(task4Collection, task4);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Task4 to an array that doesn't contain it", () => {
        const task4: ITask4 = sampleWithRequiredData;
        const task4Collection: ITask4[] = [sampleWithPartialData];
        expectedResult = service.addTask4ToCollectionIfMissing(task4Collection, task4);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task4);
      });

      it('should add only unique Task4 to an array', () => {
        const task4Array: ITask4[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const task4Collection: ITask4[] = [sampleWithRequiredData];
        expectedResult = service.addTask4ToCollectionIfMissing(task4Collection, ...task4Array);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const task4: ITask4 = sampleWithRequiredData;
        const task42: ITask4 = sampleWithPartialData;
        expectedResult = service.addTask4ToCollectionIfMissing([], task4, task42);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task4);
        expect(expectedResult).toContain(task42);
      });

      it('should accept null and undefined values', () => {
        const task4: ITask4 = sampleWithRequiredData;
        expectedResult = service.addTask4ToCollectionIfMissing([], null, task4, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task4);
      });

      it('should return initial array if no Task4 is added', () => {
        const task4Collection: ITask4[] = [sampleWithRequiredData];
        expectedResult = service.addTask4ToCollectionIfMissing(task4Collection, undefined, null);
        expect(expectedResult).toEqual(task4Collection);
      });
    });

    describe('compareTask4', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTask4(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTask4(entity1, entity2);
        const compareResult2 = service.compareTask4(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTask4(entity1, entity2);
        const compareResult2 = service.compareTask4(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTask4(entity1, entity2);
        const compareResult2 = service.compareTask4(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
