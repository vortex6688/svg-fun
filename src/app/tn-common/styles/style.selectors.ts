import { createSelector } from 'reselect';

import { StyleState } from './style.state';

/**
 * Returns all the style entities selected.
 *
 * @param {state} StyleState
 */
export const getEntities = (state: StyleState) => state.entities;

/**
 * Returns all the ids of the selected styles.
 *
 * @param {state} StyleState
 */
export const getIds = (state: StyleState) => state.ids;

/**
 * Return the id of the selected style.
 *
 * @param {state} StyleState
 */
export const getSelectedId = (state: StyleState) => state.selectedStyleId;

/**
 * Return the specific style selected.
 *
 * @type {Reselect.Selector}
 */
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

/**
 * Return order search query.
 *
 * @param {state} StyleState
 */
export const getSearchQuery = (state: StyleState) => state.search;

/**
 * Get all styles.
 *
 * @type {Reselect.Selector}
 */
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

/**
 * Return the style entity with the provided name.
 *
 * @param state StyleState
 * @param styleId number Style Id to be returned
 */
export const getStyleById = (state: StyleState, styleId: number) => {
  return state.entities[styleId];
};

/**
 * Return all styles with the provided name.
 *
 * @param {state} StyleState
 * @param {name} string - style name
 */
export const getStylesByName = (state: StyleState, name: string) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.style_name === name) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all default styles.
 *
 * @param {state} StyleState
 */
export const getDefaultStyles = (state: StyleState) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.default_style) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified foundry id.
 *
 * @param {state} StyleState
 * @param {foundryId} number
 */
export const getStylesByFoundry = (state: StyleState, foundryId: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if ((style.foundry as number[]).indexOf(foundryId) !== -1) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified designer id.
 *
 * @param {state} StyleState
 * @param {designerId} number
 */
export const getStylesByDesigner = (state: StyleState, designerId: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if ((style.designer as number[]).indexOf(designerId) !== -1) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified posture.
 *
 * @param {state} StyleState
 * @param {posture} number
 */
export const getStylesByPosture = (state: StyleState, posture: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.posture === posture) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified visibility.
 *
 * @param {state} StyleState
 * @param {visibility} number
 */
export const getStylesByVisibility = (state: StyleState, visibility: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.visible === visibility) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified optical.
 *
 * @param {state} StyleState
 * @param {optical} number
 */
export const getStylesByOptical = (state: StyleState, optical: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.optical === optical) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified grade.
 *
 * @param {state} StyleState
 * @param {grade} number
 */
export const getStylesByGrade = (state: StyleState, grade: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.grade === grade) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified weight.
 *
 * @param {state} StyleState
 * @param {weight} number
 */
export const getStylesByWeight = (state: StyleState, weight: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.weight === weight) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified width.
 *
 * @param {state} StyleState
 * @param {width} number
 */
export const getStylesByWidth = (state: StyleState, width: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.width === width) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified tn weight.
 *
 * @param {state} StyleState
 * @param {tnWeight} number
 */
export const getStylesByTnWeight = (state: StyleState, tnWeight: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.tn_weight === tnWeight) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified tn width.
 *
 * @param {state} StyleState
 * @param {tnWidth} number
 */
export const getStylesByTnWidth = (state: StyleState, tnWidth: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.tn_width === tnWidth) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified min recommended size.
 *
 * @param {state} StyleState
 * @param {minSize} number
 */
export const getStylesByMinRecommendedSize = (state: StyleState, minSize: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.min_recommended_size === minSize) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified max recommended size.
 *
 * @param {state} StyleState
 * @param {maxSize} number
 */
export const getStylesByMaxRecommendedSize = (state: StyleState, maxSize: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.max_recommended_size === maxSize) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all styles with specified recommended function.
 *
 * @param {state} StyleState
 * @param {func} number
 */
export const getStylesByRecommendedFunction = (state: StyleState, func: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.recommended_function.indexOf(func) !== -1) {
      result.push(style);
    }
    return result;
  }, []);
};
/**
 * Return all styles with specified recommended size.
 *
 * @param {state} StyleState
 * @param {size} number
 */
export const getStylesByRecommendedSize = (state: StyleState, size: number) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.recommended_size.indexOf(size) !== -1) {
      result.push(style);
    }
    return result;
  }, []);
};

/**
 * Return all RE styles.
 *
 * @param {state} StyleState
 * @param {maxSize} number
 */
export const getReStyles = (state: StyleState) => {
  return state.ids.reduce((result, id) => {
    const style = state.entities[id];
    if (style.isRE) {
      result.push(style);
    }
    return result;
  }, []);
};
