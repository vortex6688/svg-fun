import { ActionReducer, Action } from '@ngrx/store';

import { Foundry } from './foundry.model';
import { FoundryState, initialFoundryState } from './foundry.state';
import { FoundryActions } from './foundry.actions';

export const FoundryReducer: ActionReducer<FoundryState> = (state = initialFoundryState, action: Action) => {
  switch (action.type) {
    case FoundryActions.GET_FOUNDRIES:
      return { ...state, selectedFoundryId: null };

    case FoundryActions.GET_FOUNDRY: {
      const foundry: Foundry = action.payload;

      return {
        ids: [ foundry.id ],
        entities: {
          [foundry.id]: foundry
        },
        selectedFoundryId: foundry.id,
      };
    }

    case FoundryActions.CREATE_FOUNDRY_SUCCESS: {
      const foundry: Foundry = action.payload;

      return {
        ids: [ ...state.ids, foundry.id ],
        entities: Object.assign({}, state.entities, {
          [foundry.id]: foundry
        }),
        selectedFoundryId: foundry.id,
      };
    }

    case FoundryActions.UPDATE_FOUNDRY_SUCCESS: {
      const foundry: Foundry = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [foundry.id]: foundry
        }),
        selectedFoundryId: foundry.id,
      };
    }

    case FoundryActions.REMOVE_FOUNDRY_SUCCESS: {
      const foundry: Foundry = action.payload;
      delete state.entities[foundry.id];

      return {
        ids: state.ids.filter((id) => id !== foundry.id),
        entities: Object.assign({}, state.entities),
        selectedFoundryId: null,
      };
    }

    case FoundryActions.LOAD_FOUNDRIES_SUCCESS: {
      const foundries: Foundry[] = action.payload;
      const { foundryEntities, foundryIds } = foundries.reduce((result, foundry) => {
        result.foundryEntities[foundry.id] = foundry;
        result.foundryIds.push(foundry.id);
        return result;
      }, { foundryEntities: {}, foundryIds: [] });

      return {
        ...state,
        ids: foundryIds,
        entities: foundryEntities,
      };
    }

    case FoundryActions.CREATE_FOUNDRY_FAIL:
    case FoundryActions.UPDATE_FOUNDRY_FAIL:
    case FoundryActions.REMOVE_FOUNDRY_FAIL:
    case FoundryActions.LOAD_FOUNDRIES_FAIL:
    default: {
      return state;
    }
  }
};
