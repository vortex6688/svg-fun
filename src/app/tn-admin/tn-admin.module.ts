// Core NG Modules (First)
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

// Dependency Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TnCommonModule } from '../tn-common';

// Local Components & Services
import { TnAdminStoreModule } from './store';
import { AdminComponent } from './admin';
import { AdminNavbarComponent } from './admin-navbar';
import { AdminOrdersListComponent } from './admin-orders-list';
import { AdminFamiliesListComponent } from './admin-families-list';
import { LoginComponent } from './login';
import { OrderRowComponent, OrderStatusPipe, LicenseTypePipe } from './admin-orders-list/orders-table/order-row';
import { OrdersTableComponent } from './admin-orders-list/orders-table';
import { OrdersControlsComponent } from './admin-orders-list/orders-controls';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { AdminOrderDetailsComponent } from './admin-order-details';
import { FamilyRowComponent, FamilySizePipe } from './admin-families-list/families-table/family-row';
import { FamiliesControlsComponent } from './admin-families-list/families-controls';
import { FamiliesTableComponent } from './admin-families-list/families-table';

// Keep routes in module files to keep definitons in a single place.
export const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
      { path: '', component: PlaceholderComponent, data: { title: 'TN Admin | Login '} },
      { path: 'orders', redirectTo: 'orders/list', pathMatch: 'full' },
      { path: 'orders/list', component: AdminOrdersListComponent,
        data: { title: 'TN Admin | Orders List'}
      },
      { path: 'families', redirectTo: 'families/list', pathMatch: 'full' },
      { path: 'families/list', component: AdminFamiliesListComponent,
        data: { title: 'TN Admin | Families List'}
      }
    ]
  }
];

@NgModule({
  bootstrap: [ AdminComponent ],
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminOrdersListComponent,
    AdminOrderDetailsComponent,
    AdminFamiliesListComponent,
    LoginComponent,
    OrderRowComponent,
    OrdersTableComponent,
    OrderStatusPipe,
    LicenseTypePipe,
    OrdersControlsComponent,
    PlaceholderComponent,
    FamilyRowComponent,
    FamiliesControlsComponent,
    FamiliesTableComponent,
    FamilySizePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    TnCommonModule,
    TnAdminStoreModule,
  ],
  entryComponents: [ LoginComponent, AdminOrderDetailsComponent ],
  providers: []
})
export class TnAdminModule {}
