import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IRevocabilityPasswordChangeTime } from '../revocability-password-change-time.model';
import { RevocabilityPasswordChangeTimeService } from '../service/revocability-password-change-time.service';

import revocabilityPasswordChangeTimeResolve from './revocability-password-change-time-routing-resolve.service';

describe('RevocabilityPasswordChangeTime routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: RevocabilityPasswordChangeTimeService;
  let resultRevocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(RevocabilityPasswordChangeTimeService);
    resultRevocabilityPasswordChangeTime = undefined;
  });

  describe('resolve', () => {
    it('should return IRevocabilityPasswordChangeTime returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        revocabilityPasswordChangeTimeResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultRevocabilityPasswordChangeTime = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRevocabilityPasswordChangeTime).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        revocabilityPasswordChangeTimeResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultRevocabilityPasswordChangeTime = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRevocabilityPasswordChangeTime).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IRevocabilityPasswordChangeTime>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        revocabilityPasswordChangeTimeResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultRevocabilityPasswordChangeTime = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRevocabilityPasswordChangeTime).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
