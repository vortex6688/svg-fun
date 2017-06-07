import { Style } from './style.model';

export interface StyleSearch {
  style_name: string;
  foundry: number;
  designer: number;
  visible: number[];
  posture: number[];
  optical: number[];
  width: number[];
  weight: number[];
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
    style_name: '',
    foundry: null,
    designer: null,
    visible: [],
    posture: [],
    optical: [],
    width: [],
    weight: [],
  },
};
