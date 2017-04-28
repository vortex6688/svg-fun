import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { OrderService } from './order.service';
import { OrderActions } from './order.actions';

@Injectable()
export class OrderEffects {
  @Effect()
  public search$: Observable<Action> = this.actions$
    .ofType(OrderActions.SEARCH_QUERY)
    .map(toPayload)
    .switchMap((query) =>
      this.orderService.find(query)
        .map((orders) => this.orderActions.searchComplete(orders))
    );

  constructor(private actions$: Actions, private orderService: OrderService, private orderActions: OrderActions) {}
}
