import { Style } from './style.model';

export interface StyleSearch {
  name: string;
  foundry: number;
  designer: number;
  visible: number[];
  categories: number[];
}

export interface StyleState {
  ids: number[];
  entities: { [id: number]: Style };
  selectedStyleId: number | null;
  search: StyleSearch;
}

export const initialStyleState: StyleState = {
  ids: [],
  entities: {},
  selectedStyleId: null,
  search: {
    name: '',
    foundry: null,
    designer: null,
    visible: [],
    categories: [],
  },
};
