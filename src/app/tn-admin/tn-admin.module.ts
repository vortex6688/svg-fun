import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule,  ApplicationRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TnCommonModule } from '../tn-common';

import { TnAdminComponent } from './tn-admin.component';
import { AdminHomeComponent } from './home';

export const ROUTES: Routes = [
  { path: 'admin',      component: AdminHomeComponent },
  { path: 'admin/home',  component: AdminHomeComponent },
];

@NgModule({
  bootstrap: [ TnAdminComponent ],
  declarations: [
    TnAdminComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(ROUTES),
    NgbModule.forRoot(),
    TnCommonModule,
  ],
  providers: []
})
export class TnAdminModule {}
