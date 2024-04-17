import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITask1Visibility } from '../task-1-visibility.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../task-1-visibility.test-samples';

import { Task1VisibilityService } from './task-1-visibility.service';

const requireRestSample: ITask1Visibility = {
  ...sampleWithRequiredData,
};

describe('Task1Visibility Service', () => {
  let service: Task1VisibilityService;
  let httpMock: HttpTestingController;
  let expectedResult: ITask1Visibility | ITask1Visibility[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(Task1VisibilityService);
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

    it('should create a Task1Visibility', () => {
      const task1Visibility = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(task1Visibility).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Task1Visibility', () => {
      const task1Visibility = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(task1Visibility).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Task1Visibility', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Task1Visibility', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Task1Visibility', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTask1VisibilityToCollectionIfMissing', () => {
      it('should add a Task1Visibility to an empty array', () => {
        const task1Visibility: ITask1Visibility = sampleWithRequiredData;
        expectedResult = service.addTask1VisibilityToCollectionIfMissing([], task1Visibility);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task1Visibility);
      });

      it('should not add a Task1Visibility to an array that contains it', () => {
        const task1Visibility: ITask1Visibility = sampleWithRequiredData;
        const task1VisibilityCollection: ITask1Visibility[] = [
          {
            ...task1Visibility,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTask1VisibilityToCollectionIfMissing(task1VisibilityCollection, task1Visibility);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Task1Visibility to an array that doesn't contain it", () => {
        const task1Visibility: ITask1Visibility = sampleWithRequiredData;
        const task1VisibilityCollection: ITask1Visibility[] = [sampleWithPartialData];
        expectedResult = service.addTask1VisibilityToCollectionIfMissing(task1VisibilityCollection, task1Visibility);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task1Visibility);
      });

      it('should add only unique Task1Visibility to an array', () => {
        const task1VisibilityArray: ITask1Visibility[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const task1VisibilityCollection: ITask1Visibility[] = [sampleWithRequiredData];
        expectedResult = service.addTask1VisibilityToCollectionIfMissing(task1VisibilityCollection, ...task1VisibilityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const task1Visibility: ITask1Visibility = sampleWithRequiredData;
        const task1Visibility2: ITask1Visibility = sampleWithPartialData;
        expectedResult = service.addTask1VisibilityToCollectionIfMissing([], task1Visibility, task1Visibility2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task1Visibility);
        expect(expectedResult).toContain(task1Visibility2);
      });

      it('should accept null and undefined values', () => {
        const task1Visibility: ITask1Visibility = sampleWithRequiredData;
        expectedResult = service.addTask1VisibilityToCollectionIfMissing([], null, task1Visibility, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task1Visibility);
      });

      it('should return initial array if no Task1Visibility is added', () => {
        const task1VisibilityCollection: ITask1Visibility[] = [sampleWithRequiredData];
        expectedResult = service.addTask1VisibilityToCollectionIfMissing(task1VisibilityCollection, undefined, null);
        expect(expectedResult).toEqual(task1VisibilityCollection);
      });
    });

    describe('compareTask1Visibility', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTask1Visibility(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTask1Visibility(entity1, entity2);
        const compareResult2 = service.compareTask1Visibility(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTask1Visibility(entity1, entity2);
        const compareResult2 = service.compareTask1Visibility(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTask1Visibility(entity1, entity2);
        const compareResult2 = service.compareTask1Visibility(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
