import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './home';

// Import routes from submodules
import { adminUserRoutes } from './tn-user/tn-user-routing.module'

const routes: Routes = [
  { path: 'admin', component: AdminHomeComponent, children: [
    { path: 'reports', loadChildren: './tn-report/tn-report.module#TnReportModule' },
    { path: 'products', loadChildren: './tn-product/tn-product.module#TnProductModule' },
    { path: 'orders', loadChildren: './tn-order/tn-order.module#TnOrderModule' },
    { path: 'foundries', loadChildren: './tn-foundry/tn-foundry.module#TnFoundryModule' },
    { path: 'content', loadChildren: './tn-content/tn-content.module#TnContentModule' },
    adminUserRoutes
  ]}
];

export const TnAdminRoutingModule = RouterModule.forChild(routes);
