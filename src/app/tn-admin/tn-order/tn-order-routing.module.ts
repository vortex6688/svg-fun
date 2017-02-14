import { Routes, RouterModule } from '@angular/router';
import { TnOrderComponent } from './tn-order.component';

const routes: Routes = [
  { path: 'admin/orders', component: TnOrderComponent },
];

export const TnOrderRoutingModule = RouterModule.forRoot(routes);
