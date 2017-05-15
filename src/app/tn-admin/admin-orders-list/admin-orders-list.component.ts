import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Title } from '@angular/platform-browser';
import { Order, OrderService, OrderActions, OrderSearch } from '../../tn-common/orders';
import { LicenseActions, LicenseSearch } from '../../tn-common/licenses';
import { getAllFoundOrders, getOrderSearchQuery, getAllFoundLicenses, getLicenseSearchQuery } from '../store/reducers';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.scss']
})
export class AdminOrdersListComponent {
  /**
   *  Orders collection to display for list.
   *
   * @memberOf AdminOrdersListComponent
   */
  public orders$ = this.store.select(getAllFoundOrders);
  public orderQuery$ = this.store.select(getOrderSearchQuery).first();
  public licenseQuery$ = this.store.select(getLicenseSearchQuery).first();

  /**
   *  Licenses collection to display for list.
   *
   * @memberOf AdminOrdersListComponent
   */
  public licenses$ = this.store.select(getAllFoundLicenses);

  public orderslicenses$ = Observable.combineLatest(this.orders$, this.licenses$, (orders, licenses) => {
    return orders.map((order) => Object.assign({}, order, {
      licenses: licenses.filter((license) => license.order === order.id)
    }));
  });
  constructor(private store: Store<any>, private orderActions: OrderActions, private licenseActions: LicenseActions) {}

  /**
   * Fetch the server and get all the orders with the provided query
   * @public
   * @type {OrderSearch} query
   * @memberOf AdminOrdersListComponent
   */
  public searchOrders(query: OrderSearch) {
    const myQuery: LicenseSearch = {
      id: '',
      order: 0,
      price: '',
      price_paid: '',
      qty: 0,
      style: 0,
      active: false,
      license_type: [],
      years: 0,
      start: null,
      end: null,
    };
    this.store.dispatch(this.orderActions.searchQuery(query));
    this.store.dispatch(this.licenseActions.searchQuery(myQuery));
  }
}
