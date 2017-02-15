import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './home';

// Import routes from submodules
import { tnAdminContentRoutes } from './tn-content/tn-content-routing.module';
import { tnAdminFoundryRoutes } from './tn-foundry/tn-foundry-routing.module';
import { tnAdminOrderRoutes } from './tn-order/tn-order-routing.module';
import { tnAdminProductRoutes } from './tn-product/tn-product-routing.module';
import { tnAdminReportRoutes } from './tn-report/tn-report-routing.module';
import { tnAdminUserRoutes } from './tn-user/tn-user-routing.module';

const routes: Routes = [
  { path: 'admin', component: AdminHomeComponent, children: [
    tnAdminContentRoutes,
    tnAdminFoundryRoutes,
    tnAdminOrderRoutes,
    tnAdminProductRoutes,
    tnAdminReportRoutes,
    tnAdminUserRoutes,
  ]}
];

export const TnAdminRoutingModule = RouterModule.forChild(routes);
