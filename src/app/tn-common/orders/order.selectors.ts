import { createSelector } from 'reselect';

import { OrderState } from './order.state';
import { Order } from './order.model';

/**
 * Returns all the order entities selected.
 *
 * @param {state} OrderState
 */
export const getEntities = (state: OrderState) => state.entities;

/**
 * Returns all the ids of the selected orders.
 *
 * @param {state} OrderState
 */
export const getIds = (state: OrderState) => state.ids;

/**
 * Returns all the ids of the searched orders.
 *
 * @param {state} OrderState
 */
export const getFoundIds = (state: OrderState) => state.search.ids;

/**
 * Return the id of the selected order.
 *
 * @param {state} OrderState
 */
export const getSelectedId = (state: OrderState) => state.selectedOrderId;

/**
 * Return if the search is loading.
 *
 * @param {state} OrderState
 */
export const getLoading = (state: OrderState) => state.search.loading;

/**
 * Return the specific order selected.
 *
 * @type {Reselect.Selector}
 */
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

/**
 * Get all orders.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return all the orders resulted from search.
 *
 * @param state OrderState
 */
export const getAllFound = createSelector(getEntities, getFoundIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Returns the payment type of an specific order.
 *
 * @type {Reselect.Selector}
 */
export const getPaymentType = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  const order: Order = entities[selectedId];

  if (order.status === 3) {
    return 'Cancelled';
  }

  const hasPayments = order.payments.length && order.payments.length !== 0;
  if (hasPayments && order.payments[0].provider === 0) {
    const providerData = JSON.parse(order.payments[0].provider_data);
    return providerData.free_trial ? 'Free Trial' :
      providerData.free_order ? 'Free' :
        providerData.card ? providerData.card.brand :
          providerData.message ? providerData.message :
            'Unknown';
  } else if (hasPayments && order.payments[0].provider === 1 && order.status === 2) {
    return 'Paid, Invoiced';
  } else {
    return 'Unpaid, Invoiced';
  }
});

/**
 * Return the order entity with the provided id.
 *
 * @param state OrderState
 * @param orderId number Order Id to be returned
 */
export const getOrderById = (state: OrderState, orderId: number) => {
  return state.entities[orderId];
};

/**
 * Return all the orders entities from the provided customer id.
 *
 * @param state OrderState
 * @param customerId number Customer Id to return orders
 */
export const getOrderByCustomerId = (state: OrderState, customerId: number) => {
  const orders = state.ids.map((id) => state.entities[id]);
  return orders.filter((order) => order.user === customerId);
};

/**
 * Return all the orders entities with the status provided.
 *
 * @param state OrderState
 * @param status number Of the status to filter
 */
export const getOrderByStatus = (state: OrderState, status: number[]) => {
  const orders = state.ids.map((id) => state.entities[id]);
  return orders.filter((order) => status.indexOf(order.status) >= 0);
};
