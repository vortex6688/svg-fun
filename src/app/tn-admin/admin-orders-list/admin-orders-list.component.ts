import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Title } from '@angular/platform-browser';
import { Order, OrderService, OrderActions } from '../../tn-common/orders';
import { getAllFoundOrders } from '../store/reducers';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.scss']
})
export class AdminOrdersListComponent {
  public page: number;
  /**
   *  Orders collection to display for list.
   *
   * @memberOf AdminOrdersListComponent
   */
  public orders$ = this.store.select(getAllFoundOrders);

  /**
   * Specific number of the order to search.
   *
   * @public
   * @type {string}
   * @memberOf AdminOrdersListComponent
   */
  public searchOrderNumber: string = '';

  /**
   * Search all the orders from a specific date.
   *
   * @public
   * @type {Date}
   * @memberOf AdminOrdersListComponent
   */
  public searchDateStart: Date = null;

  /**
   * Search all the orders to a specific date.
   *
   * @public
   * @type {Date}
   * @memberOf AdminOrdersListComponent
   */
  public searchDateEnd: Date = null;

  /**
   * Search all the orders related to an specific customer
   *
   * @public
   * @type {string}
   * @memberOf AdminOrdersListComponent
   */
  public searchCustomer: string = '';

  /**
   * Search all the orders related to an specific project name
   *
   * @public
   * @type {string}
   * @memberOf AdminOrdersListComponent
   */
  public searchProject: string = '';

  /**
   * Search all the orders related to an specific font name
   *
   * @public
   * @type {string}
   * @memberOf AdminOrdersListComponent
   */
  public searchFont: string = '';

  /**
   * Search all the orders related to an specific foundry name
   *
   * @public
   * @type {string}
   * @memberOf AdminOrdersListComponent
   */
  public searchFoundry: string = '';

  /**
   * Filter the orders according these licenses
   *
   * @public
   * @type {Array}
   * @memberOf AdminOrdersListComponent
   */
  public filterLicenseTypes: string[] = [];

  /**
   * Filter the orders according these statuses
   *
   * @public
   * @type {Array}
   * @memberOf AdminOrdersListComponent
   */
  public filterStatuses: string[] = [];

  constructor(private store: Store<any>, private orderActions: OrderActions) {
    this.searchOrders();
  }

  /**
   * Clear search related component properties.
   *
   * @public
   * @memberOf AdminOrdersListComponent
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
   * Clear filter related component properties.
   *
   * @public
   * @memberOf AdminOrdersListComponent
   */
  public clearFilters() {
    this.filterLicenseTypes = [];
    this.filterStatuses = [];
  }

  /**
   * Fetch the server and get all the orders with the provided query
   */
  private searchOrders() {
    const query = {
      id: this.searchOrderNumber,
      from: this.searchDateStart,
      to: this.searchDateEnd,
      customer: this.searchCustomer,
      project: this.searchProject,
      font: this.searchFont,
      foundry: this.searchFoundry,
    };

    this.store.dispatch(this.orderActions.searchQuery(query));
  }
}
