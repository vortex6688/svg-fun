import { ActionReducer, Action } from '@ngrx/store';

import { Series } from './series.model';
import { SeriesState, initialSeriesState } from './series.state';
import { SeriesActions } from './series.actions';

export const SeriesReducer: ActionReducer<SeriesState> = (state = initialSeriesState,
                                                          action: Action) => {
  switch (action.type) {
    case SeriesActions.GET_ALL_SERIES:
      return { ...state, selectedSeriesId: null };

    case SeriesActions.GET_SERIES: {
      const series: Series = action.payload;

      return {
        ids: [ series.id ],
        entities: {
          [series.id]: series
        },
        selectedSeriesId: series.id,
        search: state.search,
      };
    }

    case SeriesActions.CREATE_SERIES_SUCCESS: {
      const series: Series = action.payload;

      return {
        ids: [ ...state.ids, series.id ],
        entities: Object.assign({}, state.entities, {
          [series.id]: series
        }),
        selectedSeriesId: series.id,
        search: state.search,
      };
    }

    case SeriesActions.UPDATE_SERIES_SUCCESS: {
      const series: Series = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [series.id]: series
        }),
        selectedSeriesId: series.id,
        search: state.search,
      };
    }

    case SeriesActions.REMOVE_SERIES_SUCCESS: {
      const series: Series = action.payload;
      delete state.entities[series.id];

      return {
        ids: state.ids.filter((id) => id !== series.id),
        entities: Object.assign({}, state.entities),
        selectedSeriesId: null,
        search: state.search,
      };
    }

    case SeriesActions.SEARCH_QUERY: {
      const search = action.payload;

      return { ...state, search };
    }

    case SeriesActions.LOAD_SERIES_SUCCESS: {
      const series: Series[] = action.payload;
      const { seriesEntities, seriesIds } = series.reduce((result, singleSeries) => {
        result.seriesEntities[singleSeries.id] = singleSeries;
        result.seriesIds.push(singleSeries.id);
        return result;
      }, { seriesEntities: {}, seriesIds: [] });

      return {
        ...state,
        ids: seriesIds,
        entities: seriesEntities,
      };
    }

    case SeriesActions.CREATE_SERIES_FAIL:
    case SeriesActions.UPDATE_SERIES_FAIL:
    case SeriesActions.REMOVE_SERIES_FAIL:
    case SeriesActions.LOAD_SERIES_FAIL:
    default: {
      return state;
    }
  }
};
