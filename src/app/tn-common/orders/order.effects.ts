import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { OrderService } from './order.service';
import { OrderActions } from './order.actions';
import { defer } from 'rxjs/observable/defer';

@Injectable()
export class OrderEffects {

  @Effect()
  public loadOrders$: Observable<Action> = this.actions$
    .ofType(OrderActions.LOAD_ORDERS)
    .switchMap(() => this.orderService.getAllPages())
      .map((orders) => this.orderActions.loadOrdersSuccess(orders))
      .catch((error) => of(this.orderActions.loadOrdersFail(error))
  );

  constructor(private actions$: Actions, private orderService: OrderService, private orderActions: OrderActions) {}
}
