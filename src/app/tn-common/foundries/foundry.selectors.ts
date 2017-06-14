import { createSelector } from 'reselect';

import { FoundryState } from './foundry.state';

/**
 * Returns all the foundry entities selected.
 *
 * @param {state} FoundryState
 */
export const getEntities = (state: FoundryState) => state.entities;

/**
 * Returns all the ids of the selected foundries.
 *
 * @param {state} FoundryState
 */
export const getIds = (state: FoundryState) => state.ids;

/**
 * Return the id of the selected foundry.
 *
 * @param {state} FoundryState
 */
export const getSelectedId = (state: FoundryState) => state.selectedFoundryId;

/**
 * Return the specific foundry selected.
 *
 * @type {Reselect.Selector}
 */
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

/**
 * Get all foundries.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return the foundry entity with specified name.
 *
 * @param {state} FoundryState
 * @param {foundryId} number Foundry Id to be returned
 */
export const getFoundryById = (state: FoundryState, foundryId: number) => {
  return state.entities[foundryId];
};

/**
 * Return foundry with specified name.
 *
 * @param {state} FoundryState
 * @param {name} string - foundry name
 */
export const getFoundryByName = (state: FoundryState, name: string) => {
  const foundryId = state.ids.find((id) => state.entities[id].name === name);
  return state.entities[foundryId];
};

/**
 * Return foundry with specified slug.
 *
 * @param {state} FoundryState
 * @param {slug} string - foundry slug
 */
export const getFoundryBySlug = (state: FoundryState, slug: string) => {
  const foundryId = state.ids.find((id) => state.entities[id].slug === slug);
  return state.entities[foundryId];
};

/**
 * Return all foundries with specified site URL.
 *
 * @param {state} FoundryState
 * @param {siteUrl} string
 */
export const getFoundriesBySiteUrl = (state: FoundryState, siteUrl: string) => {
  return state.ids.reduce((result, id) => {
    const foundry = state.entities[id];
    if (foundry.site_url === siteUrl) {
      result.push(foundry);
    }
    return result;
  }, []);
};

/**
 * Return all foundries with specified designer.
 *
 * @param {state} FoundryState
 * @param {designer} number
 */
export const getFoundriesByDesigner = (state: FoundryState, designer: number) => {
  return state.ids.reduce((result, id) => {
    const foundry = state.entities[id];
    if (foundry.designers.indexOf(designer) !== -1) {
      result.push(foundry);
    }
    return result;
  }, []);
};

/**
 * Return all foundries with specified ee subdomain.
 *
 * @param {state} FoundryState
 * @param {eeSubdomain} string
 */
export const getFoundriesByEeSubdomain = (state: FoundryState, eeSubdomain: string) => {
  return state.ids.reduce((result, id) => {
    const foundry = state.entities[id];
    if (foundry.ee_subdomain === eeSubdomain) {
      result.push(foundry);
    }
    return result;
  }, []);
};

/**
 * Return all foundries that have default eulas.
 *
 * @param {state} FoundryState
 */
export const getDefaultEulaFoundries = (state: FoundryState) => {
  return state.ids.reduce((result, id) => {
    const foundry = state.entities[id];
    if (foundry.eula_default) {
      result.push(foundry);
    }
    return result;
  }, []);
};
