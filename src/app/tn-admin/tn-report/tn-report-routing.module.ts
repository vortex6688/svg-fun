import { Route } from '@angular/router';
import { TnReportComponent } from './tn-report.component';

export const tnAdminReportRoutes: Route = {
  path: 'reports', component: TnReportComponent, children: []
};
