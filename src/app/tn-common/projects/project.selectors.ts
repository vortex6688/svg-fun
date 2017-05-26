import { createSelector } from 'reselect';

import { ProjectState } from './project.state';

/**
 * Returns all the project entities selected.
 *
 * @param {state} ProjectState
 */
export const getEntities = (state: ProjectState) => state.entities;

/**
 * Returns all the ids of the selected projects.
 *
 * @param {state} ProjectState
 */
export const getIds = (state: ProjectState) => state.ids;

/**
 * Return the id of the selected project.
 *
 * @param {state} ProjectState
 */
export const getSelectedId = (state: ProjectState) => state.selectedProjectId;

/**
 * Return order search query.
 *
 * @param state OrderState
 */
export const getSearchQuery = (state: ProjectState) => state.search;

/**
 * Return the specific project selected.
 *
 * @type {Reselect.Selector}
 */
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

/**
 * Get all projects.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return the project entity with the provided id.
 *
 * @param state ProjectState
 * @param projectId number Project Id to be returned
 */
export const getProjectById = (state: ProjectState, projectId: number) => {
  return state.entities[projectId];
};
