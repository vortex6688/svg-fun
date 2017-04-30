import { createSelector } from 'reselect';
import { EffectsModule } from '@ngrx/effects';

import * as order from '../../tn-common/orders';
import * as auth from '../../tn-common/auth';

export interface AdminState {
  order: order.OrderState;
  auth: auth.AuthState;
}

export const moduleReducers = [{
  reducer: { order: order.OrderReducer },
  actions: order.OrderActions,
}, {
  reducer: { auth: auth.AuthReducer },
  actions: auth.AuthActions,
}];

export const moduleEffects = [
  EffectsModule.run(order.OrderEffects),
  EffectsModule.run(auth.AuthEffects),
];
/**
 * Function mapping the state tree into a specific state
 */
export const getOrderState = (state: AdminState): order.OrderState => state.order;

export const getOrderEntities = createSelector(getOrderState, order.getEntities);
export const getOrderIds = createSelector(getOrderState, order.getIds);
export const getSelectedOrderId = createSelector(getOrderState, order.getSelectedId);
export const getSelectedOrder = createSelector(getOrderState, order.getSelected);
export const getOrderSearchQuery = createSelector(getOrderState, order.getSearchQuery);
export const getAllOrders = createSelector(getOrderState, order.getAll);
export const getAllFoundOrders = createSelector(getOrderState, order.getAllFound);
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

export const getAuthState = (state: AdminState): auth.AuthState => state.auth;
export const getUser = createSelector(getAuthState, auth.getUser);
export const isAuthInProgress = createSelector(getAuthState, auth.getProgress);
export const getAuthError = createSelector(getAuthState, auth.getError);
