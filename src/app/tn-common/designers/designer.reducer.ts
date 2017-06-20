import { ActionReducer, Action } from '@ngrx/store';

import { Designer } from './designer.model';
import { DesignerState, initialDesignerState } from './designer.state';
import { DesignerActions } from './designer.actions';

export const DesignerReducer: ActionReducer<DesignerState> = (state = initialDesignerState, action: Action) => {
  switch (action.type) {
    case DesignerActions.GET_DESIGNERS:
      return { ...state, selectedDesignerId: null };

    case DesignerActions.GET_DESIGNER: {
      const designer: Designer = action.payload;

      return {
        ids: [ designer.id ],
        entities: {
          [designer.id]: designer
        },
        selectedDesignerId: designer.id,
      };
    }

    case DesignerActions.CREATE_DESIGNER_SUCCESS: {
      const designer: Designer = action.payload;

      return {
        ids: [ ...state.ids, designer.id ],
        entities: Object.assign({}, state.entities, {
          [designer.id]: designer
        }),
        selectedDesignerId: designer.id,
      };
    }

    case DesignerActions.UPDATE_DESIGNER_SUCCESS: {
      const designer: Designer = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [designer.id]: designer
        }),
        selectedDesignerId: designer.id,
      };
    }

    case DesignerActions.REMOVE_DESIGNER_SUCCESS: {
      const designer: Designer = action.payload;
      delete state.entities[designer.id];

      return {
        ids: state.ids.filter((id) => id !== designer.id),
        entities: Object.assign({}, state.entities),
        selectedDesignerId: null,
      };
    }

    case DesignerActions.LOAD_DESIGNERS_SUCCESS: {
      const designers: Designer[] = action.payload;
      const { designerEntities, designerIds } = designers.reduce((result, designer) => {
        result.designerEntities[designer.id] = designer;
        result.designerIds.push(designer.id);
        return result;
      }, { designerEntities: {}, designerIds: [] });

      return {
        ...state,
        ids: designerIds,
        entities: designerEntities,
      };
    }

    case DesignerActions.CREATE_DESIGNER_FAIL:
    case DesignerActions.UPDATE_DESIGNER_FAIL:
    case DesignerActions.REMOVE_DESIGNER_FAIL:
    case DesignerActions.LOAD_DESIGNERS_FAIL:
    default: {
      return state;
    }
  }
};
