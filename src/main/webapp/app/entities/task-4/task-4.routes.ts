import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { Task4Component } from './list/task-4.component';
import { Task4DetailComponent } from './detail/task-4-detail.component';
import { Task4UpdateComponent } from './update/task-4-update.component';
import Task4Resolve from './route/task-4-routing-resolve.service';

const task4Route: Routes = [
  {
    path: '',
    component: Task4Component,
    data: {
      defaultSort: 'id,' + ASC,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Task4DetailComponent,
    resolve: {
      task4: Task4Resolve,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Task4UpdateComponent,
    resolve: {
      task4: Task4Resolve,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Task4UpdateComponent,
    resolve: {
      task4: Task4Resolve,
    },
    //canActivate: [UserRouteAccessService],
  },
];

export default task4Route;
