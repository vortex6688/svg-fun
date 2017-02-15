import { Route } from '@angular/router';
import { TnContentComponent } from './tn-content.component';

export const tnAdminContentRoutes: Route = {
  path: 'content', component: TnContentComponent, children: []
};
