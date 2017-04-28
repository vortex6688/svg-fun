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
  getLicencesByType,
  getActiveLicences,
  getFreeTrialLicences,
  getPerpetualLicences,
  getNotPerpetualLicences,
  getHostedLicences,
  getSelfHostedLicences
 } from './license.selectors';

let licenseMock: License = {
  id: 123,
  order: 1,
  price: "22.0000",
  price_paid: "22.0000",
  qty: 2,
  start: null,
  end: null,
  style: 286,
  years: 1,
  active: true,
  license_type: "app",
  self_hosted: false
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

  describe('when a License already exists in the state', () => {
    const state = mockedState();
    let addedState = initialLicenseState;

    beforeEach(() => {
      addedState = LicenseReducer(state, licenseActions.addLicense(licenseMock));
    });

    it('should GET_LICENSES when there already exists a License on the state', () => {
      const actual = LicenseReducer(addedState, licenseActions.getLicenses());
      const expected = {
        ids: [...state.ids, ...[licenseMock.id]],
        entities: Object.assign({}, state.entities, { [licenseMock.id]: licenseMock }),
        selectedLicenseId: null,
        search: initialLicenseState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('should GET_LICENSE will return the selected License', () => {
      const actual = LicenseReducer(addedState, licenseActions.getLicense(licenseMock));
      const expected = {
        ids: [licenseMock.id],
        entities: { [licenseMock.id]: licenseMock },
        selectedLicenseId: licenseMock.id,
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
      let selectedLicense = getLicenseById(addedState, licenseMock.id);
      expect(selectedLicense).toEqual(licenseMock);
    });

    it('getLicencesByType should return all the existent Licenses with the type provided', () => {
      let selectedLicenses = getLicencesByType(addedState, ['app']);
      expect(selectedLicenses).toEqual([licenseMock]);
      selectedLicenses = getLicencesByType(addedState, ['server']);
      expect(selectedLicenses).toEqual([]);
    });

    it('getLicencesByType should return all the existent Licenses with the type provided', () => {
      let selectedLicenses = getActiveLicences(addedState);
      expect(selectedLicenses).toEqual([licenseMock]);
      licenseMock.active = false;
      selectedLicenses = getActiveLicences(addedState);
      expect(selectedLicenses).toEqual([]);
      licenseMock.active = true;
    });

    it('getFreeTrialLicences should return all the free trial licenses', () => {
      let selectedLicenses = getFreeTrialLicences(addedState);
      expect(selectedLicenses).toEqual([]);
      licenseMock.years = -2;
      selectedLicenses = getFreeTrialLicences(addedState);
      expect(selectedLicenses).toEqual([licenseMock]);
    });

    it('getPerpetualLicences should return all the perpetual licenses', () => {
      let selectedLicenses = getPerpetualLicences(addedState);
      expect(selectedLicenses).toEqual([]);
      licenseMock.years = -1;
      selectedLicenses = getPerpetualLicences(addedState);
      expect(selectedLicenses).toEqual([licenseMock]);
    });

    it('getNotPerpetualLicences should return all the NOT perpetual licenses', () => {
      let selectedLicenses = getNotPerpetualLicences(addedState);
      expect(selectedLicenses).toEqual([]);
      licenseMock.years = 1;
      selectedLicenses = getNotPerpetualLicences(addedState);
      expect(selectedLicenses).toEqual([licenseMock]);
    });

    it('getHostedLicenses should return all the hosted licenses', () => {
      let selectedLicenses = getHostedLicences(addedState);
      expect(selectedLicenses).toEqual([licenseMock]);
      licenseMock.self_hosted = true;
      selectedLicenses = getHostedLicences(addedState);
      expect(selectedLicenses).toEqual([]);
    });

    it('getSelfHostedLicenses should return all the self-hosted licenses', () => {
      let selectedLicenses = getSelfHostedLicences(addedState);
      expect(selectedLicenses).toEqual([licenseMock]);
      licenseMock.self_hosted = false;
      selectedLicenses = getSelfHostedLicences(addedState);
      expect(selectedLicenses).toEqual([]);
    });
  });
});
