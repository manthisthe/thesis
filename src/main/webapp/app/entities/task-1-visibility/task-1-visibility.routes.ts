import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { Task1VisibilityComponent } from './list/task-1-visibility.component';
import { Task1VisibilityDetailComponent } from './detail/task-1-visibility-detail.component';
import { Task1VisibilityUpdateComponent } from './update/task-1-visibility-update.component';
import Task1VisibilityResolve from './route/task-1-visibility-routing-resolve.service';

const task1VisibilityRoute: Routes = [
  {
    path: '',
    component: Task1VisibilityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Task1VisibilityDetailComponent,
    resolve: {
      task1Visibility: Task1VisibilityResolve,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Task1VisibilityUpdateComponent,
    resolve: {
      task1Visibility: Task1VisibilityResolve,
    },
    //canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Task1VisibilityUpdateComponent,
    resolve: {
      task1Visibility: Task1VisibilityResolve,
    },
    //canActivate: [UserRouteAccessService],
  },
];

export default task1VisibilityRoute;
