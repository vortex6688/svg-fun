import { Route } from '@angular/router';
import { TnFoundryComponent } from './tn-foundry.component';

export const tnAdminFoundryRoutes: Route = {
  path: 'foundries', component: TnFoundryComponent, children: []
};
