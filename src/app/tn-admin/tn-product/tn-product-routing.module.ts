import { Routes, RouterModule } from '@angular/router';
import { TnProductComponent } from './tn-product.component';

const routes: Routes = [
  { path: 'admin/products', component: TnProductComponent },
];

export const TnProductRoutingModule = RouterModule.forChild(routes);
