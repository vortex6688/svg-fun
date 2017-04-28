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
      const search = {
        ids: [],
        loading: true,
        query: action.payload,
      };

      return { ...state, search };
    }

    case OrderActions.SEARCH_COMPLETE: {
      const orders: Order[] = action.payload;
      const { newOrderEntities, newIds } = orders.reduce((result, order) => {
        if (state.entities[order.id]) {
          return result;
        }
        result.newOrderEntities[order.id] = order;
        result.newIds.push(order.id);
        return result;
      }, { newOrderEntities: {}, newIds: [] });

      return {
        ids: [ ...state.ids, ...newIds ],
        entities: Object.assign({}, state.entities, newOrderEntities),
        selectedOrderId: state.selectedOrderId,
        search: {
          ids: newIds,
          loading: false,
          query: state.search.query,
        },
      };
    }

    default: {
      return state;
    }
  }
};
