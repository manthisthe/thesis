import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRevocabilityPasswordChangeTime } from '../revocability-password-change-time.model';
import { RevocabilityPasswordChangeTimeService } from '../service/revocability-password-change-time.service';

export const revocabilityPasswordChangeTimeResolve = (
  route: ActivatedRouteSnapshot,
): Observable<null | IRevocabilityPasswordChangeTime> => {
  const id = route.params['id'];
  if (id) {
    return inject(RevocabilityPasswordChangeTimeService)
      .find(id)
      .pipe(
        mergeMap((revocabilityPasswordChangeTime: HttpResponse<IRevocabilityPasswordChangeTime>) => {
          if (revocabilityPasswordChangeTime.body) {
            return of(revocabilityPasswordChangeTime.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default revocabilityPasswordChangeTimeResolve;
