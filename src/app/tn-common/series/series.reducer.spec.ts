import { Series } from './series.model';
import { SeriesReducer } from './series.reducer';
import { SeriesActions } from './series.actions';
import { SeriesState, initialSeriesState } from './series.state';
import {
  getEntities,
  getIds,
  getFoundIds,
  getSelectedId,
  getLoading,
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
const searchItems: Series[] = [
  { ...SeriesMock, id: 11 },
  { ... SeriesMock, id: 23456 },
];
const searchState: SeriesState = {
  ids: searchItems.map((item) => item.id),
  entities: searchItems.reduce((result, item) => ({ ...result, [item.id]: item }), {}),
  selectedSeriesId: null,
  search: {
    ids: searchItems.map((item) => item.id),
    loading: false,
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

  it('should ADD_SERIES add a new series', () => {
    const state = mockedState();
    const actual = SeriesReducer(state, seriesActions.addSeries(SeriesMock));
    const expected = {
      ids: [...state.ids, ...[SeriesMock.id]],
      entities: Object.assign({}, state.entities, { [SeriesMock.id]: SeriesMock }),
      selectedSeriesId: SeriesMock.id,
      search: state.search,
    };
    expect(actual).toEqual(expected);
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
        loading: true,
        query,
      },
    };
    expect(actual).toEqual(expected, 'Didn\'t update search query correctly');
  });

  it('should add search results on SEARCH_COMPLETE', () => {
    const state = mockedState();
    state.search.loading = true;
    const actual = SeriesReducer(state, seriesActions.searchComplete(searchItems));
    const expected: SeriesState = searchState;
    expect(actual).toEqual(expected, 'Didn\'t add search items');
  });

  describe('when an Series already exists in the state', () => {
    const state = mockedState();
    let addedState = initialSeriesState;

    beforeEach(() => {
      addedState = SeriesReducer(state, seriesActions.addSeries(SeriesMock));

    });

    it('should GET_ALL_SERIES when there already exists an Series on the state', () => {
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

    it('getEntities should return all the entities of an SeriesState', () => {
      const entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of an SeriesState', () => {
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

    it('getSeriesById should return an especific Series with the id provided', () => {
      const selectedSeries = getSeriesById(addedState, SeriesMock.id);
      expect(selectedSeries).toEqual(SeriesMock);
    });

    it('getLoading should return loading flag', () => {
      const noSearchLoading = getLoading(addedState);
      expect(noSearchLoading).toEqual(true, 'Loading flag should be false');

      const searchLoading = getLoading({
        ...addedState,
        search: {
          ids: [],
          loading: true,
          query: initialSeriesState.search.query,
        }
      });
      expect(noSearchLoading).toEqual(true, 'Loading flag should be true');
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
