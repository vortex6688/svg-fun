import { Series } from './series.model';

export interface SeriesSearch {
  name: string;
  foundry: number;
}

export interface SeriesState {
  ids: number[];
  entities: { [id: number]: Series };
  selectedSeriesId: number | null;
  search: SeriesSearch;
}

export const initialSeriesState: SeriesState = {
  ids: [],
  entities: {},
  selectedSeriesId: null,
  search: {
    name: '',
    foundry: null,
  },
};
