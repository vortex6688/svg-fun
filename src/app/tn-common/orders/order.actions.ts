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
  public static SEARCH_COMPLETE: string = '[Order] SEARCH_COMPLETE';

  public placeOrder = ActionCreatorFactory.create(OrderActions.PLACE_ORDER);
  public getOrders = ActionCreatorFactory.create(OrderActions.GET_ORDERS);
  public getOrder = ActionCreatorFactory.create(OrderActions.GET_ORDER);
  public searchQuery = ActionCreatorFactory.create(OrderActions.SEARCH_QUERY);
  public searchComplete = ActionCreatorFactory.create(OrderActions.SEARCH_COMPLETE);
}
