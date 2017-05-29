import { Series } from './series.model';

export interface SeriesSearch {
  name: string;
  visibility: boolean;
  released: Date;
  families: number[];
  designers: number[];
  foundry: number;
}

export interface SeriesState {
  ids: number[];
  entities: { [id: number]: Series };
  selectedSeriesId: number | null;
  search: {
    ids: number[],
    active: boolean,
    query: SeriesSearch,
  };
}

export const initialSeriesState: SeriesState = {
  ids: [],
  entities: {},
  selectedSeriesId: null,
  search: {
    ids: [],
    active: false,
    query: {
      name: '',
      visibility: null,
      released: null,
      families: [],
      designers: [],
      foundry: null,
    },
  }
};
