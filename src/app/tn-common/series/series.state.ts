import { Series } from './series.model';

export interface SeriesState {
  ids: number[];
  entities: { [id: number]: Series };
  selectedSeriesId: number | null;
  search: {
    ids: number[],
    loading: boolean,
    query: {
      id: string | number,
      family: number,
      name: string,
      released: Date,
    },
  };
}

export const initialSeriesState: SeriesState = {
  ids: [],
  entities: {},
  selectedSeriesId: null,
  search: {
    ids: [],
    loading: false,
    query: {
      id: '',
      family: null,
      name: null,
      released: null,
    },
  }
};
