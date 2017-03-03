import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TnCommonModule } from '../tn-common';

import { TnAdminComponent } from './tn-admin.component';
import { TnAdminRoutingModule } from './tn-admin-routing.module';
import { AdminNavbarComponent } from './admin-navbar';
import { AdminOrdersListComponent } from './admin-orders-list';

/**
 * TN Module that will contain all submodules related
 * to Admin application
 */
@NgModule({
  bootstrap: [ TnAdminComponent ],
  declarations: [
    TnAdminComponent,
    AdminNavbarComponent,
    AdminOrdersListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TnAdminRoutingModule,
    NgbModule.forRoot(),
    TnCommonModule,
  ],
  providers: []
})
export class TnAdminModule {}
