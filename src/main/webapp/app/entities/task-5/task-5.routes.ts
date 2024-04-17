import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { Task5Component } from './list/task-5.component';
import { Task5DetailComponent } from './detail/task-5-detail.component';
import { Task5UpdateComponent } from './update/task-5-update.component';
import Task5Resolve from './route/task-5-routing-resolve.service';

const task5Route: Routes = [
  {
    path: '',
    component: Task5Component,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Task5DetailComponent,
    resolve: {
      task5: Task5Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Task5UpdateComponent,
    resolve: {
      task5: Task5Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Task5UpdateComponent,
    resolve: {
      task5: Task5Resolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default task5Route;
