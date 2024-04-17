import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITaskCompletionTimeSimple } from '../task-completion-time-simple.model';
import { TaskCompletionTimeSimpleService } from '../service/task-completion-time-simple.service';

import taskCompletionTimeSimpleResolve from './task-completion-time-simple-routing-resolve.service';

describe('TaskCompletionTimeSimple routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: TaskCompletionTimeSimpleService;
  let resultTaskCompletionTimeSimple: ITaskCompletionTimeSimple | null | undefined;

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
    service = TestBed.inject(TaskCompletionTimeSimpleService);
    resultTaskCompletionTimeSimple = undefined;
  });

  describe('resolve', () => {
    it('should return ITaskCompletionTimeSimple returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taskCompletionTimeSimpleResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaskCompletionTimeSimple = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTaskCompletionTimeSimple).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        taskCompletionTimeSimpleResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaskCompletionTimeSimple = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTaskCompletionTimeSimple).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITaskCompletionTimeSimple>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taskCompletionTimeSimpleResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaskCompletionTimeSimple = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTaskCompletionTimeSimple).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
