import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TnCommonModule } from '../tn-common';

import { TnAdminComponent } from './tn-admin.component';
import { TnAdminRoutingModule } from './tn-admin-routing.module';
import { TnContentModule } from './tn-content/tn-content.module';
import { TnOrderModule } from './tn-order/tn-order.module';
import { TnProductModule } from './tn-product/tn-product.module';
import { TnFoundryModule } from './tn-foundry/tn-foundry.module';
import { TnReportModule } from './tn-report/tn-report.module';
import { TnUserModule } from './tn-user/tn-user.module';

/**
 * TN Module that will contain all submodules related
 * to Admin application
 */
@NgModule({
  bootstrap: [ TnAdminComponent ],
  declarations: [
    TnAdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TnAdminRoutingModule,
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
