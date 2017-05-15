import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Title } from '@angular/platform-browser';
import { Order, OrderActions, OrderSearch } from '../../tn-common/orders';
import { getAllFoundOrders, getOrderSearchQuery } from '../store/reducers';

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

  constructor(private store: Store<any>, private orderActions: OrderActions) {}

  /**
   * Fetch the server and get all the orders with the provided query
   * @public
   * @type {OrderSearch} query
   * @memberOf AdminOrdersListComponent
   */
  public searchOrders(query: OrderSearch) {
    this.store.dispatch(this.orderActions.searchQuery(query));
  }
}
