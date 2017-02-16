import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule,  ApplicationRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TnCommonModule } from '../tn-common';

import { TnAdminComponent } from './tn-admin.component';
import { AdminHomeComponent } from './home';
import { TnContentModule } from './tn-content/tn-content.module';
import { TnOrderModule } from './tn-order/tn-order.module';
import { TnProductModule } from './tn-product/tn-product.module';
import { TnFoundryModule } from './tn-foundry/tn-foundry.module';
import { TnReportModule } from './tn-report/tn-report.module';
import { TnUserModule } from './tn-user/tn-user.module';

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
    TnContentModule,
    TnFoundryModule,
    TnOrderModule,
    TnProductModule,
    TnReportModule,
    TnUserModule,
  ],
  providers: []
})
export class TnAdminModule {}
