// Core NG Modules (First)
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

// Dependency Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TnCommonModule } from '../tn-common';

// Local Components & Services
import { AdminComponent } from './admin';
import { AdminNavbarComponent } from './admin-navbar';
import { AdminOrdersListComponent } from './admin-orders-list';
import { LoginComponent } from './login';
import { CollapseComponent } from './collapse';
import { OrdersCollapseComponent } from './admin-orders-list/orders-collapse';

// Keep routes in module files to keep definitons in a single place.
export const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'orders/list', pathMatch: 'full' },
      { path: 'orders', redirectTo: 'orders/list', pathMatch: 'full' },
      { path: 'orders/list', component: AdminOrdersListComponent}
    ]
  }
];

@NgModule({
  bootstrap: [ AdminComponent ],
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminOrdersListComponent,
    LoginComponent,
    CollapseComponent,
    OrdersCollapseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    TnCommonModule,
  ],
  entryComponents: [ LoginComponent ],
  providers: []
})
export class TnAdminModule {}
