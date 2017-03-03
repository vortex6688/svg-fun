import { Component } from '@angular/core';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.scss']
})
export class AdminOrdersListComponent {
  public searchOrderNumber: string = '';
  public searchDateStart: Date = null;
  public searchDateEnd: Date = null;
  public searchCustomer: string = '';
  public searchProject: string = '';
  public searchFont: string = '';
  public searchFoundry: string = '';

  public filterLicenseTypes: string[] = [];
  public filterStatuses: string[] = [];

  /**
   * clear search related component properties.
   */
  public clearSearch() {
    this.searchOrderNumber = '';
    this.searchDateStart = null;
    this.searchDateEnd = null;
    this.searchCustomer = '';
    this.searchProject = '';
    this.searchFont = '';
    this.searchFoundry = '';
  }

  /**
   * clear filter related component properties.
   */
  public clearFilters() {
    this.filterLicenseTypes = [];
    this.filterStatuses = [];
  }
}
