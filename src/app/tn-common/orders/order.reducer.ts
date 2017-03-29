import { ActionReducer, Action } from '@ngrx/store';

import { Order } from './order.model';
import { OrderState, initialOrderState } from './order.state';
import { OrderActions } from './order.actions';

export const OrderReducer: ActionReducer<OrderState> = (state = initialOrderState,
                                                        action: Action) => {
  switch (action.type) {
    case OrderActions.GET_ORDERS:
      return {
        ids: state.ids,
        entities: state.entities,
        selectedOrderId: null,
      };

    case OrderActions.GET_ORDER: {
      const order: Order = action.payload;

      return {
        ids: [ order.id ],
        entities: {
          [order.id]: order
        },
        selectedOrderId: order.id,
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
      };
    }

    default: {
      return state;
    }
  }
};
