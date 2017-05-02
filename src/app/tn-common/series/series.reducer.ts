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

    case SeriesActions.PLACE_SERIES: {
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
        loading: true,
        query: action.payload,
      };

      return { ...state, search };
    }

    case SeriesActions.SEARCH_COMPLETE: {
      const series: Series[] = action.payload;
      const { newSeriesEntities, newIds } = series.reduce((result, singleSeries) => {
        if (state.entities[singleSeries.id]) {
          return result;
        }
        result.newSeriesEntities[singleSeries.id] = singleSeries;
        result.newIds.push(singleSeries.id);
        return result;
      }, { newSeriesEntities: {}, newIds: [] });

      return {
        ids: [ ...state.ids, ...newIds ],
        entities: Object.assign({}, state.entities, newSeriesEntities),
        selectedSeriesId: state.selectedSeriesId,
        search: {
          ids: newIds,
          loading: false,
          query: state.search.query,
        },
      };
    }

    default: {
      return state;
    }
  }
};
