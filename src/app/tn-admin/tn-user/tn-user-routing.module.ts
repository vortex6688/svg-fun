import { Route } from '@angular/router';
import { TnUserComponent } from './tn-user.component';

export const tnAdminUserRoutes: Route = {
  path: 'users', component: TnUserComponent, children: []
};
