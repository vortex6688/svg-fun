import { Routes, RouterModule } from '@angular/router';
import { TnAdminComponent } from './tn-admin.component';
import { AdminOrdersListComponent } from './admin-orders-list';

const routes: Routes = [
  { path: 'admin', component: TnAdminComponent, children: [
      { path: '', redirectTo: 'orders/list', pathMatch: 'full' },
      { path: 'orders', redirectTo: 'orders/list', pathMatch: 'full' },
      { path: 'orders/list', component: AdminOrdersListComponent}
    ]
  }
];

export const TnAdminRoutingModule = RouterModule.forChild(routes);
