import { Component } from '@angular/core';
import { Order } from '../../tn-common/orders/order.model';
import { OrderService } from '../../tn-common/orders/order.service';
import { AuthService } from '../../tn-common/auth/auth.service';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.scss']
})
export class AdminOrdersListComponent {

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

  /**
   * All the filtered orders
   *
   * @public
   * @type {Array}
   * @memberOf AdminOrdersListComponent
   */
  public filteredOrders: Order[] = [];

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.searchOrders();
  }

  /**
   * Fetch the server and get all the orders with the provided query
   */
  private searchOrders() {
    let query = {
      id: this.searchOrderNumber,
      from: this.searchDateStart,
      to: this.searchDateEnd,
      customer: this.searchCustomer,
      project: this.searchProject,
      font: this.searchFont,
      foundry: this.searchFoundry,
    };
    this.authService.login({username: 'martin.jfreytes@gmail.com', password: 'adminadmin'}).subscribe((response) => {
      this.orderService.find(query).subscribe((response) =>{
        this.filteredOrders = response;
      });
    });

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
}
