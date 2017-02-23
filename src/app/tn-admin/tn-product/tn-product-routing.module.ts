import { Route } from '@angular/router';
import { TnProductComponent } from './tn-product.component';

export const tnAdminProductRoutes: Route = {
  path: 'products', component: TnProductComponent, children: []
};
