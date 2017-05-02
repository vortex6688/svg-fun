import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
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
  public loadData$: Observable<any> = this.orderService.find({})
    .map((orders) => this.orderActions.addOrders(orders));

  constructor(private actions$: Actions, private orderService: OrderService, private orderActions: OrderActions) {}
}
