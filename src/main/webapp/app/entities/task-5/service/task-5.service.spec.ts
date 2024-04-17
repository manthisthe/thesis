import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITask5 } from '../task-5.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../task-5.test-samples';

import { Task5Service } from './task-5.service';

const requireRestSample: ITask5 = {
  ...sampleWithRequiredData,
};

describe('Task5 Service', () => {
  let service: Task5Service;
  let httpMock: HttpTestingController;
  let expectedResult: ITask5 | ITask5[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(Task5Service);
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

    it('should create a Task5', () => {
      const task5 = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(task5).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Task5', () => {
      const task5 = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(task5).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Task5', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Task5', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Task5', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTask5ToCollectionIfMissing', () => {
      it('should add a Task5 to an empty array', () => {
        const task5: ITask5 = sampleWithRequiredData;
        expectedResult = service.addTask5ToCollectionIfMissing([], task5);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task5);
      });

      it('should not add a Task5 to an array that contains it', () => {
        const task5: ITask5 = sampleWithRequiredData;
        const task5Collection: ITask5[] = [
          {
            ...task5,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTask5ToCollectionIfMissing(task5Collection, task5);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Task5 to an array that doesn't contain it", () => {
        const task5: ITask5 = sampleWithRequiredData;
        const task5Collection: ITask5[] = [sampleWithPartialData];
        expectedResult = service.addTask5ToCollectionIfMissing(task5Collection, task5);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task5);
      });

      it('should add only unique Task5 to an array', () => {
        const task5Array: ITask5[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const task5Collection: ITask5[] = [sampleWithRequiredData];
        expectedResult = service.addTask5ToCollectionIfMissing(task5Collection, ...task5Array);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const task5: ITask5 = sampleWithRequiredData;
        const task52: ITask5 = sampleWithPartialData;
        expectedResult = service.addTask5ToCollectionIfMissing([], task5, task52);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task5);
        expect(expectedResult).toContain(task52);
      });

      it('should accept null and undefined values', () => {
        const task5: ITask5 = sampleWithRequiredData;
        expectedResult = service.addTask5ToCollectionIfMissing([], null, task5, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task5);
      });

      it('should return initial array if no Task5 is added', () => {
        const task5Collection: ITask5[] = [sampleWithRequiredData];
        expectedResult = service.addTask5ToCollectionIfMissing(task5Collection, undefined, null);
        expect(expectedResult).toEqual(task5Collection);
      });
    });

    describe('compareTask5', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTask5(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTask5(entity1, entity2);
        const compareResult2 = service.compareTask5(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTask5(entity1, entity2);
        const compareResult2 = service.compareTask5(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTask5(entity1, entity2);
        const compareResult2 = service.compareTask5(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
