import { createSelector } from 'reselect';

import { DesignerState } from './designer.state';

/**
 * Returns all the designer entities selected.
 *
 * @param {state} DesignerState
 */
export const getEntities = (state: DesignerState) => state.entities;

/**
 * Returns all the ids of the selected designers.
 *
 * @param {state} DesignerState
 */
export const getIds = (state: DesignerState) => state.ids;

/**
 * Return the id of the selected designer.
 *
 * @param {state} DesignerState
 */
export const getSelectedId = (state: DesignerState) => state.selectedDesignerId;

/**
 * Return the specific designer selected.
 *
 * @type {Reselect.Selector}
 */
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

/**
 * Get all designers.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return the designer entity with specified name.
 *
 * @param {state} DesignerState
 * @param {designerId} number Designer Id to be returned
 */
export const getDesignerById = (state: DesignerState, designerId: number) => {
  return state.entities[designerId];
};

/**
 * Return designer with specified name.
 *
 * @param {state} DesignerState
 * @param {name} string - designer name
 */
export const getDesignerByName = (state: DesignerState, name: string) => {
  const designerId = state.ids.find((id) => state.entities[id].name === name);
  return state.entities[designerId];
};

/**
 * Return designer with specified slug.
 *
 * @param {state} DesignerState
 * @param {slug} string - designer slug
 */
export const getDesignerBySlug = (state: DesignerState, slug: string) => {
  const designerId = state.ids.find((id) => state.entities[id].slug === slug);
  return state.entities[designerId];
};

/**
 * Return all designers that contain description text.
 *
 * @param {state} DesignerState
 * @param {description} string
 */
export const getDesignersByDescription = (state: DesignerState, description: string) => {
  return state.ids.reduce((result, id) => {
    const descriptionTest = new RegExp(description, 'i');
    const designer = state.entities[id];
    if (descriptionTest.test(designer.description)) {
      result.push(designer);
    }
    return result;
  }, []);
};

/**
 * Return all designers with matching birth date.
 *
 * @param {state} DesignerState
 * @param {birthDate} Date
 */
export const getDesignersByBirth = (state: DesignerState, birthDate: Date) => {
  return state.ids.reduce((result, id) => {
    const designer = state.entities[id];
    if (new Date(designer.birth_date).getTime() === birthDate.getTime()) {
      result.push(designer);
    }
    return result;
  }, []);
};

/**
 * Return all designers with matching death date.
 *
 * @param {state} DesignerState
 * @param {deathDate} Date
 */
export const getDesignersByDeath = (state: DesignerState, deathDate: Date) => {
  return state.ids.reduce((result, id) => {
    const designer = state.entities[id];
    if (new Date(designer.death_date).getTime() === deathDate.getTime()) {
      result.push(designer);
    }
    return result;
  }, []);
};

/**
 * Return all designers with foundry.
 *
 * @param {state} DesignerState
 * @param {foundry} number
 */
export const getDesignersByFoundry = (state: DesignerState, foundry: number) => {
  return state.ids.reduce((result, id) => {
    const designer = state.entities[id];
    if (designer.foundry.indexOf(foundry) !== -1) {
      result.push(designer);
    }
    return result;
  }, []);
};

/**
 * Return all designers with specified title.
 *
 * @param {state} DesignerState
 * @param {title} number
 */
export const getDesignersByTitle = (state: DesignerState, title: number) => {
  return state.ids.reduce((result, id) => {
    const designer = state.entities[id];
    if (designer.title.indexOf(title) !== -1) {
      result.push(designer);
    }
    return result;
  }, []);
};
