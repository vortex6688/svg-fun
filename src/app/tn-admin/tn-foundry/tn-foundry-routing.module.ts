import { Routes, RouterModule } from '@angular/router';
import { TnFoundryComponent } from './tn-foundry.component';

const routes: Routes = [
  { path: 'admin/foundries', component: TnFoundryComponent },
];

export const TnFoundryRoutingModule = RouterModule.forChild(routes);
