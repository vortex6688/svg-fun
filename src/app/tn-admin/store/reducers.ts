import { createSelector } from 'reselect';
import { EffectsModule } from '@ngrx/effects';

import * as auth from '../../tn-common/auth';
import * as order from '../../tn-common/orders';
import * as license from '../../tn-common/licenses';
import * as series from '../../tn-common/series';
import * as family from '../../tn-common/families';
import * as style from '../../tn-common/styles';
import * as project from '../../tn-common/projects';
import * as foundry from '../../tn-common/foundries';
import * as designer from '../../tn-common/designers';
import * as customer from '../../tn-common/customers';

export interface AdminState {
  auth: auth.AuthState;
  order: order.OrderState;
  license: license.LicenseState;
  series: series.SeriesState;
  family: family.FamilyState;
  style: style.StyleState;
  project: project.ProjectState;
  foundry: foundry.FoundryState;
  designer: designer.DesignerState;
  customer: customer.CustomerState;
}

export const moduleReducers = [
  { auth: auth.AuthReducer },
  { order: order.OrderReducer },
  { license: license.LicenseReducer },
  { series: series.SeriesReducer },
  { family: family.FamilyReducer },
  { style: style.StyleReducer },
  { project: project.ProjectReducer },
  { foundry: foundry.FoundryReducer },
  { designer: designer.DesignerReducer },
  { customer: customer.CustomerReducer },
];

export const moduleActions = [
  auth.AuthActions,
  order.OrderActions,
  license.LicenseActions,
  series.SeriesActions,
  family.FamilyActions,
  style.StyleActions,
  project.ProjectActions,
  foundry.FoundryActions,
  designer.DesignerActions,
  customer.CustomerActions,
];

export const moduleEffects = [
  EffectsModule.run(auth.AuthEffects),
  EffectsModule.run(order.OrderEffects),
  EffectsModule.run(license.LicenseEffects),
  EffectsModule.run(series.SeriesEffects),
  EffectsModule.run(family.FamilyEffects),
  EffectsModule.run(style.StyleEffects),
  EffectsModule.run(project.ProjectEffects),
  EffectsModule.run(foundry.FoundryEffects),
  EffectsModule.run(designer.DesignerEffects),
  EffectsModule.run(customer.CustomerEffects),
];
/**
 * Function mapping the state tree into a specific state
 */
export const getAuthState = (state: AdminState): auth.AuthState => state.auth;
export const getUser = createSelector(getAuthState, auth.getUser);
export const isAuthInProgress = createSelector(getAuthState, auth.getProgress);
export const getAuthError = createSelector(getAuthState, auth.getError);
export const getOrderState = (state: AdminState): order.OrderState => state.order;
export const getLicenseState = (state: AdminState): license.LicenseState => state.license;
export const getProjectState = (state: AdminState): project.ProjectState => state.project;

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

