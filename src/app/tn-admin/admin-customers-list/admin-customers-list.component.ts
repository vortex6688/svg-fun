import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Customer, CustomerActions, CustomerSearch } from '../../tn-common/customers';
import {
  getAllCustomers,
  getAllOrders,
  getCustomerSearchQuery,
} from '../store/reducers';

@Component({
  selector: 'admin-customers-list',
  templateUrl: './admin-customers-list.component.html',
  styleUrls: ['./admin-customers-list.component.scss']
})
export class AdminCustomersListComponent {
  /**
   *  Customers collection for combination.
   *
   * @type {Observable<Customers[]>}
   * @memberof AdminCustomersListComponent
   */
  public customers$ = this.store.select(getAllCustomers);

  public locations$ = this.customers$.map((customers) => customers.reduce((locations, { city, country }) => {
    if (city && locations.city.indexOf(city) === -1) { locations.city.push(city); }
    if (country && locations.country.indexOf(country) === -1) { locations.country.push(country); }
    return locations;
  }, { city: [], country: [] }));
  /**
   * Customers search query to filter customers against.
   *
   * @type {Observable<CustomersSearch>}
   * @memberof AdminCustomersListComponent
   */
  public customerQuery$ = this.store.select(getCustomerSearchQuery);

  /**
   *  Orders collection for combination.
   *
   * @type {Observable<Customers[]>}
   * @memberof AdminCustomersListComponent
   */
  public orders$ = this.store.select(getAllOrders);

  public customerOrders$ = Observable.combineLatest(
    this.customers$,
    this.orders$,
    (customers, orders) => customers.map((customer) => {
      const { customerOrders, totalSpent } = orders.reduce((result, order) => {
        if (order.user === customer.id) {
          result.customerOrders.push(order);
          result.totalSpent += order.payments.reduce((total, { status, amount }) =>
            status === 1 ? total + parseFloat(amount) : total, 0);
        }
        return result;
      }, {
        customerOrders: [],
        totalSpent: 0,
      });
      return {
        ...customer,
        totalSpent,
        orders: customerOrders,
      };
    })
  );

  public filteredCustomers$ = Observable.combineLatest(
    this.customerOrders$,
    this.customerQuery$,
    (customers, customerQuery) => customers.filter((customer) => {
      if (customerQuery.name) {
        const testString = new RegExp(customerQuery.name, 'i');
        const name = `${customer.first_name} ${customer.last_name}`;
        if (!testString.test(name)) {
          return false;
        }
      }
      if (customerQuery.email) {
        const testString = new RegExp(customerQuery.email, 'i');
        if (!testString.test(customer.email)) {
          return false;
        }
      }
      if (customerQuery.city.length && customerQuery.city.indexOf(customer.city) === -1) {
        return false;
      }
      if (customerQuery.country.length && customerQuery.country.indexOf(customer.country) === -1) {
        return false;
      }
      return true;
    })
  );

  constructor(private store: Store<any>, private customerActions: CustomerActions) {}

  /**
   * Get all the customers with the provided query
   *
   * @public
   * @type {CustomerSearch} query
   * @memberof AdminCustomerListComponent
   */
  public searchCustomers(query: CustomerSearch) {
    this.store.dispatch(this.customerActions.searchQuery(query));
  }
}
