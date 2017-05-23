import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Order, OrderFull, OrderActions, OrderSearch } from '../../tn-common/orders';
import { License } from '../../tn-common/licenses';
import { getAllOrders, getOrderSearchQuery, getAllLicenses } from '../store/reducers';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.scss']
})
export class AdminOrdersListComponent {
  /**
   *  Orders collection for combination.
   *
   * @type {Observable<Order[]>}
   * @memberof AdminOrdersListComponent
   */
  public orders$ = this.store.select(getAllOrders);

  /**
   *  Licenses collection for combination.
   *
   * @type {Observable<License[]>}
   * @memberof AdminOrdersListComponent
   */
  public licenses$ = this.store.select(getAllLicenses);

  /**
   * Order search query to filter orders against.
   *
   * @type {Observable<OrderSearch>}
   * @memberof AdminOrdersListComponent
   */
  public orderQuery$ = this.store.select(getOrderSearchQuery);

  /**
   *  Orders collections with populated license data.
   *
   * @type {Observable<OrderFull[]>}
   * @memberof AdminOrdersListComponent
   */
  public ordersLicenses$ = Observable.combineLatest(
    this.orders$,
    this.licenses$,
    (orders: Order[], licenses: License[]): OrderFull[] => orders.map((order) => ({
      ...order,
      licenses: licenses.filter((license) => license.order === order.id),
    })));

  /**
   *  Orders collection for display, filtered against search query.
   *
   * @type {Observable<OrderFull[]>}
   * @memberof AdminOrdersListComponent
   */
  public filteredOrdersLicenses$ = Observable.combineLatest(
    this.ordersLicenses$,
    this.orderQuery$,
    (orders: OrderFull[], orderQuery: OrderSearch): OrderFull[] => orders.filter((order) => {
      if (orderQuery.id && order.id !== +orderQuery.id) {
        return false;
      }
      if (orderQuery.status.length && orderQuery.status.indexOf(order.status) === -1) {
        return false;
      }
      if (orderQuery.from && new Date(order.created) < orderQuery.from) {
        return false;
      }
      if (orderQuery.to && new Date(order.created) > orderQuery.to) {
        return false;
      }
      return !orderQuery.licenses.length || orderQuery.licenses.some((licenseType) =>
        Object.entries(licenseType).every(([key, value]) =>
          order.licenses.some((license) => license[key] === value)));
    }));

  constructor(private store: Store<any>, private orderActions: OrderActions) {}

  /**
   * Fetch the server and get all the orders with the provided query
   *
   * @public
   * @type {OrderSearch} query
   * @memberof AdminOrdersListComponent
   */
  public searchOrders(query: OrderSearch) {
    this.store.dispatch(this.orderActions.searchQuery(query));
  }
}
