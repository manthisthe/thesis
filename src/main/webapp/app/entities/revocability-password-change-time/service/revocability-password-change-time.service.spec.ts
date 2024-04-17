import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRevocabilityPasswordChangeTime } from '../revocability-password-change-time.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../revocability-password-change-time.test-samples';

import { RevocabilityPasswordChangeTimeService } from './revocability-password-change-time.service';

const requireRestSample: IRevocabilityPasswordChangeTime = {
  ...sampleWithRequiredData,
};

describe('RevocabilityPasswordChangeTime Service', () => {
  let service: RevocabilityPasswordChangeTimeService;
  let httpMock: HttpTestingController;
  let expectedResult: IRevocabilityPasswordChangeTime | IRevocabilityPasswordChangeTime[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RevocabilityPasswordChangeTimeService);
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

    it('should create a RevocabilityPasswordChangeTime', () => {
      const revocabilityPasswordChangeTime = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(revocabilityPasswordChangeTime).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RevocabilityPasswordChangeTime', () => {
      const revocabilityPasswordChangeTime = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(revocabilityPasswordChangeTime).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RevocabilityPasswordChangeTime', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RevocabilityPasswordChangeTime', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RevocabilityPasswordChangeTime', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRevocabilityPasswordChangeTimeToCollectionIfMissing', () => {
      it('should add a RevocabilityPasswordChangeTime to an empty array', () => {
        const revocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime = sampleWithRequiredData;
        expectedResult = service.addRevocabilityPasswordChangeTimeToCollectionIfMissing([], revocabilityPasswordChangeTime);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(revocabilityPasswordChangeTime);
      });

      it('should not add a RevocabilityPasswordChangeTime to an array that contains it', () => {
        const revocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime = sampleWithRequiredData;
        const revocabilityPasswordChangeTimeCollection: IRevocabilityPasswordChangeTime[] = [
          {
            ...revocabilityPasswordChangeTime,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRevocabilityPasswordChangeTimeToCollectionIfMissing(
          revocabilityPasswordChangeTimeCollection,
          revocabilityPasswordChangeTime,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RevocabilityPasswordChangeTime to an array that doesn't contain it", () => {
        const revocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime = sampleWithRequiredData;
        const revocabilityPasswordChangeTimeCollection: IRevocabilityPasswordChangeTime[] = [sampleWithPartialData];
        expectedResult = service.addRevocabilityPasswordChangeTimeToCollectionIfMissing(
          revocabilityPasswordChangeTimeCollection,
          revocabilityPasswordChangeTime,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(revocabilityPasswordChangeTime);
      });

      it('should add only unique RevocabilityPasswordChangeTime to an array', () => {
        const revocabilityPasswordChangeTimeArray: IRevocabilityPasswordChangeTime[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const revocabilityPasswordChangeTimeCollection: IRevocabilityPasswordChangeTime[] = [sampleWithRequiredData];
        expectedResult = service.addRevocabilityPasswordChangeTimeToCollectionIfMissing(
          revocabilityPasswordChangeTimeCollection,
          ...revocabilityPasswordChangeTimeArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const revocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime = sampleWithRequiredData;
        const revocabilityPasswordChangeTime2: IRevocabilityPasswordChangeTime = sampleWithPartialData;
        expectedResult = service.addRevocabilityPasswordChangeTimeToCollectionIfMissing(
          [],
          revocabilityPasswordChangeTime,
          revocabilityPasswordChangeTime2,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(revocabilityPasswordChangeTime);
        expect(expectedResult).toContain(revocabilityPasswordChangeTime2);
      });

      it('should accept null and undefined values', () => {
        const revocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime = sampleWithRequiredData;
        expectedResult = service.addRevocabilityPasswordChangeTimeToCollectionIfMissing(
          [],
          null,
          revocabilityPasswordChangeTime,
          undefined,
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(revocabilityPasswordChangeTime);
      });

      it('should return initial array if no RevocabilityPasswordChangeTime is added', () => {
        const revocabilityPasswordChangeTimeCollection: IRevocabilityPasswordChangeTime[] = [sampleWithRequiredData];
        expectedResult = service.addRevocabilityPasswordChangeTimeToCollectionIfMissing(
          revocabilityPasswordChangeTimeCollection,
          undefined,
          null,
        );
        expect(expectedResult).toEqual(revocabilityPasswordChangeTimeCollection);
      });
    });

    describe('compareRevocabilityPasswordChangeTime', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRevocabilityPasswordChangeTime(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRevocabilityPasswordChangeTime(entity1, entity2);
        const compareResult2 = service.compareRevocabilityPasswordChangeTime(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRevocabilityPasswordChangeTime(entity1, entity2);
        const compareResult2 = service.compareRevocabilityPasswordChangeTime(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRevocabilityPasswordChangeTime(entity1, entity2);
        const compareResult2 = service.compareRevocabilityPasswordChangeTime(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
