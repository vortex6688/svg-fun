import { Routes, RouterModule } from '@angular/router';
import { TnReportComponent } from './tn-report.component';

const routes: Routes = [
  { path: 'admin/reports', component: TnReportComponent },
];

export const TnReportRoutingModule = RouterModule.forChild(routes);
