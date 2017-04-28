import { createSelector } from 'reselect';

import { LicenseState } from './license.state';
import { License } from './license.model';

/**
 * Returns all the license entities selected.
 *
 * @param {state} LicenseState
 */
export const getEntities = (state: LicenseState) => state.entities;

/**
 * Returns all the ids of the selected licenses.
 *
 * @param {state} LicenseState
 */
export const getIds = (state: LicenseState) => state.ids;

/**
 * Returns all the ids of the searched licenses.
 *
 * @param {state} LicenseState
 */
export const getFoundIds = (state: LicenseState) => state.search.ids;

/**
 * Return the id of the selected license.
 *
 * @param {state} LicenseState
 */
export const getSelectedId = (state: LicenseState) => state.selectedLicenseId;

/**
 * Return if the search is loading.
 *
 * @param {state} LicenseState
 */
export const getLoading = (state: LicenseState) => state.search.loading;

/**
 * Return the specific license selected.
 *
 * @type {Reselect.Selector}
 */
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

/**
 * Get all licenses.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return all the licenses resulted from search.
 *
 * @param state LicenseState
 */
export const getAllFound = createSelector(getEntities, getFoundIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return the license entity with the provided id.
 *
 * @param state LicenseState
 * @param licenseId number License Id to be returned
 */
export const getLicenseById = (state: LicenseState, licenseId: number) => {
  return state.entities[licenseId];
};

/**
 * Return all the licenses with the provided license type.
 *
 * @param state LicenseState
 * @param type list of strings containing license_types to filter
 */
export const getLicencesByType = (state: LicenseState, type: string[]) => {
  const licenses = state.ids.map((id) => state.entities[id]);
  return licenses.filter((license) => type.indexOf(license.license_type) !== -1);
};

/**
 * Return all the licenses that are free trial.
 *
 * @param state LicenseState
 */
export const getFreeTrialLicences = (state: LicenseState) => {
  const licenses = state.ids.map((id) => state.entities[id]);
  return licenses.filter((license) => license.years === -2);
};

/**
 * Return all the licenses that are perpetual.
 *
 * @param state LicenseState
 */
export const getPerpetualLicences = (state: LicenseState) => {
  const licenses = state.ids.map((id) => state.entities[id]);
  return licenses.filter((license) => license.years === -1);
};

/**
 * Return all the licenses that are NOT perpetual.
 *
 * @param state LicenseState
 */
export const getNotPerpetualLicences = (state: LicenseState) => {
  const licenses = state.ids.map((id) => state.entities[id]);
  return licenses.filter((license) => license.years > 0);
};

/**
 * Return all the Hosted licenses.
 *
 * @param state LicenseState
 */
export const getHostedLicences = (state: LicenseState) => {
  const licenses = state.ids.map((id) => state.entities[id]);
  return licenses.filter((license) => license.self_hosted === false);
};

/**
 * Return all the Self-Hosted licenses.
 *
 * @param state LicenseState
 */
export const getSelfHostedLicences = (state: LicenseState) => {
  const licenses = state.ids.map((id) => state.entities[id]);
  return licenses.filter((license) => license.self_hosted === true);
};

/**
 * Return all the licenses that are active.
 *
 * @param state LicenseState
 */
export const getActiveLicences = (state: LicenseState) => {
  const licenses = state.ids.map((id) => state.entities[id]);
  return licenses.filter((license) => license.active === true);
};
