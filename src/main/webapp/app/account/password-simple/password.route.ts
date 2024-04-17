import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import PasswordComponent from './password.component';

const passwordSimpleRoute: Route = {
  path: 'password-simple',
  component: PasswordComponent,
  title: 'Password-simple',
  canActivate: [UserRouteAccessService],
};

export default passwordSimpleRoute;
