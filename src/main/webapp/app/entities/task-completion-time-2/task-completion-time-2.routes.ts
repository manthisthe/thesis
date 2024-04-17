import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TaskCompletionTime2Component } from './list/task-completion-time-2.component';
import { TaskCompletionTime2DetailComponent } from './detail/task-completion-time-2-detail.component';
import { TaskCompletionTime2UpdateComponent } from './update/task-completion-time-2-update.component';
import TaskCompletionTime2Resolve from './route/task-completion-time-2-routing-resolve.service';

const taskCompletionTime2Route: Routes = [
  {
    path: '',
    component: TaskCompletionTime2Component,
    data: {
      defaultSort: 'id,' + ASC,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaskCompletionTime2DetailComponent,
    resolve: {
      taskCompletionTime2: TaskCompletionTime2Resolve,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaskCompletionTime2UpdateComponent,
    resolve: {
      taskCompletionTime2: TaskCompletionTime2Resolve,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaskCompletionTime2UpdateComponent,
    resolve: {
      taskCompletionTime2: TaskCompletionTime2Resolve,
    },
    // canActivate: [UserRouteAccessService],
  },
];

export default taskCompletionTime2Route;
