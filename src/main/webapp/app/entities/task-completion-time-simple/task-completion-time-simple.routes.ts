import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TaskCompletionTimeSimpleComponent } from './list/task-completion-time-simple.component';
import { TaskCompletionTimeSimpleDetailComponent } from './detail/task-completion-time-simple-detail.component';
import { TaskCompletionTimeSimpleUpdateComponent } from './update/task-completion-time-simple-update.component';
import TaskCompletionTimeSimpleResolve from './route/task-completion-time-simple-routing-resolve.service';

const taskCompletionTimeSimpleRoute: Routes = [
  {
    path: '',
    component: TaskCompletionTimeSimpleComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaskCompletionTimeSimpleDetailComponent,
    resolve: {
      taskCompletionTimeSimple: TaskCompletionTimeSimpleResolve,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaskCompletionTimeSimpleUpdateComponent,
    resolve: {
      taskCompletionTimeSimple: TaskCompletionTimeSimpleResolve,
    },
    // canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaskCompletionTimeSimpleUpdateComponent,
    resolve: {
      taskCompletionTimeSimple: TaskCompletionTimeSimpleResolve,
    },
    // canActivate: [UserRouteAccessService],
  },
];

export default taskCompletionTimeSimpleRoute;
