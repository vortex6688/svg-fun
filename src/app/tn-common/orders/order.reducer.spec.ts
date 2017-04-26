import {
  inject,
  async,
} from '@angular/core/testing';

import { Order } from './order.model';
import { OrderReducer } from './order.reducer';
import { OrderActions } from './order.actions';
import { OrderState, initialOrderState } from './order.state';
import {
  getEntities,
  getIds,
  getSelectedId,
  getSelected,
  getAll,
  getPaymentType,
  getOrderById,
  getOrderByCustomerId,
  getOrderByStatus,
 } from './order.selectors';

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

describe('OrderReducer', () => {
  const mockedState = (results = []): OrderState => (initialOrderState);

  const orderActions = new OrderActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = OrderReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should PLACE_ORDER place a new order', () => {
    const state = mockedState();
    const actual = OrderReducer(state, orderActions.placeOrder(OrderMock));
    const expected = {
      ids: [...state.ids, ...[OrderMock.id]],
      entities: Object.assign({}, state.entities, { [OrderMock.id]: OrderMock }),
      selectedOrderId: OrderMock.id
    };
    expect(actual).toEqual(expected);
  });

  it('should GET_ORDERS when there is no Order on the state', () => {
    const state = mockedState();
    const actual = OrderReducer(state, orderActions.getOrders());
    const expected = {
      ids: [],
      entities: {},
      selectedOrderId: null
    };
    expect(actual).toEqual(expected);
  });

  describe('when an Order already exists in the state', () => {
    const state = mockedState();
    let addedState = initialOrderState;

    beforeEach(() => {
      addedState = OrderReducer(state, orderActions.placeOrder(OrderMock));
    });

    it('should GET_ORDERS when there already exists an Order on the state', () => {
      const actual = OrderReducer(addedState, orderActions.getOrders());
      const expected = {
        ids: [...state.ids, ...[OrderMock.id]],
        entities: Object.assign({}, state.entities, { [OrderMock.id]: OrderMock }),
        selectedOrderId: null
      };
      expect(actual).toEqual(expected);
    });

    it('should GET_ORDER will return the selected Order', () => {
      const actual = OrderReducer(addedState, orderActions.getOrder(OrderMock));
      const expected = {
        ids: [OrderMock.id],
        entities: { [OrderMock.id]: OrderMock },
        selectedOrderId: OrderMock.id
      };
      expect(actual).toEqual(expected);
    });

    it('getEntities should return all the entities of an OrderState', () => {
      const entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of an OrderState', () => {
      const ids = getIds(addedState);
      expect(ids).toEqual(addedState.ids);
    });

    it('getSelectedId should return the id of the selected OrderState', () => {
      const selectedOrderId = getSelectedId(addedState);
      expect(selectedOrderId).toEqual(addedState.selectedOrderId);
    });

    it('getSelected should return the entity of the selected OrderState', () => {
      const selectedOrder = getSelected(addedState);
      const selected = addedState.entities[addedState.selectedOrderId];
      expect(selectedOrder).toEqual(selected);
    });

    it('getAll should return all the entities of the OrderState', () => {
      const selectedOrder = getAll(addedState);
      const selected = addedState.ids.map((id) => addedState.entities[id]);
      expect(selectedOrder).toEqual(selected);
    });

    it(`getPaymentType should return the payment type of an specific
    entity in the OrderState`, () => {
      const paymentType = getPaymentType(addedState);
      const selectedOrder = getSelected(addedState);
      const providerData = JSON.parse(selectedOrder.payments[0].provider_data);
      const expectedPayment = providerData.free_trial ? 'Free Trial' :
        providerData.free_order ? 'Free' :
        providerData.card ? providerData.card.brand :
        providerData.message ? providerData.message :
        'Unknown';
      expect(paymentType).toEqual(expectedPayment);
    });

    it('getOrderById should return an especific Order with the id provided', () => {
      const selectedOrder = getOrderById(addedState, OrderMock.id);
      expect(selectedOrder).toEqual(OrderMock);
    });

    it('getOrderByCustomerId should return all the Orders of one customer that has', () => {
      const selectedOrder = getOrderByCustomerId(addedState, OrderMock.user);
      expect(selectedOrder).toEqual([OrderMock]);
    });

    it('getOrderByCustomerId should return all the Orders of one customer without order', () => {
      const selectedOrder = getOrderByCustomerId(addedState, 99);
      expect(selectedOrder).toEqual([]);
    });

    it('getOrderByStatus should return all the Orders with one of the status provided', () => {
      const selectedOrder = getOrderByStatus(addedState, [OrderMock.status]);
      expect(selectedOrder).toEqual([OrderMock]);
    });

    it('getOrderByStatus should return all the existent Orders with the status provided', () => {
      const selectedOrder = getOrderByStatus(addedState, [0]);
      expect(selectedOrder).toEqual([]);
    });
  });
});
