import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { OrderService } from './order.service';
import { OrderActions } from './order.actions';
import { OrderEffects } from './order.effects';
import { Order } from './order.model';
import { initialOrderState } from './order.state';

describe('OrderEffects', () => {
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
  const mockOrders = [
    { ...OrderMock, id: 12345 },
    { ...OrderMock, id: 234543123 },
  ];

  let runner: EffectsRunner;
  let orderEffects: OrderEffects;
  let orderActions: OrderActions;
  let orderService: MockOrderService;

  class MockOrderService {
    public getAllPages(query: object): Observable<Order[]> {
      return Observable.of(mockOrders);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      OrderActions,
      OrderEffects,
      {
        provide: OrderService,
        useClass: MockOrderService,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    orderActions = TestBed.get(OrderActions);
    orderEffects = TestBed.get(OrderEffects);
    orderService = TestBed.get(OrderService);
  });

  describe('loadData$', () => {
    it('should call orderService.getAllPages on initial subscription', () => {
      const expectedResult = orderActions.addOrders(mockOrders);
      spyOn(orderService, 'getAllPages').and.callThrough();

      let result;
      orderEffects.loadData$.subscribe((data) => result = data);
      expect(orderService.getAllPages).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});
