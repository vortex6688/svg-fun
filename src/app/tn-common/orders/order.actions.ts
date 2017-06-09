import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class OrderActions {
  // Update
  public static PLACE_ORDER: string = '[Order] PLACE_ORDER';

  // Results
  public static GET_ORDERS: string = '[Order] GET_ORDERS';
  public static GET_ORDER: string = '[Order] GET_ORDER';
  public static SEARCH_QUERY: string = '[Order] SEARCH_QUERY';
  public static LOAD_ORDERS: string = '[Order] LOAD_ORDERS';
  public static LOAD_ORDERS_SUCCESS: string = '[Order] LOAD_ORDERS_SUCCESS';
  public static LOAD_ORDERS_FAIL: string = '[Order] LOAD_ORDERS_FAIL';

  public placeOrder = ActionCreatorFactory.create(OrderActions.PLACE_ORDER);
  public getOrders = ActionCreatorFactory.create(OrderActions.GET_ORDERS);
  public getOrder = ActionCreatorFactory.create(OrderActions.GET_ORDER);
  public searchQuery = ActionCreatorFactory.create(OrderActions.SEARCH_QUERY);
  public loadOrders = ActionCreatorFactory.create(OrderActions.LOAD_ORDERS);
  public loadOrdersSuccess = ActionCreatorFactory.create(OrderActions.LOAD_ORDERS_SUCCESS);
  public loadOrdersFail = ActionCreatorFactory.create(OrderActions.LOAD_ORDERS_FAIL);
}
