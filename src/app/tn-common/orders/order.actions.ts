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
  public static ADD_ORDERS: string = '[Order] ADD_ORDERS';

  public placeOrder = ActionCreatorFactory.create(OrderActions.PLACE_ORDER);
  public getOrders = ActionCreatorFactory.create(OrderActions.GET_ORDERS);
  public getOrder = ActionCreatorFactory.create(OrderActions.GET_ORDER);
  public searchQuery = ActionCreatorFactory.create(OrderActions.SEARCH_QUERY);
  public addOrders = ActionCreatorFactory.create(OrderActions.ADD_ORDERS);
}
