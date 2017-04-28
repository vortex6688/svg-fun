import { ActionReducer, Action } from '@ngrx/store';

import { License } from './license.model';
import { LicenseState, initialLicenseState } from './license.state';
import { LicenseActions } from './license.actions';

export const LicenseReducer: ActionReducer<LicenseState> = (state = initialLicenseState, action: Action) => {
  switch (action.type) {
    case LicenseActions.GET_LICENSES:
      return { ...state, selectedLicenseId: null };

    case LicenseActions.GET_LICENSE: {
      const license: License = action.payload;

      return {
        ids: [ license.id ],
        entities: {
          [license.id]: license
        },
        selectedLicenseId: license.id,
        search: state.search,
      };
    }

    case LicenseActions.ADD_LICENSE: {
      const license: License = action.payload;

      return {
        ids: [ ...state.ids, license.id ],
        entities: Object.assign({}, state.entities, {
          [license.id]: license
        }),
        selectedLicenseId: license.id,
        search: state.search,
      };
    }

    case LicenseActions.UPDATE_LICENSE: {
      const license: License = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [license.id]: license
        }),
        selectedLicenseId: license.id,
        search: state.search,
      };
    }

    case LicenseActions.REMOVE_LICENSE: {
      const license: License = action.payload;

      return {
        ids: state.ids.filter((id) => id !== license.id),
        entities: Object.assign({}, state.entities, {
          [license.id]: null
        }),
        selectedLicenseId: null,
        search: state.search,
      };
    }

    case LicenseActions.SEARCH_QUERY: {
      const search = {
        ids: [],
        loading: true,
        query: action.payload,
      };

      return { ...state, search };
    }

    case LicenseActions.SEARCH_COMPLETE: {
      const licenses: License[] = action.payload;
      const { newLicenseEntities, newIds } = licenses.reduce((result, license) => {
        if (state.entities[license.id]) {
          return result;
        }
        result.newLicenseEntities[license.id] = license;
        result.newIds.push(license.id);
        return result;
      }, { newLicenseEntities: {}, newIds: [] });

      return {
        ids: [ ...state.ids, ...newIds ],
        entities: Object.assign({}, state.entities, newLicenseEntities),
        selectedLicenseId: state.selectedLicenseId,
        search: {
          ids: newIds,
          loading: false,
          query: state.search.query,
        },
      };
    }

    default: {
      return state;
    }
  }
};
