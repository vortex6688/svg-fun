import { ActionReducer, Action } from '@ngrx/store';

import { Customer } from './customer.model';
import { CustomerState, initialCustomerState } from './customer.state';
import { CustomerActions } from './customer.actions';

export const CustomerReducer: ActionReducer<CustomerState> = (state = initialCustomerState, action: Action) => {
  switch (action.type) {
    case CustomerActions.GET_CUSTOMERS:
      return { ...state, selectedCustomerId: null };

    case CustomerActions.GET_CUSTOMER: {
      const customer: Customer = action.payload;

      return {
        ids: [ customer.id ],
        entities: {
          [customer.id]: customer
        },
        selectedCustomerId: customer.id,
        search: state.search,
      };
    }

    case CustomerActions.CREATE_CUSTOMER_SUCCESS: {
      const customer: Customer = action.payload;

      return {
        ids: [ ...state.ids, customer.id ],
        entities: Object.assign({}, state.entities, {
          [customer.id]: customer
        }),
        selectedCustomerId: customer.id,
        search: state.search,
      };
    }

    case CustomerActions.UPDATE_CUSTOMER_SUCCESS: {
      const customer: Customer = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [customer.id]: customer
        }),
        selectedCustomerId: customer.id,
        search: state.search,
      };
    }

    case CustomerActions.REMOVE_CUSTOMER_SUCCESS: {
      const customer: Customer = action.payload;
      delete state.entities[customer.id];

      return {
        ids: state.ids.filter((id) => id !== customer.id),
        entities: Object.assign({}, state.entities),
        selectedCustomerId: null,
        search: state.search,
      };
    }

    case CustomerActions.SEARCH_QUERY: {
      const search = action.payload;

      return { ...state, search };
    }

    case CustomerActions.LOAD_CUSTOMERS_SUCCESS: {
      const customers: Customer[] = action.payload;
      const { customerEntities, customerIds } = customers.reduce((result, customer) => {
        result.customerEntities[customer.id] = customer;
        result.customerIds.push(customer.id);
        return result;
      }, { customerEntities: {}, customerIds: [] });

      return {
        ...state,
        ids: customerIds,
        entities: customerEntities,
      };
    }

    case CustomerActions.CREATE_CUSTOMER_FAIL:
    case CustomerActions.UPDATE_CUSTOMER_FAIL:
    case CustomerActions.REMOVE_CUSTOMER_FAIL:
    case CustomerActions.LOAD_CUSTOMERS_FAIL:
    default: {
      return state;
    }
  }
};
