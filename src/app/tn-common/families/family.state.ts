import { Family } from './family.model';

export interface FamilySearch {
  name: string;
  foundry: number[];
  designer: number[];
  visibility: number[];
  categories: number[];
}

export interface FamilyState {
  ids: number[];
  entities: { [id: number]: Family };
  selectedFamilyId: number | null;
  search: FamilySearch;
}

export const initialFamilyState: FamilyState = {
  ids: [],
  entities: {},
  selectedFamilyId: null,
  search: {
    name: '',
    foundry: [],
    designer: [],
    visibility: [],
    categories: [],
  },
};
