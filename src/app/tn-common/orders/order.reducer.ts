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
      const query = action.payload;
      const ids = state.ids.filter((id) => {
        const order = state.entities[id];
        if (query.id && order.id !== +query.id) {
          return false;
        }
        if (query.status.length && !query.status.includes(order.status)) {
          return false;
        }
        if (query.from && new Date(order.created) < query.from) {
          return false;
        }
        if (query.to && new Date(order.created) > query.to) {
          return false;
        }
        return true;
      });
      // If search didn't filter out any data consider it inactive
      const active = state.ids.length !== ids.length;
      const search = {
        ids,
        active,
        query,
      };

      return { ...state, search };
    }

    case OrderActions.ADD_ORDERS: {
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

    default: {
      return state;
    }
  }
};
