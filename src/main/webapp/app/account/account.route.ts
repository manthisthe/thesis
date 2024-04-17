import { Routes } from '@angular/router';

import activateRoute from './activate/activate.route';
import passwordRoute from './password/password.route';
import passwordResetFinishRoute from './password-reset/finish/password-reset-finish.route';
import passwordResetInitRoute from './password-reset/init/password-reset-init.route';
import registerRoute from './register/register.route';
import registerSimpleRoute from './register-simple/register.route';
import settingsRoute from './settings/settings.route';
import passwordSimpleRoute from './password-simple/password.route';

const accountRoutes: Routes = [
  activateRoute,
  passwordRoute,
  passwordSimpleRoute,
  passwordResetFinishRoute,
  passwordResetInitRoute,
  registerRoute,
  registerSimpleRoute,
  settingsRoute,
];

export default accountRoutes;
