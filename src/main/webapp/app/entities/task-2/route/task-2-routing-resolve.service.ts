import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITask2 } from '../task-2.model';
import { Task2Service } from '../service/task-2.service';

export const task2Resolve = (route: ActivatedRouteSnapshot): Observable<null | ITask2> => {
  const id = route.params['id'];
  if (id) {
    return inject(Task2Service)
      .find(id)
      .pipe(
        mergeMap((task2: HttpResponse<ITask2>) => {
          if (task2.body) {
            return of(task2.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default task2Resolve;
