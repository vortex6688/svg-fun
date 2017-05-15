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

    case LicenseActions.CREATE_LICENSE_SUCCESS: {
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

    case LicenseActions.UPDATE_LICENSE_SUCCESS: {
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

    case LicenseActions.REMOVE_LICENSE_SUCCESS: {
      const license: License = action.payload;
      delete state.entities[license.id];

      return {
        ids: state.ids.filter((id) => id !== license.id),
        entities: Object.assign({}, state.entities),
        selectedLicenseId: null,
        search: state.search,
      };
    }

    case LicenseActions.CREATE_LICENSE_FAIL:
    case LicenseActions.UPDATE_LICENSE_FAIL:
    case LicenseActions.REMOVE_LICENSE_FAIL: {
      return state;
    }

    case LicenseActions.SEARCH_QUERY: {
      const search = {
        ids: [],
        active: true,
        query: action.payload,
      };

      return { ...state, search };
    }

    case LicenseActions.ADD_LICENSES: {
      const licenses: License[] = action.payload;
      const { licenseEntities, licenseIds } = licenses.reduce((result, license) => {
        result.licenseEntities[license.id] = license;
        result.licenseIds.push(license.id);
        return result;
      }, { licenseEntities: {}, licenseIds: [] });

      return {
        ...state,
        ids: licenseIds,
        entities: licenseEntities,
      };
    }

    default: {
      return state;
    }
  }
};
