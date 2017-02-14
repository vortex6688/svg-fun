import { Routes, RouterModule } from '@angular/router';
import { TnUserComponent } from './tn-user.component';

const routes: Routes = [
  { path: 'admin/users', component: TnUserComponent },
];

export const TnUserRoutingModule = RouterModule.forChild(routes);
