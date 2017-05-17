import { Series } from './series.model';

export interface SeriesSearch {
  id: string | number;
  name: string;
  visible: boolean;
  released: Date;
  families: number[];
  styles: number[];
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
      id: '',
      name: '',
      visible: null,
      released: null,
      families: [],
      styles: [],
    },
  }
};
