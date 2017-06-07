import { ActionReducer, Action } from '@ngrx/store';

import { Style } from './style.model';
import { StyleState, initialStyleState } from './style.state';
import { StyleActions } from './style.actions';

export const StyleReducer: ActionReducer<StyleState> = (state = initialStyleState, action: Action) => {
  switch (action.type) {
    case StyleActions.GET_STYLES:
      return { ...state, selectedStyleId: null };

    case StyleActions.GET_STYLE: {
      const style: Style = action.payload;

      return {
        ids: [ style.id ],
        entities: {
          [style.id]: style
        },
        selectedStyleId: style.id,
        search: state.search,
      };
    }

    case StyleActions.CREATE_STYLE_SUCCESS: {
      const style: Style = action.payload;

      return {
        ids: [ ...state.ids, style.id ],
        entities: Object.assign({}, state.entities, {
          [style.id]: style
        }),
        selectedStyleId: style.id,
        search: state.search,
      };
    }

    case StyleActions.UPDATE_STYLE_SUCCESS: {
      const style: Style = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [style.id]: style
        }),
        selectedStyleId: style.id,
        search: state.search,
      };
    }

    case StyleActions.REMOVE_STYLE_SUCCESS: {
      const style: Style = action.payload;
      delete state.entities[style.id];

      return {
        ids: state.ids.filter((id) => id !== style.id),
        entities: Object.assign({}, state.entities),
        selectedStyleId: null,
        search: state.search,
      };
    }

    case StyleActions.SEARCH_QUERY: {
      const search = action.payload;

      return { ...state, search };
    }

    case StyleActions.LOAD_STYLES_SUCCESS: {
      const styles: Style[] = action.payload;
      const { styleEntities, styleIds } = styles.reduce((result, style) => {
        result.styleEntities[style.id] = style;
        result.styleIds.push(style.id);
        return result;
      }, { styleEntities: {}, styleIds: [] });

      return {
        ...state,
        ids: styleIds,
        entities: styleEntities,
      };
    }

    case StyleActions.CREATE_STYLE_FAIL:
    case StyleActions.UPDATE_STYLE_FAIL:
    case StyleActions.REMOVE_STYLE_FAIL:
    case StyleActions.LOAD_STYLES_FAIL:
    default: {
      return state;
    }
  }
};
