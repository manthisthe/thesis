import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaskCompletionTimeSimple } from '../task-completion-time-simple.model';
import { TaskCompletionTimeSimpleService } from '../service/task-completion-time-simple.service';

export const taskCompletionTimeSimpleResolve = (route: ActivatedRouteSnapshot): Observable<null | ITaskCompletionTimeSimple> => {
  const id = route.params['id'];
  if (id) {
    return inject(TaskCompletionTimeSimpleService)
      .find(id)
      .pipe(
        mergeMap((taskCompletionTimeSimple: HttpResponse<ITaskCompletionTimeSimple>) => {
          if (taskCompletionTimeSimple.body) {
            return of(taskCompletionTimeSimple.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default taskCompletionTimeSimpleResolve;
