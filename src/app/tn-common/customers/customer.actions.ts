import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class CustomerActions {
  public static CREATE_CUSTOMER: string = '[Customer] CREATE_CUSTOMER';
  public static CREATE_CUSTOMER_SUCCESS: string = '[Customer] CREATE_CUSTOMER_SUCCESS';
  public static CREATE_CUSTOMER_FAIL: string = '[Customer] CREATE_CUSTOMER_FAIL';
  public static UPDATE_CUSTOMER: string = '[Customer] UPDATE_CUSTOMER';
  public static UPDATE_CUSTOMER_SUCCESS: string = '[Customer] UPDATE_CUSTOMER_SUCCESS';
  public static UPDATE_CUSTOMER_FAIL: string = '[Customer] UPDATE_CUSTOMER_FAIL';
  public static REMOVE_CUSTOMER: string = '[Customer] REMOVE_CUSTOMER';
  public static REMOVE_CUSTOMER_SUCCESS: string = '[Customer] REMOVE_CUSTOMER_SUCCESS';
  public static REMOVE_CUSTOMER_FAIL: string = '[Customer] REMOVE_CUSTOMER_FAIL';

  // Results
  public static GET_CUSTOMERS: string = '[Customer] GET_CUSTOMERS';
  public static GET_CUSTOMER: string = '[Customer] GET_CUSTOMER';
  public static SEARCH_QUERY: string = '[Customer] SEARCH_QUERY';
  public static LOAD_CUSTOMERS: string = '[Customer] LOAD_CUSTOMERS';
  public static LOAD_CUSTOMERS_SUCCESS: string = '[Customer] LOAD_CUSTOMERS_SUCCESS';
  public static LOAD_CUSTOMERS_FAIL: string = '[Customer] LOAD_CUSTOMERS_FAIL';

  public createCustomer = ActionCreatorFactory.create(CustomerActions.CREATE_CUSTOMER);
  public createCustomerSuccess = ActionCreatorFactory.create(CustomerActions.CREATE_CUSTOMER_SUCCESS);
  public createCustomerFail = ActionCreatorFactory.create(CustomerActions.CREATE_CUSTOMER_FAIL);
  public updateCustomer = ActionCreatorFactory.create(CustomerActions.UPDATE_CUSTOMER);
  public updateCustomerSuccess = ActionCreatorFactory.create(CustomerActions.UPDATE_CUSTOMER_SUCCESS);
  public updateCustomerFail = ActionCreatorFactory.create(CustomerActions.UPDATE_CUSTOMER_FAIL);
  public removeCustomer = ActionCreatorFactory.create(CustomerActions.REMOVE_CUSTOMER);
  public removeCustomerSuccess = ActionCreatorFactory.create(CustomerActions.REMOVE_CUSTOMER_SUCCESS);
  public removeCustomerFail = ActionCreatorFactory.create(CustomerActions.REMOVE_CUSTOMER_FAIL);

  public getCustomers = ActionCreatorFactory.create(CustomerActions.GET_CUSTOMERS);
  public getCustomer = ActionCreatorFactory.create(CustomerActions.GET_CUSTOMER);
  public searchQuery = ActionCreatorFactory.create(CustomerActions.SEARCH_QUERY);
  public loadCustomers = ActionCreatorFactory.create(CustomerActions.LOAD_CUSTOMERS);
  public loadCustomersSuccess = ActionCreatorFactory.create(CustomerActions.LOAD_CUSTOMERS_SUCCESS);
  public loadCustomersFail = ActionCreatorFactory.create(CustomerActions.LOAD_CUSTOMERS_FAIL);
}
