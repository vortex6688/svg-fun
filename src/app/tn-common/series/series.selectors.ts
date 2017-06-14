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
 * Return series search query.
 *
 * @param {state} SeriesState
 */
export const getSearchQuery = (state: SeriesState) => state.search;

/**
 * Get all series.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
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

/**
 * Return all the series with the provided designer.
 *
 * @param {state} SeriesState
 * @param {designer} number
 */
export const getSeriesByDesigner = (state: SeriesState, designer: number) => {
  return state.ids.reduce((series, id) => {
    const seriesInstance = state.entities[id];

    if (seriesInstance.designers.indexOf(designer) !== -1) {
      series.push(seriesInstance);
    }
    return series;
  }, []);
};

/**
 * Return all the series with the provided foundry.
 *
 * @param {state} SeriesState
 * @param {foundry} number
 */
export const getSeriesByFoundry = (state: SeriesState, foundry: number) => {
  return state.ids.reduce((series, id) => {
    const seriesInstance = state.entities[id];

    if (seriesInstance.foundry === foundry) {
      series.push(seriesInstance);
    }
    return series;
  }, []);
};

/**
 * Return all the series with the provided name.
 *
 * @param {state} SeriesState
 * @param {foundry} number
 */
export const getSeriesByName = (state: SeriesState, name: string) => {
  const seriesId = state.ids.find((id) => state.entities[id].name === name);
  return state.entities[seriesId];
};

/**
 * Return all the series with the provided family.
 *
 * @param {state} SeriesState
 * @param {foundry} number
 */
export const getSeriesByFamily = (state: SeriesState, family: number) => {
  return state.ids.reduce((series, id) => {
    const seriesInstance = state.entities[id];

    if ((seriesInstance.family as number[]).indexOf(family) !== -1) {
      series.push(seriesInstance);
    }
    return series;
  }, []);
};
