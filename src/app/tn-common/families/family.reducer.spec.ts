import {
  inject,
  async,
} from '@angular/core/testing';

import { Family } from './family.model';
import { FamilyReducer } from './family.reducer';
import { FamilyActions } from './family.actions';
import { FamilyState, FamilySearch, initialFamilyState } from './family.state';
import {
getEntities,
  getIds,
  getFoundIds,
  getSelectedId,
  getSelected,
  getAll,
  getAllFound,
  getFamilyById,
  getFamilyByName,
  getFamiliesByDesigner,
  getFamiliesByCategory,
  getFamiliesByFoundry,
  getFamiliesByPosture,
  getFamiliesByRecommendedFunction,
  getFamiliesByRecommendedSize,
  getFamiliesByRelease,
  getFamiliesByVisibility,
  getFamiliesByWeight,
  getFamiliesByWidth,
} from './family.selectors';

const FamilyMock: Family = {
  id: 123,
  name: 'Mock family',
  slug: 'mock-family',
  description: '2 real 2 describe',
  descripion_link: [{
    text: 'link text',
    url: 'link url',
  }],
  more: 'don\'t hurt me',
  category: [ 1, 2 ],
  mood: [ 3, 4 ],
  designer: [ 5, 6 ],
  foundry: [ 7, 8 ],
  posture: [ 9, 10 ],
  recommended_function: [ 11, 12 ],
  recommended_size: [ 13, 14 ],
  width: [ 15, 16 ],
  weight: [ 17, 18 ],
  tn_width: [ 19, 20 ],
  tn_weight: [ 21, 22 ],
  released: '2017-01-01',
  style: [ 23, 24 ],
  default_style: 111,
  link_only_styles: [ 25, 26 ],
  canonical: 234,
  canonical_series: 234,
  series: [ 27, 28 ],
  visible: 2,
};
const familyDate = Date.now();
const addItems: Family[] = [{
    ...FamilyMock,
    name: 'SupaName',
    id: 11,
    visible: 1,
    category: [3, 2],
    foundry: [2],
    designer: [5],
    resulted: new Date(familyDate).toString()
  }, {
    ...FamilyMock,
    id: 1,
    visible: 2,
    category: [1],
    foundry: [7],
    designer: [5, 6],
    resulted: new Date(familyDate - 5000).toString()
  }, {
    ...FamilyMock,
    id: 2,
    visible: 0,
    categry: [2, 3],
    foundry: [6, 7],
    designer: [9],
    resulted: new Date(familyDate).toString()
  }, {
    ...FamilyMock,
    id: 23456,
    visible: 2,
    category: [2],
    designer: [6],
    foundry: [8],
    resulted: new Date(familyDate + 5000).toString()
  },
];
const addedData = {
  ids: addItems.map((item) => item.id),
  entities: addItems.reduce((result, item) => ({ ... result, [item.id]: item }), {}),
};
const nonEmptyState: FamilyState = {
  ...addedData,
  selectedFamilyId: null,
  search: {
    ids: [],
    active: false,
    query: initialFamilyState.search.query,
  }
};

