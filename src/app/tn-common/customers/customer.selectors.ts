import { createSelector } from 'reselect';

import { CustomerState } from './customer.state';

/**
 * Returns all the customer entities selected.
 *
 * @param {state} CustomerState
 */
export const getEntities = (state: CustomerState) => state.entities;

/**
 * Returns all the ids of the selected customers.
 *
 * @param {state} CustomerState
 */
export const getIds = (state: CustomerState) => state.ids;

/**
 * Return the id of the selected customer.
 *
 * @param {state} CustomerState
 */
export const getSelectedId = (state: CustomerState) => state.selectedCustomerId;

/**
 * Return the specific customer selected.
 *
 * @type {Reselect.Selector}
 */
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

/**
 * Return customer search query.
 *
 * @param {state} CustomerState
 */
export const getSearchQuery = (state: CustomerState) => state.search;
/**
 * Get all customers.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return the customer entity with the provided id.
 *
 * @param {state} CustomerState
 * @param {customerId} number - Customer Id to be returned
 */
export const getCustomerById = (state: CustomerState, customerId: number) => {
  return state.entities[customerId];
};

/**
 * Return the customer entity with the provided name.
 *
 * @param {state} CustomerState
 * @param {name} string - Customer name to be returned
 */
export const getCustomerByName = (state: CustomerState, name: string) => {
  const customerId = state.ids.find((id) => {
    const customer = state.entities[id];
    const fullName = `${customer.first_name} ${customer.last_name}`;
    return fullName.indexOf(name) !== -1;
  });
  return state.entities[customerId];
};

/**
 * Return all the customers with the provided city.
 *
 * @param {state} CustomerState
 * @param {city} string
 */
export const getCustomersByCity = (state: CustomerState, city: string) => {
  return state.ids.reduce((customers, id) => {
    const customer = state.entities[id];
    if (customer.city === city) {
      customers.push(customer);
    }
    return customers;
  }, []);
};

/**
 * Return all the customers with the provided country.
 *
 * @param {state} CustomerState
 * @param {country} string
 */
export const getCustomersByCountry = (state: CustomerState, country: string) => {
  return state.ids.reduce((customers, id) => {
    const customer = state.entities[id];
    if (customer.country === country) {
      customers.push(customer);
    }
    return customers;
  }, []);
};

/**
 * Returns the customer with the provided email.
 *
 * @param {state} CustomerState
 * @param {email} string
 */
export const getCustomerByEmail = (state: CustomerState, email: string) => {
  const customer = state.ids.find((id) => state.entities[id].email === email);
  return state.entities[customer];
};

/**
 * Return all the customers with the provided activity.
 *
 * @param {state} CustomerState
 * @param {activity} boolean
 */
export const getCustomersByActivity = (state: CustomerState, activity: boolean) => {
  return state.ids.reduce((customers, id) => {
    const customer = state.entities[id];

    if (customer.is_active === activity) {
      customers.push(customer);
    }
    return customers;
  }, []);
};
