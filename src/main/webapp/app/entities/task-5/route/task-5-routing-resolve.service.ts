import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITask5 } from '../task-5.model';
import { Task5Service } from '../service/task-5.service';

export const task5Resolve = (route: ActivatedRouteSnapshot): Observable<null | ITask5> => {
  const id = route.params['id'];
  if (id) {
    return inject(Task5Service)
      .find(id)
      .pipe(
        mergeMap((task5: HttpResponse<ITask5>) => {
          if (task5.body) {
            return of(task5.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default task5Resolve;
