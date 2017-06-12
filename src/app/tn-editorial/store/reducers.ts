import { createSelector } from 'reselect';

import * as order from '../../tn-common/orders';

export interface EditorialState {
  order: order.OrderState;
}

export const moduleReducers = [
  { order: order.OrderReducer },
];

export const moduleActions = [
  order.OrderActions,
];

/**
 * Function mapping the state tree into a specific state
 */
export const getOrderState = (state: EditorialState): order.OrderState => state.order;

export const getOrderEntities = createSelector(getOrderState, order.getEntities);
export const getOrderIds = createSelector(getOrderState, order.getIds);
export const getSelectedOrderId = createSelector(getOrderState, order.getSelectedId);
export const getSelectedOrder = createSelector(getOrderState, order.getSelected);
export const getAllOrders = createSelector(getOrderState, order.getAll);
export const getOrderPaymentType = createSelector(getOrderState, order.getPaymentType);
export const getOrderById = (orderId) => {
  return (state) => order.getOrderById(state.order, orderId);
};
export const getOrderByCustomerId = (customerId) => {
  return (state) => order.getOrderByCustomerId(getOrderState(state), customerId);
};
export const getOrderByStatus = (status) => {
  return (state) => order.getOrderByStatus(getOrderState(state), status);
};