export const getFamilyState = (state: AdminState): family.FamilyState => state.family;
export const getFamilyEntities = createSelector(getFamilyState, family.getEntities);
export const getFamilyIds = createSelector(getFamilyState, family.getIds);
export const getSelectedFamilyId = createSelector(getFamilyState, family.getSelectedId);
export const getSelectedFamily = createSelector(getFamilyState, family.getSelected);
export const getFamilySearchQuery = createSelector(getFamilyState, family.getSearchQuery);
export const getAllFamilies = createSelector(getFamilyState, family.getAll);
export const getFamilyById = (familyId: number) => {
  return (state) => family.getFamilyById(getFamilyState(state), familyId);
};
export const getFamilyByName = (familyName: string) => {
  return (state) => family.getFamilyByName(getFamilyState(state), familyName);
};
export const getFamiliesByDesigner = (designer: number) => {
  return (state) => family.getFamiliesByDesigner(getFamilyState(state), designer);
};
export const getFamiliesByCategory = (category: number) => {
  return (state) => family.getFamiliesByCategory(getFamilyState(state), category);
};
export const getFamiliesByFoundry = (foundry: number) => {
  return (state) => family.getFamiliesByFoundry(getFamilyState(state), foundry);
};
export const getFamiliesByPosture = (posture: number) => {
  return (state) => family.getFamiliesByPosture(getFamilyState(state), posture);
};
export const getFamiliesByRecommendedFunction = (recommendedFunction: number) => {
  return (state) => family.getFamiliesByRecommendedFunction(getFamilyState(state), recommendedFunction);
};
export const getFamiliesByRecommendedSize = (recommendedSize: number) => {
  return (state) => family.getFamiliesByRecommendedSize(getFamilyState(state), recommendedSize);
};
export const getFamiliesByRelease = (release: Date) => {
  return (state) => family.getFamiliesByRelease(getFamilyState(state), release);
};
export const getFamiliesByVisibility = (visibility: number) => {
  return (state) => family.getFamiliesByVisibility(getFamilyState(state), visibility);
};
export const getFamiliesByWeight = (weight: number) => {
  return (state) => family.getFamiliesByWeight(getFamilyState(state), weight);
};
export const getFamiliesByWidth = (width: number) => {
  return (state) => family.getFamiliesByWidth(getFamilyState(state), width);
};

export const getStyleState = (state: AdminState): style.StyleState => state.style;
export const getStyleEntities = createSelector(getStyleState, style.getEntities);
export const getStyleIds = createSelector(getStyleState, style.getIds);
export const getSelectedStyleId = createSelector(getStyleState, style.getSelectedId);
export const getSelectedStyle = createSelector(getStyleState, style.getSelected);
export const getStyleSearchQuery = createSelector(getStyleState, style.getSearchQuery);
export const getAllStyles = createSelector(getStyleState, style.getAll);
export const getStyleById = (styleId: number) => {
  return (state) => style.getStyleById(getStyleState(state), styleId);
};
export const getStylesByName = (name: string) => {
  return (state) => style.getStylesByName(getStyleState(state), name);
};
export const getDefaultStyles = createSelector(getStyleState, style.getDefaultStyles);
export const getStylesByFoundry = (foundryId: number) => {
  return (state) => style.getStylesByFoundry(getStyleState(state), foundryId);
};
export const getStylesByDesigner = (designerId: number) => {
  return (state) => style.getStylesByDesigner(getStyleState(state), designerId);
};
export const getStylesByPosture = (postureId: number) => {
  return (state) => style.getStylesByPosture(getStyleState(state), postureId);
};
export const getStylesByOptical = (optical: number) => {
  return (state) => style.getStylesByOptical(getStyleState(state), optical);
};
export const getStylesByGrade = (grade: number) => {
  return (state) => style.getStylesByGrade(getStyleState(state), grade);
};
export const getStylesByWeight = (weight: number) => {
  return (state) => style.getStylesByWeight(getStyleState(state), weight);
};
export const getStylesByWidth = (width: number) => {
  return (state) => style.getStylesByWidth(getStyleState(state), width);
};
export const getStylesByTnWeight = (tnWeight: number) => {
  return (state) => style.getStylesByTnWeight(getStyleState(state), tnWeight);
};
export const getStylesByTnWidth = (tnWidth: number) => {
  return (state) => style.getStylesByTnWidth(getStyleState(state), tnWidth);
};
export const getStylesByMinRecommendedSize = (minSize: number) => {
  return (state) => style.getStylesByMinRecommendedSize(getStyleState(state), minSize);
};
export const getStylesByMaxRecommendedSize = (maxSize: number) => {
  return (state) => style.getStylesByMaxRecommendedSize(getStyleState(state), maxSize);
};
export const getStylesByRecommendedFunction = (funct: number) => {
  return (state) => style.getStylesByRecommendedFunction(getStyleState(state), funct);
};
export const getStylesByRecommendedSize = (size: number) => {
  return (state) => style.getStylesByRecommendedSize(getStyleState(state), size);
};
export const getReStyles = createSelector(getStyleState, style.getReStyles);

