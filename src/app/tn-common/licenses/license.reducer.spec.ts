import {
  inject,
  async,
} from '@angular/core/testing';

import { License } from './license.model';
import { LicenseReducer } from './license.reducer';
import { LicenseActions } from './license.actions';
import { LicenseState, initialLicenseState } from './license.state';
import {
  getEntities,
  getIds,
  getSelectedId,
  getSelected,
  getAll,
  getLicenseById,
 } from './license.selectors';

let LicenseMock: License = {
  id: 123,
  order: 1,
  price: "22.0000",
  price_paid: "22.0000",
  qty: 2,
  start: null,
  end: null,
  style: 286,
  years: null,
  active: true,
  license_type: "app"
};

describe('LicenseReducer', () => {
  const mockedState = (results = []): LicenseState => (initialLicenseState);

  const licenseActions = new LicenseActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = LicenseReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should GET_LICENSES when there is no License on the state', () => {
    const state = mockedState();
    const actual = LicenseReducer(state, licenseActions.getLicenses());
    const expected = {
      ids: [],
      entities: {},
      selectedLicenseId: null,
      search: initialLicenseState.search,
    };
    expect(actual).toEqual(expected);
  });

  xdescribe('when a License already exists in the state', () => {
    const state = mockedState();
    let addedState = initialLicenseState;

    //beforeEach(() => {
    //  addedState = LicenseReducer(state, licenseActions.placeLicense(LicenseMock));
    //});

    it('should GET_ORDERS when there already exists a License on the state', () => {
      const actual = LicenseReducer(addedState, licenseActions.getLicenses());
      const expected = {
        ids: [...state.ids, ...[LicenseMock.id]],
        entities: Object.assign({}, state.entities, { [LicenseMock.id]: LicenseMock }),
        selectedLicenseId: null,
        search: initialLicenseState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('should GET_ORDER will return the selected License', () => {
      const actual = LicenseReducer(addedState, licenseActions.getLicense(LicenseMock));
      const expected = {
        ids: [LicenseMock.id],
        entities: { [LicenseMock.id]: LicenseMock },
        selectedLicenseId: LicenseMock.id,
        search: initialLicenseState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('getEntities should return all the entities of a LicenseState', () => {
      let entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of a LicenseState', () => {
      let ids = getIds(addedState);
      expect(ids).toEqual(addedState.ids);
    });

    it('getSelectedId should return the id of the selected LicenseState', () => {
      let selectedLicenseId = getSelectedId(addedState);
      expect(selectedLicenseId).toEqual(addedState.selectedLicenseId);
    });

    it('getSelected should return the entity of the selected LicenseState', () => {
      let selectedLicense = getSelected(addedState);
      let selected = addedState.entities[addedState.selectedLicenseId];
      expect(selectedLicense).toEqual(selected);
    });

    it('getAll should return all the entities of the LicenseState', () => {
      let selectedLicense = getAll(addedState);
      let selected = addedState.ids.map((id) => addedState.entities[id]);
      expect(selectedLicense).toEqual(selected);
    });

    it('getLicenseById should return a specific License with the id provided', () => {
      let selectedLicense = getLicenseById(addedState, LicenseMock.id);
      expect(selectedLicense).toEqual(LicenseMock);
    });

  });
});
