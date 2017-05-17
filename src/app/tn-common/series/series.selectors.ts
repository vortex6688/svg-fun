import { createSelector } from 'reselect';

import { SeriesState } from './series.state';

/**
 * Returns all the series entities selected.
 *
 * @param {state} SeriesState
 */
export const getEntities = (state: SeriesState) => state.entities;

/**
 * Returns all the ids of the selected series.
 *
 * @param {state} SeriesState
 */
export const getIds = (state: SeriesState) => state.ids;

/**
 * Returns all the ids of the searched series.
 *
 * @param {state} SeriesState
 */
export const getFoundIds = (state: SeriesState) => state.search.ids;

/**
 * Return the id of the selected series.
 *
 * @param {state} SeriesState
 */
export const getSelectedId = (state: SeriesState) => state.selectedSeriesId;

/**
 * Return the specific series selected.
 *
 * @type {Reselect.Selector}
 */
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

/**
 * Get all series.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return all the series resulted from search.
 *
 * @param state SeriesState
 */
export const getAllFound = createSelector(getEntities, getFoundIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return the series entity with the provided id.
 *
 * @param state SeriesState
 * @param seriesId number Series Id to be returned
 */
export const getSeriesById = (state: SeriesState, seriesId: number) => {
  return state.entities[seriesId];
};
