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
import { OrderRowComponent } from './admin-orders-list/orders-table/order-row';
import { OrdersTableComponent } from './admin-orders-list/orders-table';
import { OrdersControlsComponent } from './admin-orders-list/orders-controls';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { AdminOrderEditComponent } from './admin-order-edit';
import { FamilyRowComponent } from './admin-families-list/families-table/family-row';
import { AdminFamilySingleEditComponent } from './admin-family-single-edit';
import { AdminFamilyBatchEditComponent } from './admin-family-batch-edit';
import { FamiliesControlsComponent } from './admin-families-list/families-controls';
import { FamiliesTableComponent } from './admin-families-list/families-table';
import { DataGuard } from '../tn-common/data.guard';
import { AuthGuard } from './auth.guard';
import { FamilyStyleRowComponent } from './admin-family-single-edit/family-style-row/family-style-row.component';
import { AdminSeriesListComponent } from './admin-series-list';
import { SeriesTableComponent } from './admin-series-list/series-table';
import { SeriesControlsComponent } from './admin-series-list/series-controls';
import { SeriesRowComponent } from './admin-series-list/series-table/series-row';
import { AdminCustomersListComponent } from './admin-customers-list';
import { CustomersTableComponent } from './admin-customers-list/customers-table';
import { CustomersControlsComponent } from './admin-customers-list/customers-controls';
import { CustomersRowComponent } from './admin-customers-list/customers-table/customers-row';
import { AdminStylesListComponent } from './admin-styles-list';
import { AdminStyleSingleEditComponent } from './admin-style-single-edit';
import { StylesTableComponent } from './admin-styles-list/styles-table';
import { StylesControlsComponent } from './admin-styles-list/styles-controls';
import { StyleRowComponent } from './admin-styles-list/styles-table/style-row';

// Keep routes in module files to keep definitons in a single place.
export const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
      { path: '', component: PlaceholderComponent, data: { title: 'TN Admin | Login '} },
      { path: 'orders', redirectTo: 'orders/orders', pathMatch: 'full' },
      {
        path: 'orders/orders',
        component: AdminOrdersListComponent,
        data: { title: 'TN Admin | Orders List'},
        canActivate: [AuthGuard, DataGuard],
      },
      {
        path: 'orders/customers',
        component: AdminCustomersListComponent,
        data: { title: 'TN Admin | Customers List'},
        canActivate: [AuthGuard],
      },
      { path: 'products', redirectTo: 'products/families', pathMatch: 'full' },
      {
        path: 'products/families',
        component: AdminFamiliesListComponent,
        data: { title: 'TN Admin | Families List'},
        canActivate: [AuthGuard, DataGuard],
      }, {
        path: 'products/series',
        component: AdminSeriesListComponent,
        data: { title: 'TN Admin | Series List'},
        canActivate: [AuthGuard, DataGuard],
      }, {
        path: 'products/styles',
        component: AdminStylesListComponent,
        data: { title: 'TN Admin | Styles List'},
        canActivate: [AuthGuard, DataGuard],
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
    AdminOrderEditComponent,
    AdminFamiliesListComponent,
    LoginComponent,
    OrderRowComponent,
    OrdersTableComponent,
    OrdersControlsComponent,
    PlaceholderComponent,
    AdminFamilySingleEditComponent,
    AdminFamilyBatchEditComponent,
    AdminStyleSingleEditComponent,
    FamilyRowComponent,
    FamiliesControlsComponent,
    FamiliesTableComponent,
    FamilyStyleRowComponent,
    AdminSeriesListComponent,
    SeriesTableComponent,
    SeriesRowComponent,
    SeriesControlsComponent,
    AdminCustomersListComponent,
    CustomersTableComponent,
    CustomersRowComponent,
    CustomersControlsComponent,
    AdminStylesListComponent,
    StylesTableComponent,
    StylesControlsComponent,
    StyleRowComponent,
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
  entryComponents: [ LoginComponent, AdminOrderEditComponent,
  AdminFamilySingleEditComponent, AdminFamilyBatchEditComponent ],
  providers: [AuthGuard]
})
export class TnAdminModule {}
