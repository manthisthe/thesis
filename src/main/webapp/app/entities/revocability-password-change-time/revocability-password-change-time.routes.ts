import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { RevocabilityPasswordChangeTimeComponent } from './list/revocability-password-change-time.component';
import { RevocabilityPasswordChangeTimeDetailComponent } from './detail/revocability-password-change-time-detail.component';
import { RevocabilityPasswordChangeTimeUpdateComponent } from './update/revocability-password-change-time-update.component';
import RevocabilityPasswordChangeTimeResolve from './route/revocability-password-change-time-routing-resolve.service';

const revocabilityPasswordChangeTimeRoute: Routes = [
  {
    path: '',
    component: RevocabilityPasswordChangeTimeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RevocabilityPasswordChangeTimeDetailComponent,
    resolve: {
      revocabilityPasswordChangeTime: RevocabilityPasswordChangeTimeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RevocabilityPasswordChangeTimeUpdateComponent,
    resolve: {
      revocabilityPasswordChangeTime: RevocabilityPasswordChangeTimeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RevocabilityPasswordChangeTimeUpdateComponent,
    resolve: {
      revocabilityPasswordChangeTime: RevocabilityPasswordChangeTimeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default revocabilityPasswordChangeTimeRoute;
