import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { Task3Component } from './list/task-3.component';
import { Task3DetailComponent } from './detail/task-3-detail.component';
import { Task3UpdateComponent } from './update/task-3-update.component';
import Task3Resolve from './route/task-3-routing-resolve.service';

const task3Route: Routes = [
  {
    path: '',
    component: Task3Component,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Task3DetailComponent,
    resolve: {
      task3: Task3Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Task3UpdateComponent,
    resolve: {
      task3: Task3Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Task3UpdateComponent,
    resolve: {
      task3: Task3Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default task3Route;
