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

    case SeriesActions.CREATE_SERIES: {
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

    case SeriesActions.SEARCH_QUERY: {
      const search = {
        ids: [],
        active: true,
        query: action.payload,
      };

      return { ...state, search };
    }

    case SeriesActions.ADD_SERIES: {
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

    default: {
      return state;
    }
  }
};
