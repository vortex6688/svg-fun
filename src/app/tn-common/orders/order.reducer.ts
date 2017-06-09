import { ActionReducer, Action } from '@ngrx/store';

import { Order } from './order.model';
import { OrderState, initialOrderState } from './order.state';
import { OrderActions } from './order.actions';

export const OrderReducer: ActionReducer<OrderState> = (state = initialOrderState,
                                                        action: Action) => {
  switch (action.type) {
    case OrderActions.GET_ORDERS:
      return { ...state, selectedOrderId: null };

    case OrderActions.GET_ORDER: {
      const order: Order = action.payload;

      return {
        ids: [ order.id ],
        entities: {
          [order.id]: order
        },
        selectedOrderId: order.id,
        search: state.search,
      };
    }

    case OrderActions.PLACE_ORDER: {
      const order: Order = action.payload;

      return {
        ids: [ ...state.ids, order.id ],
        entities: Object.assign({}, state.entities, {
          [order.id]: order
        }),
        selectedOrderId: order.id,
        search: state.search,
      };
    }

    case OrderActions.SEARCH_QUERY: {
      const search = action.payload;

      return { ...state, search };
    }

    case OrderActions.LOAD_ORDERS_SUCCESS: {
      const orders: Order[] = action.payload;
      const { orderEntities, orderIds } = orders.reduce((result, order) => {
        result.orderEntities[order.id] = order;
        result.orderIds.push(order.id);
        return result;
      }, { orderEntities: {}, orderIds: [] });

      return {
        ...state,
        ids: orderIds,
        entities: orderEntities,
      };
    }

    case OrderActions.LOAD_ORDERS_FAIL:
    default: {
      return state;
    }
  }
};
