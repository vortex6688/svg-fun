import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Order, OrderService } from '../../tn-common/orders';
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

class MockOrderService {
  public find(query: object): Observable<Order[]> {
    return Observable.of([OrderMock]);
  }
}

describe('AdminOrdersListComponent', () => {
  let component: AdminOrdersListComponent;
  let fixture: ComponentFixture<AdminOrdersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TnAdminStoreModule,
      ],
      declarations: [
        AdminOrdersListComponent,
      ],
      providers: [ {provide: OrderService, useClass: MockOrderService} ],
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

  it('should clear search', () => {
    component.searchCustomer = 'Dave';
    component.searchFont = 'Benton';
    component.clearSearch();
    expect(component.searchCustomer).toBe('');
    expect(component.searchFont).toBe('');
  });

});
