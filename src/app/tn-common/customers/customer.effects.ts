import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CustomerService } from './customer.service';
import { CustomerActions } from './customer.actions';
import { Customer } from './customer.model';

@Injectable()
export class CustomerEffects {
  @Effect()
  public loadCustomers$: Observable<Action> = this.actions$
    .ofType(CustomerActions.LOAD_CUSTOMERS)
    .switchMap(() => this.customerService.getAllPages())
      .map((customers) => this.customerActions.loadCustomersSuccess(customers))
      .catch((error) => of(this.customerActions.loadCustomersFail(error))
  );

  @Effect()
  public createCustomer$: Observable<Action> = this.actions$
    .ofType(CustomerActions.CREATE_CUSTOMER)
    .map(toPayload)
    .switchMap((customer) =>
      this.customerService.save(customer)
        .map((addedCustomer) => this.customerActions.createCustomerSuccess(addedCustomer))
        .catch(() => of(this.customerActions.createCustomerFail(customer)))
    );

  @Effect()
  public updateCustomer$: Observable<Action> = this.actions$
    .ofType(CustomerActions.UPDATE_CUSTOMER)
    .map(toPayload)
    .switchMap((customer) =>
      this.customerService.save(customer)
        .map((updatedCustomer) => this.customerActions.updateCustomerSuccess(updatedCustomer))
        .catch(() => of(this.customerActions.updateCustomerFail(customer)))
    );

  @Effect()
  public removeCustomer$: Observable<Action> = this.actions$
    .ofType(CustomerActions.REMOVE_CUSTOMER)
    .map(toPayload)
    .switchMap((customer) =>
      this.customerService.delete(customer)
        .map(() => this.customerActions.removeCustomerSuccess(customer))
        .catch(() => of(this.customerActions.removeCustomerFail(customer)))
    );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private customerActions: CustomerActions,
  ) {}
}
