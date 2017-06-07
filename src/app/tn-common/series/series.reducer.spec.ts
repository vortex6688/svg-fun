import { Series } from './series.model';
import { SeriesReducer } from './series.reducer';
import { SeriesActions } from './series.actions';
import { SeriesState, initialSeriesState, SeriesSearch } from './series.state';
import {
  getEntities,
  getIds,
  getFoundIds,
  getSelectedId,
  getAllFound,
  getSelected,
  getAll,
  getSeriesById,
  getSeriesByDesigner,
  getSeriesByFoundry,
  getSeriesByName,
  getSeriesByFamily,
} from './series.selectors';

const SeriesMock: Series = {
  id: 1,
  name: 'Lorem Ipsum',
  slug: 'lorem-ipsum',
  released: '2017-02-01T18:25:11Z',
  family: [
    1,
    2,
  ],
  designers: [
    1
  ],
  visible: true,
  foundry: 1,
  description: 'Lorem ipsum',
  description_link: ['https://store.typenetwork.com'],
  pangram: ['Lorem ipsum'],
  specimen_text: 'Lorem ipsum'
};
const addItems: Series[] = [
  { ...SeriesMock, id: 11, name: 'Lorem Ipsum' },
  { ...SeriesMock, id: 1, name: 'Test Name' },
  { ...SeriesMock, id: 2, name: 'Second Name' },
  { ...SeriesMock, id: 23456, name: 'TN Lorem' },
];
const addedData = {
  ids: addItems.map((item) => item.id),
  entities: addItems.reduce((result, item) => ({ ... result, [item.id]: item }), {}),
};
const searchItems: Series[] = [
  { ...SeriesMock, id: 11 },
  { ...SeriesMock, id: 23456 },
];
const searchState: SeriesState = {
  ...addedData,
  selectedSeriesId: null,
  search: {
    ids: searchItems.map((item) => item.id),
    active: false,
    query: initialSeriesState.search.query,
  }
};
const nonEmptyState: SeriesState = {
  ...addedData,
  selectedSeriesId: null,
  search: {
    ids: [],
    active: false,
    query: initialSeriesState.search.query,
  }
};

