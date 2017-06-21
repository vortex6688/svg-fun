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
import { FamiliesControlsComponent } from './admin-families-list/families-controls';
import { FamiliesTableComponent } from './admin-families-list/families-table';
import { DataGuard } from '../tn-common/data.guard';
import { FamilyStyleRowComponent } from './admin-family-single-edit/family-style-row/family-style-row.component';
import { AdminSeriesListComponent } from './admin-series-list';
import { SeriesTableComponent } from './admin-series-list/series-table';
import { SeriesControlsComponent } from './admin-series-list/series-controls';
import { SeriesRowComponent } from './admin-series-list/series-table/series-row';

import { AdminStylesListComponent } from './admin-styles-list';
import { StylesTableComponent } from './admin-styles-list/styles-table';
import { StylesControlsComponent } from './admin-styles-list/styles-controls';
import { StyleRowComponent } from './admin-styles-list/styles-table/style-row';

// Keep routes in module files to keep definitons in a single place.
export const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
      { path: '', component: PlaceholderComponent, data: { title: 'TN Admin | Login '} },
      { path: 'orders', redirectTo: 'orders/list', pathMatch: 'full' },
      {
        path: 'orders/list',
        component: AdminOrdersListComponent,
        data: { title: 'TN Admin | Orders List'},
        canActivate: [DataGuard],
      },
      { path: 'products', redirectTo: 'products/families', pathMatch: 'full' },
      {
        path: 'products/families',
        component: AdminFamiliesListComponent,
        data: { title: 'TN Admin | Families List'},
        canActivate: [DataGuard],
      }, {
        path: 'products/series',
        component: AdminSeriesListComponent,
        data: { title: 'TN Admin | Series List'},
        canActivate: [DataGuard],
      }, {
        path: 'products/styles',
        component: AdminStylesListComponent,
        data: { title: 'TN Admin | Styles List'},
        canActivate: [DataGuard],
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
    FamilyRowComponent,
    FamiliesControlsComponent,
    FamiliesTableComponent,
    FamilyStyleRowComponent,
    AdminSeriesListComponent,
    SeriesTableComponent,
    SeriesRowComponent,
    SeriesControlsComponent,
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
  entryComponents: [ LoginComponent, AdminOrderEditComponent, AdminFamilySingleEditComponent ],
  providers: []
})
export class TnAdminModule {}
