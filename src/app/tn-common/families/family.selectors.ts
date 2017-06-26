import { createSelector } from 'reselect';

import { FamilyState } from './family.state';

/**
 * Returns all the family entities selected.
 *
 * @param {state} FamilyState
 */
export const getEntities = (state: FamilyState) => state.entities;

/**
 * Returns all the ids of the selected families.
 *
 * @param {state} FamilyState
 */
export const getIds = (state: FamilyState) => state.ids;

/**
 * Return the id of the selected family.
 *
 * @param {state} FamilyState
 */
export const getSelectedId = (state: FamilyState) => state.selectedFamilyId;

/**
 * Return the specific family selected.
 *
 * @type {Reselect.Selector}
 */
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

/**
 * Return family search query.
 *
 * @param {state} FamilyState
 */
export const getSearchQuery = (state: FamilyState) => state.search;
/**
 * Get all families.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return the family entity with the provided id.
 *
 * @param {state} FamilyState
 * @param {familyId} number - Family Id to be returned
 */
export const getFamilyById = (state: FamilyState, familyId: number) => {
  return state.entities[familyId];
};

/**
 * Return the family entity with the provided name.
 *
 * @param {state} FamilyState
 * @param {name} string - Family name to be returned
 */
export const getFamilyByName = (state: FamilyState, name: string) => {
  const familyId = state.ids.find((id) => state.entities[id].name === name);
  return state.entities[familyId];
};

/**
 * Return all the families with the provided category.
 *
 * @param {state} FamilyState
 * @param {category} number
 */
export const getFamiliesByCategory = (state: FamilyState, category: number) => {
  return state.ids.reduce((families, id) => {
    const family = state.entities[id];
    if (family.category.indexOf(category) !== -1) {
      families.push(family);
    }
    return families;
  }, []);
};

/**
 * Return all the families with the provided designer.
 *
 * @param {state} FamilyState
 * @param {designer} number
 */
export const getFamiliesByDesigner = (state: FamilyState, designer: number) => {
  return state.ids.reduce((families, id) => {
    const family = state.entities[id];

    if ((family.designer as number[]).indexOf(designer) !== -1) {
      families.push(family);
    }
    return families;
  }, []);
};

/**
 * Return all the families with the provided foundry.
 *
 * @param {state} FamilyState
 * @param {foundry} number
 */
export const getFamiliesByFoundry = (state: FamilyState, foundry: number) => {
  return state.ids.reduce((families, id) => {
    const family = state.entities[id];

    if ((family.foundry as number[]).indexOf(foundry) !== -1) {
      families.push(family);
    }
    return families;
  }, []);
};

/**
 * Return all the families with the provided posture.
 *
 * @param {state} FamilyState
 * @param {posture} number
 */
export const getFamiliesByPosture = (state: FamilyState, posture: number) => {
  return state.ids.reduce((families, id) => {
    const family = state.entities[id];

    if (family.posture.indexOf(posture) !== -1) {
      families.push(family);
    }
    return families;
  }, []);
};

/**
 * Return all the families with the provided recommended function.
 *
 * @param {state} FamilyState
 * @param {recommendedFunction} number
 */
export const getFamiliesByRecommendedFunction = (state: FamilyState, recommendedFunction: number) => {
  return state.ids.reduce((families, id) => {
    const family = state.entities[id];

    if (family.recommended_function.indexOf(recommendedFunction) !== -1) {
      families.push(family);
    }
    return families;
  }, []);
};

/**
 * Return all the families with the provided recommended size.
 *
 * @param {state} FamilyState
 * @param {recommendedSize} number
 */
export const getFamiliesByRecommendedSize = (state: FamilyState, recommendedSize: number) => {
  return state.ids.reduce((families, id) => {
    const family = state.entities[id];

    if (family.recommended_size.indexOf(recommendedSize) !== -1) {
      families.push(family);
    }
    return families;
  }, []);
};

/**
 * Return all the families with the provided posture.
 *
 * @param {state} FamilyState
 * @param {width} number
 */
export const getFamiliesByWidth = (state: FamilyState, width: number) => {
  return state.ids.reduce((families, id) => {
    const family = state.entities[id];

    if (family.width.indexOf(width) !== -1) {
      families.push(family);
    }
    return families;
  }, []);
};

/**
 * Return all the families with the provided weight.
 *
 * @param {state} FamilyState
 * @param {weight} number
 */
export const getFamiliesByWeight = (state: FamilyState, weight: number) => {
  return state.ids.reduce((families, id) => {
    const family = state.entities[id];

    if (family.weight.indexOf(weight) !== -1) {
      families.push(family);
    }
    return families;
  }, []);
};

/**
 * Return all the families with the provided release date.
 *
 * @param {state} FamilyState
 * @param {release} Date
 */
export const getFamiliesByRelease = (state: FamilyState, release: Date) => {
  return state.ids.reduce((families, id) => {
    const family = state.entities[id];

    if (new Date(family.released).getTime() === release.getTime()) {
      families.push(family);
    }
    return families;
  }, []);
};

/**
 * Return all the families with the specified visiblity.
 *
 * @param {state} FamilyState
 * @param {visiblity} number
 */
export const getFamiliesByVisibility = (state: FamilyState, visiblity: number) => {
  return state.ids.reduce((families, id) => {
    const family = state.entities[id];

    if (family.visible === visiblity) {
      families.push(family);
    }
    return families;
  }, []);
};
