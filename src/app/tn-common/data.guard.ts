import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { ActionCreator } from 'ngrx-action-creator-factory';
import { OrderActions } from './orders';
import { LicenseActions } from './licenses';
import { FamilyActions } from './families';
import { StyleActions } from './styles';
import { SeriesActions } from './series';

/**
 * DataGuard checks targetPaths for current path and performs
 * the specified action, waits for either success or fail response,
 * then returns accordingly and performs specified subActions
 *
 * @export
 * @class DataGuard
 * @implements {CanActivate}
 */
@Injectable()
export class DataGuard implements CanActivate {
  /**
   * Object containing paths as keys. Performs an action and
   * the specified subActions after response
   *
   * @type {ResolveTargets}
   * @memberof DataGuard
   */
  public targetPaths: {
    [key: string]: {
      state: string;
      action: (payload?: any) => ActionCreator<any>;
      success: string;
      fail: string;
      subActions: Array<(payload?: any) => ActionCreator<any>>;
    };
  } = {
    '/admin/orders/list': {
      state: 'order',
      action: this.orderActions.loadOrders,
      success: OrderActions.LOAD_ORDERS_SUCCESS,
      fail: OrderActions.LOAD_ORDERS_FAIL,
      subActions: [
        this.familyActions.loadFamilies,
        this.styleActions.loadStyles,
        this.licenseActions.loadLicenses,
        this.seriesActions.loadSeries,
      ],
    },
  };

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private orderActions: OrderActions,
    private licenseActions: LicenseActions,
    private styleActions: StyleActions,
    private familyActions: FamilyActions,
    private seriesActions: SeriesActions,
  ) {}

  /**
   * Get target, perform action and return either true or false.
   * If success perform further actions
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {(Observable<boolean> | boolean)}
   *
   * @memberof DataGuard
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | any {
    const target = this.targetPaths[state.url];

    if (!target) { return false; }

    this.store.dispatch(target.action());
    return this.actions$.ofType(target.success, target.fail).take(1)
      .map(({type}) => {
        if (type === target.fail) {
          return false;
        }
        target.subActions.forEach((action) => this.store.dispatch(action()));
        return true;
      });
  }
}