// PROJECT
export const getProjectEntities = createSelector(getProjectState, project.getEntities);
export const getProjectIds = createSelector(getProjectState, project.getIds);
export const getSelectedProjectId = createSelector(getProjectState, project.getSelectedId);
export const getSelectedProject = createSelector(getProjectState, project.getSelected);
export const getProjectSearchQuery = createSelector(getOrderState, order.getSearchQuery);
export const getAllProjects = createSelector(getProjectState, project.getAll);
export const getProjectById = (projectId) => {
  return (state) => project.getProjectById(state.project, projectId);
};

// FOUNDRY
export const getFoundryState = (state: AdminState): foundry.FoundryState => state.foundry;
export const getFoundryEntities = createSelector(getFoundryState, foundry.getEntities);
export const getFoundryIds = createSelector(getFoundryState, foundry.getIds);
export const getSelectedFoundryId = createSelector(getFoundryState, foundry.getSelectedId);
export const getSelectedFoundry = createSelector(getFoundryState, foundry.getSelected);
export const getAllFoundries = createSelector(getFoundryState, foundry.getAll);
export const getFoundryById = (foundryId) => {
  return (state) => foundry.getFoundryById(state.foundry, foundryId);
};

// DESIGNER
export const getDesignerState = (state: AdminState): designer.DesignerState => state.designer;
export const getDesignerEntities = createSelector(getDesignerState, designer.getEntities);
export const getDesignerIds = createSelector(getDesignerState, designer.getIds);
export const getSelectedDesignerId = createSelector(getDesignerState, designer.getSelectedId);
export const getSelectedDesigner = createSelector(getDesignerState, designer.getSelected);
export const getAllDesigners = createSelector(getDesignerState, designer.getAll);
export const getDesignerById = (designerId: number) => {
  return (state) => designer.getDesignerById(state.designer, designerId);
};
export const getDesignerByName = (name: string) => {
  return (state) => designer.getDesignerByName(state.designer, name);
};
export const getDesignerBySlug = (slug: string) => {
  return (state) => designer.getDesignerBySlug(state.designer, slug);
};
export const getDesignersByBirth = (birth: Date) => {
  return (state) => designer.getDesignersByBirth(state.designer, birth);
};
export const getDesignersByDeath = (death: Date) => {
  return (state) => designer.getDesignersByDeath(state.designer, death);
};
export const getDesignersByDescription = (description: string) => {
  return (state) => designer.getDesignersByDescription(state.designer, description);
};
export const getDesignersByFoundry = (foundry: number) => {
  return (state) => designer.getDesignersByFoundry(state.designer, foundry);
};
export const getDesignersByTitle = (title: number) => {
  return (state) => designer.getDesignersByTitle(state.designer, title);
};

// CUSTOMER
export const getCustomerState = (state: AdminState): customer.CustomerState => state.customer;
export const getCustomerEntities = createSelector(getCustomerState, customer.getEntities);
export const getCustomerIds = createSelector(getCustomerState, customer.getIds);
export const getSelectedCustomerId = createSelector(getCustomerState, customer.getSelectedId);
export const getSelectedCustomer = createSelector(getCustomerState, customer.getSelected);
export const getAllCustomers = createSelector(getCustomerState, customer.getAll);
export const getCustomerById = (customerId) => {
  return (state) => customer.getCustomerById(state.customer, customerId);
};
export const getCustomerByName = (name) => {
  return (state) => customer.getCustomerByName(state.customer, name);
};
export const getCustomerByEmail = (email) => {
  return (state) => customer.getCustomerByEmail(state.customer, email);
};
export const getCustomersByCity = (city) => {
  return (state) => customer.getCustomersByCity(state.customer, city);
};
export const getCustomersByCountry = (country) => {
  return (state) => customer.getCustomersByCountry(state.customer, country);
};
export const getCustomersByActivity = (activity) => {
  return (state) => customer.getCustomersByActivity(state.customer, activity);
};
