import { createSelector } from 'reselect';
import { EffectsModule } from '@ngrx/effects';

import * as order from '../../tn-common/orders';
import * as auth from '../../tn-common/auth';
import * as license from '../../tn-common/licenses';
import * as series from '../../tn-common/series';

export interface AdminState {
  order: order.OrderState;
  auth: auth.AuthState;
  license: license.LicenseState;
  series: series.SeriesState;
}

export const moduleReducers = [{
  reducer: { order: order.OrderReducer },
  actions: order.OrderActions,
}, {
  reducer: { auth: auth.AuthReducer },
  actions: auth.AuthActions,
}, {
  reducer: { license: license.LicenseReducer },
  actions: license.LicenseActions,
}, {
  reducer: { series: series.SeriesReducer },
  actions: series.SeriesActions,
}];

export const moduleEffects = [
  EffectsModule.run(auth.AuthEffects),
  EffectsModule.run(order.OrderEffects),
  EffectsModule.run(license.LicenseEffects),
  EffectsModule.run(series.SeriesEffects),
];
/**
 * Function mapping the state tree into a specific state
 */
export const getOrderState = (state: AdminState): order.OrderState => state.order;
export const getLicenseState = (state: AdminState): license.LicenseState => state.license;

export const getOrderEntities = createSelector(getOrderState, order.getEntities);
export const getOrderIds = createSelector(getOrderState, order.getIds);
export const getSelectedOrderId = createSelector(getOrderState, order.getSelectedId);
export const getSelectedOrder = createSelector(getOrderState, order.getSelected);
export const getOrderSearchQuery = createSelector(getOrderState, order.getSearchQuery);
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

export const getAuthState = (state: AdminState): auth.AuthState => state.auth;
export const getUser = createSelector(getAuthState, auth.getUser);
export const isAuthInProgress = createSelector(getAuthState, auth.getProgress);
export const getAuthError = createSelector(getAuthState, auth.getError);

export const getLicenseEntities = createSelector(getLicenseState, license.getEntities);
export const getLicenseIds = createSelector(getLicenseState, license.getIds);
export const getSelectedLicenseId = createSelector(getLicenseState, license.getSelectedId);
export const getSelectedLicense = createSelector(getLicenseState, license.getSelected);
export const getLicenseSearchQuery = createSelector(getOrderState, order.getSearchQuery);
export const getAllLicenses = createSelector(getLicenseState, license.getAll);
export const getFreeTrialLicenses = createSelector(getLicenseState, license.getFreeTrialLicences);
export const getPerpetualLicenses = createSelector(getLicenseState, license.getPerpetualLicences);
export const getNotPerpetualLicenses = createSelector(getLicenseState, license.getNotPerpetualLicences);
export const getHostedLicenses = createSelector(getLicenseState, license.getHostedLicences);
export const getSelfHostedLicenses = createSelector(getLicenseState, license.getSelfHostedLicences);
export const getActiveLicenses = createSelector(getLicenseState, license.getActiveLicences);
export const getLicenseById = (licenseId) => {
  return (state) => license.getLicenseById(state.license, licenseId);
};
export const getLicenseByType = (licenseType) => {
  return (state) => license.getLicencesByType(state.license, licenseType);
};

export const getSeriesState = (state: AdminState): series.SeriesState => state.series;
export const getSeriesEntities = createSelector(getSeriesState, series.getEntities);
export const getSeriesIds = createSelector(getSeriesState, series.getIds);
export const getSelectedSeriesId = createSelector(getSeriesState, series.getSelectedId);
export const getSelectedSeries = createSelector(getSeriesState, series.getSelected);
export const getSeriesSearchQuery = createSelector(getSeriesState, series.getSearchQuery);
export const getAllSeries = createSelector(getSeriesState, series.getAll);
export const getAllFoundSeries = createSelector(getSeriesState, series.getAllFound);
export const getSeriesByDesigner = (designer: number) => {
  return (state) => series.getSeriesByDesigner(getSeriesState(state), designer);
};
export const getSeriesByFoundry = (foundry: number) => {
  return (state) => series.getSeriesByFoundry(getSeriesState(state), foundry);
};
export const getSeriesByName = (name: string) => {
  return (state) => series.getSeriesByName(getSeriesState(state), name);
};
export const getSeriesByFamily = (family: number) => {
  return (state) => series.getSeriesByFamily(getSeriesState(state), family);
};
