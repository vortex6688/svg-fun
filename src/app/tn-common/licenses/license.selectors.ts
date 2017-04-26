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
