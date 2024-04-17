import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITask4 } from '../task-4.model';
import { Task4Service } from '../service/task-4.service';

export const task4Resolve = (route: ActivatedRouteSnapshot): Observable<null | ITask4> => {
  const id = route.params['id'];
  if (id) {
    return inject(Task4Service)
      .find(id)
      .pipe(
        mergeMap((task4: HttpResponse<ITask4>) => {
          if (task4.body) {
            return of(task4.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default task4Resolve;
