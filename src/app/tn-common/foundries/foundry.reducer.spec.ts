import {
  inject,
  async,
} from '@angular/core/testing';

import { Foundry } from './foundry.model';
import { FoundryReducer } from './foundry.reducer';
import { FoundryActions } from './foundry.actions';
import { FoundryState, initialFoundryState } from './foundry.state';
import {
  getEntities,
  getIds,
  getSelectedId,
  getSelected,
  getAll,
  getFoundryById,
  getFoundryByName,
  getFoundryBySlug,
  getFoundriesByDesigner,
  getDefaultEulaFoundries,
  getFoundriesByEeSubdomain,
  getFoundriesBySiteUrl,
 } from './foundry.selectors';

const foundryMock: Foundry = {
  id: 1,
  name: 'da real foundrier',
  slug: 'da-real-foundrier',
  logo: 'logo string',
  site_url: '',
  url: 'foundry url',
  bio: 'foundry bio',
  designers: [1, 2],
  ee_subdomain: 'eyeyeo',
  eula: 'eula contract',
  eula_title: 'realest contract',
  eula_subtitle: 'subbed eula',
  eula_web: 'eula for web',
  eula_epub: 'eula for epub',
  eula_app: 'eula for app',
  eula_desktop: 'eula for desktop',
  eula_web_self_hosted: 'eula for webeula_web_self_hosted',
  preface: '',
  postface: 'eula postface',
  eula_default: true,
};

const addItems: Foundry[] = [
  {
    ...foundryMock,
    id: 2,
    name: 'any',
    slug: 'any',
    ee_subdomain: 'bup',
    designers: [2, 3],
    site_url: 'empty',
    eula_default: false,
  },
  {
    ...foundryMock,
    id: 3,
    name: 'test',
    slug: 'test',
    ee_subdomain: 'nana',
    site_url: 'waeva',
    designers: [5]
  },
];
const addedData = {
  ids: addItems.map((item) => item.id),
  entities: addItems.reduce((result, item) => ({ ... result, [item.id]: item }), {}),
};
const nonEmptyState: FoundryState = {
  ...addedData,
  selectedFoundryId: null,
};

