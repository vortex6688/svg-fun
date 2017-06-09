import { Project } from './project.model';

export interface ProjectSearch {
  name: string;
  domains: string;
}

export interface ProjectState {
  ids: number[];
  entities: { [id: number]: Project };
  selectedProjectId: number | null;
  search: ProjectSearch;
}

export const initialProjectState: ProjectState = {
  ids: [],
  entities: {},
  selectedProjectId: null,
  search: {
    name: '',
    domains: '[]',
  },
};
