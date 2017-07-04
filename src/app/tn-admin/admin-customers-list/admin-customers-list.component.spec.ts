/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';
import { productionReducer } from '../store';

import { AdminCustomersListComponent } from './admin-customers-list.component';
import { TnCommonModule } from '../../tn-common/';

import { Customer, CustomerActions, initialCustomerState } from '../../tn-common/customers';
import { Order, OrderActions } from '../../tn-common/orders';

describe('AdminCustomersListComponent', () => {
  let component: AdminCustomersListComponent;
  let fixture: ComponentFixture<AdminCustomersListComponent>;
  let customerActions: MockCustomerActions;
  let store: Store<any>;
  const mockCustomer: Customer = {
    id: 10,
    email: 'jane@doe.com',
    username: 'jane@doe.com',
    first_name: 'Jane',
    last_name: 'Doe',
    address1: 'Address1',
    address2: 'Address2',
    state: 'State',
    city: 'Towntate',
    zipcode: 'Zippity zoopity',
    country: 'World',
    company: 'True company',
    website: 'http://site.io',
    phone: '1234567',
    is_active: true,
    is_verified: true,
    is_superuser: false,
    is_staff: false,
    can_invoice: true,
    tax_exempt: true,
    created_at: Date.now(),
    updated_at: Date.now(),
  };
  const mockOrder: Order = {
    id: 1,
    user: 1,
    subtotal: '10',
    tax: '0.5',
    total: '10.5',
    status: 1,
    licensee: {
      first_name: 'John',
      last_name: 'Doe',
      company: 'John Doe INC',
      address1: '123 Unnamed Road',
      city: 'Wonderland',
      zipcode: '33333',
      country: 'United States',
      vat: 'SuperVAT',
    },
    created: '2028-06-08T18:16:50Z',
    payments: [
        {
            order: 128,
            amount: '34.60',
            provider: 0,
            status: 1,
            provider_data: '{ \"source\": {\"brand\": \"Visa\"} }',
            billing: {
              name: 'John Doe',
              address1: '1234 Hollywood',
              address2: '9876',
              state: 'Florida',
              city: 'Hollywood',
              zipcode: '11221',
              country: 'United States',
              company: 'John Doe INC',
            },
        }
    ],
    order_token: 'AnOrderToken',
    upgrade_price_adjustment: 0,
    coupon: null
  };
  const mockCustomerList: Customer[] = [{
    ...mockCustomer,
    id: 2,
    first_name: 'namer',
    last_name: 'nan',
    email: 'real@mail.com',
    city: 'town',
    country: 'aes',
  }, {
    ...mockCustomer,
    id: 3,
    first_name: 'babayetu',
    last_name: 'mobanga',
    email: 'notsoreal@mail.com',
    city: 'nan',
    country: 'us',
  }, {
    ...mockCustomer,
    id: 4,
    first_name: 'sid',
    last_name: 'vicious',
    email: 'fake@mail.com',
    city: 'realtown',
    country: 'usa',
  }];
  const mockOrderList = [
    { ...mockOrder, user: 2, id: 2, payments: [{ amount: '123', status: 1 }, { amount: '12.2', status: 0 }] },
    { ...mockOrder, user: 3, id: 3, payments: [{ amount: '12', status: 1 }, { amount: '1005.20', status: 1 }] },
    { ...mockOrder, user: 4, id: 4, payments: [{ amount: '123', status: 0 }, { amount: '12.2', status: 0 }] },
    { ...mockOrder, user: 2, id: 5, payments: [{ amount: '1.25', status: 1 }] },
  ];

  class MockCustomerActions {
    public searchQuery = jasmine.createSpy('searchQuery');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        StoreModule.provideStore(productionReducer),
      ],
      declarations: [
        AdminCustomersListComponent,
      ],
      providers: [
        { provide: CustomerActions, useClass: MockCustomerActions },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    customerActions = TestBed.get(CustomerActions);
    fixture = TestBed.createComponent(AdminCustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search action', () => {
    const query = {
      name: 'serie name',
      email: 'mail',
      city: 'town',
      country: 'world',
    };
    spyOn(store, 'dispatch');
    component.searchCustomers(query);
    expect(customerActions.searchQuery).toHaveBeenCalledWith(query);
  });

  describe('customer combining', () => {
    const customerOrders = mockCustomerList.map((customer) => {
      const orders = mockOrderList.filter((order) => order.user === customer.id);
      const totalSpent = orders.reduce((result, order) =>
        result + order.payments.reduce((total, { status, amount }) =>
          status === 1 ? total + parseFloat(amount) : total, 0), 0);

      return {
      ...customer,
      totalSpent,
      orders,
      };
    });

    beforeEach(() => {
      store.dispatch({ type: CustomerActions.LOAD_CUSTOMERS_SUCCESS, payload: mockCustomerList });
      store.dispatch({ type: OrderActions.LOAD_ORDERS_SUCCESS, payload: mockOrderList });
    });

    it('should assign matching orders to customers', () => {
      component.customerOrders$.subscribe((series) => {
        expect(series).toEqual(customerOrders);
      });
    });

    it('should filter customers by name', () => {
      const target = customerOrders[0];
      const searchQuery = {
        ...initialCustomerState.search,
        name: target.last_name,
      };
      store.dispatch({ type: CustomerActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredCustomers$.subscribe((customers) => {
        expect(customers).toEqual([target]);
      });
    });

    it('should filter customers by email', () => {
      const email = 'real@mail.com';
      const searchQuery = {
        ...initialCustomerState.search,
        email,
      };
      const expected = customerOrders.filter((customer) => customer.email.indexOf(email) !== -1);
      store.dispatch({ type: CustomerActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredCustomers$.subscribe((customers) => {
        expect(customers).toEqual(expected);
      });
    });

    it('should filter customers by city', () => {
      const city = 'town';
      const searchQuery = {
        ...initialCustomerState.search,
        city,
      };
      const expected = customerOrders.filter((customer) => customer.city.indexOf(city) !== -1);
      store.dispatch({ type: CustomerActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredCustomers$.subscribe((customers) => {
        expect(customers).toEqual(expected);
      });
    });

    it('should filter customers by country', () => {
      const country = 'us';
      const searchQuery = {
        ...initialCustomerState.search,
        country,
      };
      const expected = customerOrders.filter((customer) => customer.country.indexOf(country) !== -1);
      store.dispatch({ type: CustomerActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredCustomers$.subscribe((customers) => {
        expect(customers).toEqual(expected);
      });
    });
  });
});