describe('FoundryReducer', () => {
  const mockedState = (results = []): FoundryState => (initialFoundryState);

  const foundryActions = new FoundryActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = FoundryReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should GET_FOUNDRIES when there is no Foundry on the state', () => {
    const state = mockedState();
    const actual = FoundryReducer(state, foundryActions.getFoundries());
    const expected = {
      ids: [],
      entities: {},
      selectedFoundryId: null,
    };
    expect(actual).toEqual(expected);
  });

  it('should be able to CREATE_FOUNDRY_SUCCESS', () => {
    const state = mockedState();
    const actual = FoundryReducer(state, foundryActions.createFoundrySuccess(foundryMock));
    const expected = {
      ids: [...state.ids, ...[foundryMock.id]],
      entities: Object.assign({}, state.entities, { [foundryMock.id]: foundryMock }),
      selectedFoundryId: foundryMock.id,
    };
    expect(actual).toEqual(expected);
  });

  it('should be NOT add a foundry on CREATE_FOUNDRY_FAIL', () => {
    const state = mockedState();
    const actual = FoundryReducer(state, foundryActions.createFoundryFail(foundryMock));
    expect(actual).toEqual(state);
  });

  it('should add items on LOAD_FOUNDRIES_SUCCESS', () => {
    const state = mockedState();
    const actual = FoundryReducer(state, foundryActions.loadFoundriesSuccess(addItems));
    const expected: FoundryState = nonEmptyState;
    expect(actual).toEqual(expected, 'Didn\'t add items');
  });

  describe('when a Foundry already exists in the state', () => {
    const state = mockedState();
    let addedState = initialFoundryState;

    beforeEach(() => {
      addedState = FoundryReducer(state, foundryActions.loadFoundriesSuccess([...addItems, foundryMock]));
    });

    it('should GET_FOUNDRIES when there already exists a Foundry on the state', () => {
      const actual = FoundryReducer(addedState, foundryActions.getFoundries());
      const expected = addedState;
      expect(actual).toEqual(expected);
    });

    it('should GET_FOUNDRY will return the selected Foundry', () => {
      const actual = FoundryReducer(addedState, foundryActions.getFoundry(foundryMock));
      const expected = {
        ids: [foundryMock.id],
        entities: { [foundryMock.id]: foundryMock },
        selectedFoundryId: foundryMock.id,
      };
      expect(actual).toEqual(expected);
    });

    it('should update the given foundry on UPDATE_FOUNDRY', () => {
      const updatedFoundry = { ...foundryMock, visible: 12, base_price: '21.12' };
      const actual = FoundryReducer(addedState, foundryActions.updateFoundrySuccess(updatedFoundry));
      const expected = {
        ...addedState,
        entities: { ...addedState.entities,  [updatedFoundry.id]: updatedFoundry },
        selectedFoundryId: updatedFoundry.id,
      };
      expect(actual).toEqual(expected);
    });

    it('should NOT update the given foundry on UPDATE_FOUNDRY_FAIL', () => {
      const updatedFoundry = { ...foundryMock, visible: 12, base_price: '21.12' };
      const actual = FoundryReducer(addedState, foundryActions.updateFoundryFail(updatedFoundry));
      expect(actual).toEqual(addedState);
    });

    it('should remove the given foundry on REMOVE_FOUNDRY_SUCCESS', () => {
      const actual = FoundryReducer(addedState, foundryActions.removeFoundrySuccess(foundryMock));
      delete addedState.entities[foundryMock.id];
      const expected = {
        ...addedState,
        ids: addedState.ids.filter((id) => id !== foundryMock.id),
      };
      expect(actual).toEqual(expected);
    });

    it('should NOT remove the given foundry on REMOVE_FOUNDRY_FAIL', () => {
      const actual = FoundryReducer(addedState, foundryActions.removeFoundryFail(foundryMock));
      expect(actual).toEqual(addedState);
    });

    it('getEntities should return all the entities of a FoundryState', () => {
      const entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of a FoundryState', () => {
      const ids = getIds(addedState);
      expect(ids).toEqual(addedState.ids);
    });

    it('getSelectedId should return the id of the selected FoundryState', () => {
      const selectedFoundryId = getSelectedId(addedState);
      expect(selectedFoundryId).toEqual(addedState.selectedFoundryId);
    });

    it('getSelected should return the entity of the selected FoundryState', () => {
      const selectedFoundry = getSelected(addedState);
      const selected = addedState.entities[addedState.selectedFoundryId];
      expect(selectedFoundry).toEqual(selected);
    });

    it('getAll should return all the entities of the FoundryState', () => {
      const selectedFoundry = getAll(addedState);
      const selected = addedState.ids.map((id) => addedState.entities[id]);
      expect(selectedFoundry).toEqual(selected);
    });

    it('getFoundryById should return a specific Foundry with the id provided', () => {
      const selectedFoundry = getFoundryById(addedState, foundryMock.id);
      expect(selectedFoundry).toEqual(foundryMock);
    });

    it('getFoundryByName should return a specific Foundry with the provided name', () => {
      let selectedFoundry = getFoundryByName(addedState, foundryMock.name);
      expect(selectedFoundry).toEqual(foundryMock);
      selectedFoundry = getFoundryByName(addedState, 'NaN');
      expect(selectedFoundry).toEqual(undefined);
    });

    it('getFoundryBySlug should return a specific Foundry with the provided slug', () => {
      const selectedFoundries = getFoundryBySlug(addedState, foundryMock.slug);
      expect(selectedFoundries).toEqual(foundryMock);
    });

    it('getFoundriesByDesigner should return all foundries with the provided designer', () => {
      const testDesigner = 2;
      let selectedFoundries = getFoundriesByDesigner(addedState, 1111);
      expect(selectedFoundries).toEqual([]);
      selectedFoundries = getFoundriesByDesigner(addedState, testDesigner);
      const expected = addedState.ids.map((id) => addedState.entities[id])
      .filter((foundry) => foundry.designers.indexOf(testDesigner) !== -1);
      expect(selectedFoundries).toEqual(expected);
    });

    it('getFoundriesByEeSubdomain should return all foundries with the provided ee subdomain', () => {
      let selectedFoundries = getFoundriesByEeSubdomain(addedState, 'nanexisant');
      expect(selectedFoundries).toEqual([]);
      selectedFoundries = getFoundriesByEeSubdomain(addedState, foundryMock.ee_subdomain);
      expect(selectedFoundries).toEqual([foundryMock]);
    });

    it('getFoundriesBySiteUrl should return all foundries with the provided site url', () => {
      let selectedFoundries = getFoundriesBySiteUrl(addedState, 'empty url');
      expect(selectedFoundries).toEqual([]);
      selectedFoundries = getFoundriesBySiteUrl(addedState, foundryMock.site_url);
      expect(selectedFoundries).toEqual([foundryMock]);
    });

    it('getDefaultEulaFoundries should return all foundries with default eulas', () => {
      const selectedFoundries = getDefaultEulaFoundries(addedState);
      const expected = addedState.ids.map((id) => addedState.entities[id])
        .filter((foundry) => foundry.eula_default);
      expect(selectedFoundries).toEqual(expected);
    });
  });
});
