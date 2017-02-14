import { Routes, RouterModule } from '@angular/router';
import { TnContentComponent } from './tn-content.component';

const routes: Routes = [
  { path: 'admin/content', component: TnContentComponent },
];

export const TnContentRoutingModule = RouterModule.forChild(routes);
