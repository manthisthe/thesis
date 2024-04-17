import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITask1Visibility } from '../task-1-visibility.model';
import { Task1VisibilityService } from '../service/task-1-visibility.service';

export const task1VisibilityResolve = (route: ActivatedRouteSnapshot): Observable<null | ITask1Visibility> => {
  const id = route.params['id'];
  if (id) {
    return inject(Task1VisibilityService)
      .find(id)
      .pipe(
        mergeMap((task1Visibility: HttpResponse<ITask1Visibility>) => {
          if (task1Visibility.body) {
            return of(task1Visibility.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default task1VisibilityResolve;