describe('FamilyReducer', () => {
  const mockedState = (results = []): FamilyState => (initialFamilyState);

  const familyActions = new FamilyActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = FamilyReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should CREATE_FAMILY_SUCCESS create a new family', () => {
    const state = mockedState();
    const actual = FamilyReducer(state, familyActions.createFamilySuccess(FamilyMock));
    const expected = {
      ids: [...state.ids, ...[FamilyMock.id]],
      entities: Object.assign({}, state.entities, { [FamilyMock.id]: FamilyMock }),
      selectedFamilyId: FamilyMock.id,
      search: state.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should return state on CREATE_FAMILY_FAIL', () => {
    const state = mockedState();
    const createdItem = { ...FamilyMock, id: 23456 };
    const actual = FamilyReducer(state, familyActions.updateFamilyFail(createdItem));
    expect(actual).toEqual(state);
  });

  it('should GET_FAMILIES when there is no Family on the state', () => {
    const state = mockedState();
    const actual = FamilyReducer(state, familyActions.getFamilies());
    const expected = {
      ids: [],
      entities: {},
      selectedFamilyId: null,
      search: initialFamilyState.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should update search object on SEARCH_QUERY', () => {
    const state = mockedState();
    const query: FamilySearch = {
      name: 'fam fam',
      foundry: 1,
      designer: 2,
      visibility: [1, 2],
      categories: [2, 3],
    };
    const actual = FamilyReducer(state, familyActions.searchQuery(query));
    const expected: FamilyState = {
      ...initialFamilyState,
      search: {
        ids: [],
        active: false,
        query,
      },
    };
    expect(actual).toEqual(expected, 'Didn\'t update search query correctly');

    const multiQuery: FamilySearch = {
      name: '',
      foundry: null,
      designer: null,
      visibility: [1, 2],
      categories: [2, 3],
    };
    const searchExpected: FamilyState = {
      ...nonEmptyState,
      search: {
        ids: nonEmptyState.ids.filter((id) => {
          const family = nonEmptyState.entities[id];
          return (
            multiQuery.visibility.indexOf(family.visible) !== -1 &&
            family.category.some((category) => multiQuery.categories.indexOf(category) !== -1)
          );
        }),
        active: true,
        query: multiQuery,
      }
    };
    const multiSearch = FamilyReducer(nonEmptyState, familyActions.searchQuery(multiQuery));
    expect(multiSearch).toEqual(searchExpected, 'Should have an active visibility and category search');

    const targetName = 'SupaName';
    const nameQuery: FamilySearch = {
      name: targetName,
      foundry: null,
      designer: null,
      visibility: [],
      categories: [],
    };
    const nameExpected: FamilyState = {
      ...nonEmptyState,
      search: {
        ids: nonEmptyState.ids.filter((id) => nonEmptyState.entities[id].name === targetName),
        active: true,
        query: nameQuery,
      }
    };
    const nameSearch = FamilyReducer(nonEmptyState, familyActions.searchQuery(nameQuery));
    expect(nameSearch).toEqual(nameExpected, 'Should have results by name');

    const foundryDesignerQuery: FamilySearch = {
      name: '',
      foundry: 5,
      designer: 2,
      visibility: [],
      categories: [],
    };
    const foundryDesignerExpected: FamilyState = {
      ...nonEmptyState,
      search: {
        ids: nonEmptyState.ids.filter((id) => {
          const family = nonEmptyState.entities[id];
          return (
            family.foundry.indexOf(foundryDesignerQuery.foundry) !== -1 &&
            family.designer.indexOf(foundryDesignerQuery.designer) !== -1
          );
        }),
        active: true,
        query: foundryDesignerQuery,
      }
    };
    const foundryDesignerSearch = FamilyReducer(nonEmptyState, familyActions.searchQuery(foundryDesignerQuery));
    expect(foundryDesignerSearch).toEqual(foundryDesignerExpected, 'Should have an active foundry and designer search');
  });

  it('should add families on ADD_FAMILIES', () => {
    const state = mockedState();
    const actual = FamilyReducer(state, familyActions.addFamilies(addItems));
    const expected: FamilyState = nonEmptyState;
    expect(actual).toEqual(expected, 'Didn\'t add new families');
  });

  describe('when a Family already exists in the state', () => {
    const state = mockedState();
    let addedState = initialFamilyState;

    beforeEach(() => {
      addedState = FamilyReducer(state, familyActions.addFamilies([FamilyMock]));
    });

    it('should update family on UPDATE_FAMILY_SUCCESS', () => {
      const updatedItem = {
        ...FamilyMock,
        name: 'updated name',
        description: 'new description',
      };
      const actual = FamilyReducer(addedState, familyActions.updateFamilySuccess(updatedItem));
      const expected: FamilyState = {
        ...addedState,
        selectedFamilyId: updatedItem.id,
      };
      expected.entities[FamilyMock.id] = updatedItem;
      expect(actual).toEqual(expected, 'Didn\'t update family');
    });

    it('should return state on UPDATE_FAMILY_FAIL', () => {
      const updatedItem = { ...FamilyMock, name: 'not updated' };
      const actual = FamilyReducer(addedState, familyActions.updateFamilyFail(updatedItem));
      expect(actual).toEqual(addedState);
    });

    it('should remove family on REMOVE_FAMILY_SUCCESS', () => {
      const removedItem = FamilyMock;
      const actual = FamilyReducer(addedState, familyActions.removeFamilySuccess(removedItem));
      const expected: FamilyState = { ...addedState };
      expected.ids = expected.ids.filter((ids) => ids !== removedItem.id);
      delete expected.entities[removedItem.id];
      expect(actual).toEqual(expected, 'Didn\'t remove family');
    });

    it('should return state on REMOVE_FAMILY_FAIL', () => {
      const removedItem = { ...FamilyMock, name: 'not updated' };
      const actual = FamilyReducer(addedState, familyActions.removeFamilyFail(removedItem));
      expect(actual).toEqual(addedState);
    });

    it('should GET_FAMILIES when there already exists an Family on the state', () => {
      const actual = FamilyReducer(addedState, familyActions.getFamilies());
      const expected = {
        ids: [...state.ids, ...[FamilyMock.id]],
        entities: Object.assign({}, state.entities, { [FamilyMock.id]: FamilyMock }),
        selectedFamilyId: null,
        search: initialFamilyState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('should GET_FAMILY will return the selected Family', () => {
      const actual = FamilyReducer(addedState, familyActions.getFamily(FamilyMock));
      const expected = {
        ids: [FamilyMock.id],
        entities: { [FamilyMock.id]: FamilyMock },
        selectedFamilyId: FamilyMock.id,
        search: initialFamilyState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('getEntities should return all the entities of an FamilyState', () => {
      const entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of an FamilyState', () => {
      const ids = getIds(addedState);
      expect(ids).toEqual(addedState.ids);
    });

    it('getSelectedId should return the id of the selected FamilyState', () => {
      const selectedFamilyId = getSelectedId(addedState);
      expect(selectedFamilyId).toEqual(addedState.selectedFamilyId);
    });

    it('getSelected should return the entity of the selected FamilyState', () => {
      const selectedFamily = getSelected(addedState);
      const selected = addedState.entities[addedState.selectedFamilyId];
      expect(selectedFamily).toEqual(selected);
    });

    it('getAll should return all the entities of the FamilyState', () => {
      const selectedFamily = getAll(addedState);
      const selected = addedState.ids.map((id) => addedState.entities[id]);
      expect(selectedFamily).toEqual(selected);
    });

    it('getFoundIds should return search ids or all ids if search is inactive', () => {
      const foundIds = getFoundIds(addedState);
      const allIds = getIds(addedState);
      expect(foundIds).toEqual(allIds, 'Found ids should equal all ids on inactive search');

      const expectedIds = [1, 2, 3];
      const searchState = {
        ...addedState,
        search: {
          ids: expectedIds,
          active: true,
          query: addedState.search.query
        }
      };
      const actualFoundIds = getFoundIds(searchState);
      expect(actualFoundIds).toEqual(expectedIds, 'Missing ids');
    });

    it('getAllFound should return search results or all items if search is inactive', () => {
      const foundItems = getAllFound(addedState);
      const allItems = getAll(addedState);
      expect(foundItems).toEqual(allItems, 'Should return all items on non active search');

      const searchState = {
        ...addedState,
        search: {
          ids: [],
          active: true,
          query: addedState.search.query,
        }
      };
      const actualFoundItems = getAllFound(searchState);
      expect(actualFoundItems).toEqual([], 'Should be empty');
    });

    it('getFamilyById should return an especific Family with the id provided', () => {
      const selectedFamily = getFamilyById(addedState, FamilyMock.id);
      expect(selectedFamily).toEqual(FamilyMock);
    });

    it('getFamilyByName should return a specific Family with the provided name', () => {
      const selectedFamily = getFamilyByName(addedState, FamilyMock.name);
      expect(selectedFamily).toEqual(FamilyMock);
    });

    it('getFamiliesByCategory should return a list of families with the provided category', () => {
      const selectedFamilies = getFamiliesByCategory(addedState, FamilyMock.category[0]);
      expect(selectedFamilies).toEqual([FamilyMock]);
    });

    it('getFamiliesByDesigner should return a list of families with the provided designer', () => {
      const selectedFamilies = getFamiliesByDesigner(addedState, FamilyMock.designer[0]);
      expect(selectedFamilies).toEqual([FamilyMock]);
    });

    it('getFamiliesByFoundry should return a list of families with the provided foundry', () => {
      const selectedFamilies = getFamiliesByFoundry(addedState, FamilyMock.foundry[0]);
      expect(selectedFamilies).toEqual([FamilyMock]);
    });

    it('getFamiliesByPosture should return a list of families with the provided posture', () => {
      const selectedFamilies = getFamiliesByPosture(addedState, FamilyMock.posture[0]);
      expect(selectedFamilies).toEqual([FamilyMock]);
    });

    it('getFamiliesByRecommendedFunction should return list of families with the provided recommended function', () => {
      const selectedFamilies = getFamiliesByRecommendedFunction(addedState, FamilyMock.recommended_function[0]);
      expect(selectedFamilies).toEqual([FamilyMock]);
    });

    it('getFamiliesByRecommendedSize should return a list of families with the provided recommended size', () => {
      const selectedFamilies = getFamiliesByRecommendedSize(addedState, FamilyMock.recommended_size[0]);
      expect(selectedFamilies).toEqual([FamilyMock]);
    });

    it('getFamiliesByWidth should return a list of families with the provided width', () => {
      const selectedFamilies = getFamiliesByWidth(addedState, FamilyMock.width[0]);
      expect(selectedFamilies).toEqual([FamilyMock]);
    });

    it('getFamiliesByWeight should return a list of families with the provided width', () => {
      const selectedFamilies = getFamiliesByWeight(addedState, FamilyMock.weight[0]);
      expect(selectedFamilies).toEqual([FamilyMock]);
    });

    it('getFamiliesByRelease should return a list of families with the provided width', () => {
      const selectedFamilies = getFamiliesByRelease(addedState, new Date(FamilyMock.released));
      expect(selectedFamilies).toEqual([FamilyMock]);
    });

    it('getFamiliesByVisibility should return a list of families with the provided visibility', () => {
      const selectedFamilies = getFamiliesByVisibility(addedState, FamilyMock.visible);
      expect(selectedFamilies).toEqual([FamilyMock]);
    });
  });
});
