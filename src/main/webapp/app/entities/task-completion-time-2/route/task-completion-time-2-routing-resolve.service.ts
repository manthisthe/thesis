import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaskCompletionTime2 } from '../task-completion-time-2.model';
import { TaskCompletionTime2Service } from '../service/task-completion-time-2.service';

export const taskCompletionTime2Resolve = (route: ActivatedRouteSnapshot): Observable<null | ITaskCompletionTime2> => {
  const id = route.params['id'];
  if (id) {
    return inject(TaskCompletionTime2Service)
      .find(id)
      .pipe(
        mergeMap((taskCompletionTime2: HttpResponse<ITaskCompletionTime2>) => {
          if (taskCompletionTime2.body) {
            return of(taskCompletionTime2.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default taskCompletionTime2Resolve;
