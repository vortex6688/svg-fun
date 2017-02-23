import { Route } from '@angular/router';
import { TnOrderComponent } from './tn-order.component';

export const tnAdminOrderRoutes: Route = {
  path: 'orders', component: TnOrderComponent, children: []
};
