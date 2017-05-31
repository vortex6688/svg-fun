import { ActionReducer, Action } from '@ngrx/store';

import { Family } from './family.model';
import { FamilyState, initialFamilyState } from './family.state';
import { FamilyActions } from './family.actions';

export const FamilyReducer: ActionReducer<FamilyState> = (state = initialFamilyState, action: Action) => {
  switch (action.type) {
    case FamilyActions.GET_FAMILIES:
      return { ...state, selectedFamilyId: null };

    case FamilyActions.GET_FAMILY: {
      const family: Family = action.payload;

      return {
        ids: [ family.id ],
        entities: {
          [family.id]: family
        },
        selectedFamilyId: family.id,
        search: state.search,
      };
    }

    case FamilyActions.CREATE_FAMILY_SUCCESS: {
      const family: Family = action.payload;

      return {
        ids: [ ...state.ids, family.id ],
        entities: Object.assign({}, state.entities, {
          [family.id]: family
        }),
        selectedFamilyId: family.id,
        search: state.search,
      };
    }

    case FamilyActions.UPDATE_FAMILY_SUCCESS: {
      const family: Family = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [family.id]: family
        }),
        selectedFamilyId: family.id,
        search: state.search,
      };
    }

    case FamilyActions.REMOVE_FAMILY_SUCCESS: {
      const family: Family = action.payload;
      delete state.entities[family.id];

      return {
        ids: state.ids.filter((id) => id !== family.id),
        entities: Object.assign({}, state.entities),
        selectedFamilyId: null,
        search: state.search,
      };
    }

    case FamilyActions.CREATE_FAMILY_FAIL:
    case FamilyActions.UPDATE_FAMILY_FAIL:
    case FamilyActions.REMOVE_FAMILY_FAIL: {
      return state;
    }

    case FamilyActions.SEARCH_QUERY: {
      const query = action.payload;
      const ids = state.ids.filter((id) => {
        const family = state.entities[id];
        if (query.name && family.name !== query.name) {
          return false;
        }
        if (query.foundry && family.foundry.indexOf(query.foundry) === -1) {
          return false;
        }
        if (query.designer && family.designer.indexOf(query.designer) === -1) {
          return false;
        }
        if (query.visibility.length && !query.visibility.includes(family.visible)) {
          return false;
        }
        if (
          query.categories.length &&
          !family.category.some((category) => query.categories.includes(category))
        ) {
          return false;
        }
        return true;
      });
      // If search didn't filter out any data consider it inactive
      const active = state.ids.length !== ids.length;
      const search = {
        ids,
        active,
        query,
      };

      return { ...state, search };
    }

    case FamilyActions.ADD_FAMILIES: {
      const families: Family[] = action.payload;
      const { familyEntities, familyIds } = families.reduce((result, family) => {
        result.familyEntities[family.id] = family;
        result.familyIds.push(family.id);
        return result;
      }, { familyEntities: {}, familyIds: [] });

      return {
        ...state,
        ids: familyIds,
        entities: familyEntities,
      };
    }

    default: {
      return state;
    }
  }
};
