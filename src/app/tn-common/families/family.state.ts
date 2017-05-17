import { Family } from './family.model';

export interface FamilySearch {
  name: string;
  foundry: number;
  designer: number;
  visibility: number[];
  categories: number[];
}

export interface FamilyState {
  ids: number[];
  entities: { [id: number]: Family };
  selectedFamilyId: number | null;
  search: {
    ids: number[],
    active: boolean,
    query: FamilySearch
  };
}

export const initialFamilyState: FamilyState = {
  ids: [],
  entities: {},
  selectedFamilyId: null,
  search: {
    ids: [],
    active: false,
    query: {
      name: '',
      foundry: null,
      designer: null,
      visibility: [],
      categories: [],
    },
  },
};
