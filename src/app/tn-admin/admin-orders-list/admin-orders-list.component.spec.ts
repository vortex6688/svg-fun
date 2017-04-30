/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';

import { Order, OrderActions } from '../../tn-common/orders';
import { AdminOrdersListComponent } from './admin-orders-list.component';
import { TnAdminStoreModule } from '../store';

const OrderMock: Order = {
  id: 123,
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

describe('AdminOrdersListComponent', () => {
  let component: AdminOrdersListComponent;
  let fixture: ComponentFixture<AdminOrdersListComponent>;
  let storeSubject: BehaviorSubject<object>;

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
  }

  class MockOrderActions {
    public searchQuery = jasmine.createSpy('searchQuery');
  }

  beforeEach(async(() => {
    storeSubject = new BehaviorSubject({});
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        AdminOrdersListComponent,
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: OrderActions, useClass: MockOrderActions },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call order search action', () => {
    const orderActions = fixture.debugElement.injector.get(OrderActions);
    spyOn(orderActions, 'searchQuery').and.callThrough();
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
    component.searchOrders(query);
    expect(orderActions.searchQuery).toHaveBeenCalledWith(query);
  });
});