describe('SeriesReducer', () => {
  const mockedState = (results = []): SeriesState => (initialSeriesState);

  const seriesActions = new SeriesActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = SeriesReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should CREATE_SERIES_SUCCESS add a new series', () => {
    const state = mockedState();
    const actual = SeriesReducer(state, seriesActions.createSeriesSuccess(SeriesMock));
    const expected = {
      ids: [...state.ids, ...[SeriesMock.id]],
      entities: Object.assign({}, state.entities, { [SeriesMock.id]: SeriesMock }),
      selectedSeriesId: SeriesMock.id,
      search: state.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should UPDATE_SERIES_SUCCESS add a new series', () => {
    SeriesMock.slug = 'test';
    const state = mockedState();
    const actual = SeriesReducer(state, seriesActions.updateSeriesSuccess(SeriesMock));
    const expected = {
      ids: [...state.ids],
      entities: { [SeriesMock.id]: SeriesMock },
      selectedSeriesId: SeriesMock.id,
      search: state.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should NOT update the given series on UPDATE_SERIES_FAIL', () => {
    SeriesMock.slug = 'test';
    const state = mockedState();
    const actual = SeriesReducer(state, seriesActions.updateSeriesFail(SeriesMock));
    expect(actual).toEqual(state);
  });

  it('should REMOVE_SERIES_SUCCESS remove a series', () => {
    const state = mockedState();
    const actual = SeriesReducer(state, seriesActions.removeSeriesSuccess(SeriesMock));
    delete state.entities[SeriesMock.id];
    const expected = {
      ids: state.ids.filter((id) => id !== SeriesMock.id),
      entities: Object.assign({}, state.entities),
      selectedSeriesId: null,
      search: initialSeriesState.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should NOT remove the given series on REMOVE_SERIES_FAIL', () => {
    const state = mockedState();
    const actual = SeriesReducer(state, seriesActions.removeSeriesFail(SeriesMock));
    expect(actual).toEqual(state);
  });

  it('should LOAD_SERIES_SUCCESS add a new series', () => {
    const state = mockedState();
    const actual = SeriesReducer(state, seriesActions.loadSeriesSuccess(addItems));
    const expected: SeriesState = nonEmptyState;
    expect(actual).toEqual(expected, 'Didn\'t add new series');
  });

  it('should GET_ALL_SERIES when there is no Series on the state', () => {
    const state = mockedState();
    const actual = SeriesReducer(state, seriesActions.getAllSeries());
    const expected = {
      ids: [],
      entities: {},
      selectedSeriesId: null,
      search: initialSeriesState.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should update search object on SEARCH_QUERY', () => {
    const state = mockedState();
    const query = {
      name: 'Lorem',
      visibility: true,
      released: new Date(Date.now() - 50000),
      families: [4],
      designers: [2],
      foundry: 1,
    };
    const actual = SeriesReducer(state, seriesActions.searchQuery(query));
    const expected: SeriesState = {
      ...initialSeriesState,
      search: {
        ids: [],
        active: false,
        query,
      },
    };
    expect(actual).toEqual(expected, 'Didn\'t update search query correctly');

    const multiQuery: SeriesSearch = {
      name: '',
      released: null,
      foundry: null,
      designers: null,
      visibility: true,
      families: [1, 2],
    };
    const searchExpected: SeriesState = {
      ...nonEmptyState,
      search: {
        ids: nonEmptyState.ids.filter((id) => {
          const series = nonEmptyState.entities[id];
          return (
            multiQuery.visibility === series.visible &&
            series.family.some((family) => multiQuery.families.indexOf(family) !== -1)
          );
        }),
        active: false,
        query: multiQuery,
      }
    };
    const multiSearch = SeriesReducer(nonEmptyState, seriesActions.searchQuery(multiQuery));
    expect(multiSearch).toEqual(searchExpected, 'Should have an active visibility and family search');

    const targetName = 'SupaName';
    const nameQuery: SeriesSearch = {
      name: targetName,
      released: null,
      foundry: null,
      designers: null,
      visibility: null,
      families: [],
    };
    const nameExpected: SeriesState = {
      ...nonEmptyState,
      search: {
        ids: nonEmptyState.ids.filter((id) => nonEmptyState.entities[id].name === targetName),
        active: true,
        query: nameQuery,
      }
    };
    const nameSearch = SeriesReducer(nonEmptyState, seriesActions.searchQuery(nameQuery));
    expect(nameSearch).toEqual(nameExpected, 'Should have results by name');

    const foundryDesignerQuery: SeriesSearch = {
      name: '',
      released: null,
      foundry: 5,
      designers: [2],
      visibility: null,
      families: [],
    };
    const foundryDesignerExpected: SeriesState = {
      ...nonEmptyState,
      search: {
        ids: nonEmptyState.ids.filter((id) => {
          const series = nonEmptyState.entities[id];
          return (
            foundryDesignerQuery.foundry === series.foundry &&
            series.designers.some((designer) => multiQuery.designers.indexOf(designer) !== -1)
          );
        }),
        active: true,
        query: foundryDesignerQuery,
      }
    };
    const foundryDesignerSearch = SeriesReducer(nonEmptyState, seriesActions.searchQuery(foundryDesignerQuery));
    expect(foundryDesignerSearch).toEqual(foundryDesignerExpected, 'Should have an active foundry and designer search');

  });

  describe('when a Series already exists in the state', () => {
    const state = mockedState();
    let addedState = initialSeriesState;

    beforeEach(() => {
      addedState = SeriesReducer(state, seriesActions.createSeriesSuccess(SeriesMock));
    });

    it('should GET_ALL_SERIES when there already exists a Series on the state', () => {
      const actual = SeriesReducer(addedState, seriesActions.getAllSeries());
      const expected = {
        ids: [...state.ids, ...[SeriesMock.id]],
        entities: Object.assign({}, state.entities, { [SeriesMock.id]: SeriesMock }),
        selectedSeriesId: null,
        search: initialSeriesState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('should GET_SERIES will return the selected Series', () => {
      const actual = SeriesReducer(addedState, seriesActions.getSeries(SeriesMock));
      const expected = {
        ids: [SeriesMock.id],
        entities: { [SeriesMock.id]: SeriesMock },
        selectedSeriesId: SeriesMock.id,
        search: initialSeriesState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('getEntities should return all the entities of a SeriesState', () => {
      const entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of a SeriesState', () => {
      const ids = getIds(addedState);
      expect(ids).toEqual(addedState.ids);
    });

    it('getSelectedId should return the id of the selected SeriesState', () => {
      const selectedSeriesId = getSelectedId(addedState);
      expect(selectedSeriesId).toEqual(addedState.selectedSeriesId);
    });

    it('getSelected should return the entity of the selected SeriesState', () => {
      const selectedSeries = getSelected(addedState);
      const selected = addedState.entities[addedState.selectedSeriesId];
      expect(selectedSeries).toEqual(selected);
    });

    it('getAll should return all the entities of the SeriesState', () => {
      const selectedSeries = getAll(addedState);
      const selected = addedState.ids.map((id) => addedState.entities[id]);
      expect(selectedSeries).toEqual(selected);
    });

    it('getSeriesById should return an specific Series with the id provided', () => {
      const selectedSeries = getSeriesById(addedState, SeriesMock.id);
      expect(selectedSeries).toEqual(SeriesMock);
    });

    it('getFoundIds should return only ids contained in search', () => {
      const foundIds = getFoundIds(addedState);
      expect(foundIds).toEqual([], 'Found ids should be empty');

      const actualFoundIds = getFoundIds(searchState);
      expect(actualFoundIds).toEqual(searchState.search.ids, 'Missing ids');
    });

    it('getAllFound should return only items from search ids', () => {
      const foundItems = getAllFound(addedState);
      expect(foundItems).toEqual([], 'No searched items present');

      const actualFoundItems = getAllFound(searchState);
      const expectedItems = searchState.search.ids.map((id) => searchState.entities[id]);
      expect(actualFoundItems).toEqual(expectedItems, 'Missing search items');
    });

    it('getSeriesByDesigner should return a list of series with the provided designer', () => {
      const selectedSeries = getSeriesByDesigner(addedState, SeriesMock.designers[0]);
      expect(selectedSeries).toEqual([SeriesMock]);
    });

    it('getSeriesByFoundry should return a list of series with the provided foundry', () => {
      const selectedSeries = getSeriesByFoundry(addedState, SeriesMock.foundry);
      expect(selectedSeries).toEqual([SeriesMock]);
    });

    it('getSeriesByName should return a list of series with the provided name', () => {
      const selectedSeries = getSeriesByName(addedState, SeriesMock.name);
      expect(selectedSeries).toEqual(SeriesMock);
    });

    it('getSeriesByFamily should return a list of series with the provided family', () => {
      const selectedSeries = getSeriesByFamily(addedState, SeriesMock.family[0]);
      expect(selectedSeries).toEqual([SeriesMock]);
    });
  });
});
