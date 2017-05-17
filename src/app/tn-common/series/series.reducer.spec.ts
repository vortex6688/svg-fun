import { Series } from './series.model';
import { SeriesReducer } from './series.reducer';
import { SeriesActions } from './series.actions';
import { SeriesState, initialSeriesState } from './series.state';
import {
  getEntities,
  getIds,
  getFoundIds,
  getSelectedId,
  getAllFound,
  getSelected,
  getAll,
  getSeriesById,
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
  foundry: 1,
  description: 'Lorem ipsum',
  description_link: ['https://store.typenetwork.com']
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

  it('should CREATE_SERIES add a new series', () => {
    const state = mockedState();
    const actual = SeriesReducer(state, seriesActions.createSeries(SeriesMock));
    const expected = {
      ids: [...state.ids, ...[SeriesMock.id]],
      entities: Object.assign({}, state.entities, { [SeriesMock.id]: SeriesMock }),
      selectedSeriesId: SeriesMock.id,
      search: state.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should ADD_SERIES add a new series', () => {
    const state = mockedState();
    const actual = SeriesReducer(state, seriesActions.addSeries(addItems));
    const expected: SeriesState = nonEmptyState;
    expect(actual).toEqual(expected, 'Didn\'t add new orders');
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
      id: '2',
      name: 'Lorem',
      visible: true,
      released: new Date(Date.now() - 50000),
      families: [4],
      styles: [2],
    };
    const actual = SeriesReducer(state, seriesActions.searchQuery(query));
    const expected: SeriesState = {
      ...initialSeriesState,
      search: {
        ids: [],
        active: true,
        query,
      },
    };
    expect(actual).toEqual(expected, 'Didn\'t update search query correctly');
  });

  describe('when a Series already exists in the state', () => {
    const state = mockedState();
    let addedState = initialSeriesState;

    beforeEach(() => {
      addedState = SeriesReducer(state, seriesActions.createSeries(SeriesMock));
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
  });
});
