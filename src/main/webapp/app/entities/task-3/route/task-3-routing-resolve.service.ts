import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITask3 } from '../task-3.model';
import { Task3Service } from '../service/task-3.service';

export const task3Resolve = (route: ActivatedRouteSnapshot): Observable<null | ITask3> => {
  const id = route.params['id'];
  if (id) {
    return inject(Task3Service)
      .find(id)
      .pipe(
        mergeMap((task3: HttpResponse<ITask3>) => {
          if (task3.body) {
            return of(task3.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default task3Resolve;
