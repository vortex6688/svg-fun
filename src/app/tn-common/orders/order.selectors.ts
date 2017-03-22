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
 * Return the id of the selected order.
 *
 * @param {state} OrderState
 */
export const getSelectedId = (state: OrderState) => state.selectedOrderId;

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
 * Returns the payment type of an specific order.
 *
 * @type {Reselect.Selector}
 */
export const getPaymentType = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    let order: Order = entities[selectedId];

    if (order.status === 3) {
          return 'Cancelled';
      }

    let hasPayments = order.payments.length && order.payments.length !== 0;
    if (hasPayments && order.payments[0].provider === 0) {
        let providerData = JSON.parse(order.payments[0].provider_data);
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
