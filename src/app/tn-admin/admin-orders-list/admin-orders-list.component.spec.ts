/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';

import { Order, OrderActions, OrderSearch, initialOrderState } from '../../tn-common/orders';
import { License, LicenseActions } from '../../tn-common/licenses';
import { AdminOrdersListComponent } from './admin-orders-list.component';
import { TnAdminStoreModule, storeAssets, productionReducer } from '../store';
import { TnCommonModule } from '../../tn-common/';

describe('AdminOrdersListComponent', () => {
  let component: AdminOrdersListComponent;
  let fixture: ComponentFixture<AdminOrdersListComponent>;
  let store: Store<any>;
  const orderDate = Date.now();
  const mockOrder: Order = {
    id: 1,
    user: 1,
    subtotal: 10,
    tax: 0.5,
    total: 10.5,
    status: 1,
    licensee_first_name: 'John',
    licensee_last_name: 'Doe',
    licensee_company: 'John Doe INC',
    licensee_street1: '123 Unnamed Road',
    created: '2028-06-08T18:16:50Z',
    licensee_city: 'Wonderland',
    licensee_zipcode: '33333',
    licensee_country: 'United States',
    licensee_vat: 'SuperVAT',
    payments: [
        {
            order: 128,
            amount: 34.60,
            provider: 0,
            status: 1,
            provider_data: '{ \"source\": {\"brand\": \"Visa\"} }',
            name: 'John Doe',
            street1: '1234 Hollywood',
            street2: '9876',
            state: 'Florida',
            city: 'Hollywood',
            zipcode: '11221',
            country: 'United States',
            company: 'John Doe INC',
            created: '2016-05-25T21:14:40.609000Z'
        }
    ],
    order_token: 'AnOrderToken',
    upgrade_price_adjustment: 0,
    coupon: null
  };
  const mockLicense: License = {
    id: 123,
    order: 1,
    price: '22.0000',
    price_paid: '22.0000',
    qty: 2,
    start: null,
    end: null,
    style: 286,
    years: 1,
    active: true,
    license_type: 'app',
    self_hosted: false
  };
  const mockOrderList: Order[] = [
    { ...mockOrder, id: 11, status: 1, created: new Date(orderDate).toString() },
    { ... mockOrder, id: 1, status: 2, created: new Date(orderDate - 5000).toString() },
    { ... mockOrder, id: 2, status: 0, created: new Date(orderDate).toString() },
    { ... mockOrder, id: 23456, status: 2, created: new Date(orderDate + 5000).toString() },
  ];
  const mockLicenseList: License[] = [
    { ...mockLicense, id: 1, order: 1, license_type: 'app' },
    { ...mockLicense, id: 2, order: 1, license_type: 'epub' },
    { ...mockLicense, id: 3, order: 2, license_type: 'web' },
    { ...mockLicense, id: 4, order: 11, license_type: 'web', self_hosted: true },
  ];

  class MockOrderActions {
    public searchQuery = jasmine.createSpy('searchQuery');
  }

  beforeEach(async(() => {
    // storeSubject = new BehaviorSubject([]);
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        // TnCommonModule,
        // TnAdminStoreModule,
        StoreModule.provideStore(productionReducer),
      ],
      declarations: [
        AdminOrdersListComponent,
      ],
      providers: [
        // { provide: Store, useClass: MockStore },
        { provide: OrderActions, useClass: MockOrderActions },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AdminOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call order search action', () => {
    const orderActions = fixture.debugElement.injector.get(OrderActions);
    const query = {
      id: 2,
      from: null,
      to: new Date(),
      customer: 'custom',
      project: 'typenetwork',
      font: 'best font',
      foundry: 'all of dem',
      status: [],
      licenses: [],
    };
    spyOn(store, 'dispatch');
    component.searchOrders(query);
    expect(orderActions.searchQuery).toHaveBeenCalledWith(query);
  });

  describe('order combining', () => {
    const licensedOrders = mockOrderList.map((order) => ({
      ...order,
      licenses: mockLicenseList.filter((license) => license.order === order.id),
    }));

    beforeEach(() => {
      store.dispatch({ type: OrderActions.ADD_ORDERS, payload: mockOrderList });
      store.dispatch({ type: LicenseActions.ADD_LICENSES, payload: mockLicenseList });
    });

    it('should assign matching licenses to orders', () => {
      component.ordersLicenses$.subscribe((orders) => {
        expect(orders).toEqual(licensedOrders);
      });
    });

    it('should filter orders by id', () => {
      const target = licensedOrders[0];
      const searchQuery = {
        ...initialOrderState.search,
        id: target.id,
      };
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders) => {
        expect(orders).toEqual([target]);
      });
    });

    it('should filter orders by status', () => {
      const status = [1, 2];
      const searchQuery = {
        ...initialOrderState.search,
        status,
      };
      const expected = licensedOrders.filter((order) => status.indexOf(order.status) !== -1);
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders) => {
        expect(orders).toEqual(expected);
      });
    });

    it('should filter orders by date range', () => {
      const from = new Date(orderDate - 4000);
      const to = new Date(orderDate + 4000);
      const searchQuery = {
        ...initialOrderState.search,
        from,
        to,
      };
      const expected = licensedOrders.filter((order) =>
        new Date(order.created) >= from &&
        new Date(order.created) <= to
      );
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders) => {
        expect(orders).toEqual(expected);
      });
    });

    it('should filter orders by licenses', () => {
      const licenses = [
        { license_type: 'app' },
        { license_type: 'web', self_hosted: true },
      ];
      const to = new Date(orderDate + 4000);
      const searchQuery = {
        ...initialOrderState.search,
        licenses,
      };
      const expected = licensedOrders.filter((order) => licenses.some((licenseType) =>
        Object.entries(licenseType).every(([key, value]) =>
          order.licenses.some((license) => license[key] === value))));
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders) => {
        expect(orders).toEqual(expected);
      });
    });
  });
});
