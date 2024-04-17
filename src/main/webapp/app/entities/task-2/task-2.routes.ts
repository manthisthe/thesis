import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { Task2Component } from './list/task-2.component';
import { Task2DetailComponent } from './detail/task-2-detail.component';
import { Task2UpdateComponent } from './update/task-2-update.component';
import Task2Resolve from './route/task-2-routing-resolve.service';

const task2Route: Routes = [
  {
    path: '',
    component: Task2Component,
    data: {
      defaultSort: 'id,' + ASC,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Task2DetailComponent,
    resolve: {
      task2: Task2Resolve,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Task2UpdateComponent,
    resolve: {
      task2: Task2Resolve,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Task2UpdateComponent,
    resolve: {
      task2: Task2Resolve,
    },
    //canActivate: [UserRouteAccessService],
  },
];

export default task2Route;
