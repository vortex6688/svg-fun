import {
  inject,
  async,
} from '@angular/core/testing';

import { Project } from './project.model';
import { ProjectReducer } from './project.reducer';
import { ProjectActions } from './project.actions';
import { ProjectState, initialProjectState } from './project.state';
import {
  getEntities,
  getIds,
  getSelectedId,
  getSelected,
  getAll,
  getProjectById
 } from './project.selectors';

const projectMock: Project = {
  id: 123,
  name: 'Project 1',
  user: 1,
  domains: '["project1.com"]',
  created: '2017-03-05T18:16:50Z',
  licenses: [1],
  family_count: 1,
  style_count: 1,
};

const addItems: Project[] = [
  { ...projectMock, id: 11, order: 1, },
];
const addedData = {
  ids: addItems.map((item) => item.id),
  entities: addItems.reduce((result, item) => ({ ... result, [item.id]: item }), {}),
};
const nonEmptyState: ProjectState = {
  ...addedData,
  selectedProjectId: null,
  search: initialProjectState.search,
};

describe('ProjectReducer', () => {
  const mockedState = (results = []): ProjectState => (initialProjectState);

  const projectActions = new ProjectActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = ProjectReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should GET_PROJECTS when there is no Project on the state', () => {
    const state = mockedState();
    const actual = ProjectReducer(state, projectActions.getProjects());
    const expected = {
      ids: [],
      entities: {},
      selectedProjectId: null,
      search: initialProjectState.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should be able to ADD_PROJECT_SUCCESS', () => {
    const state = mockedState();
    const actual = ProjectReducer(state, projectActions.createProjectSuccess(projectMock));
    const expected = {
      ids: [...state.ids, ...[projectMock.id]],
      entities: Object.assign({}, state.entities, { [projectMock.id]: projectMock }),
      selectedProjectId: projectMock.id,
      search: initialProjectState.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should be NOT add a project on ADD_PROJECT_FAIL', () => {
    const state = mockedState();
    const actual = ProjectReducer(state, projectActions.createProjectFail(projectMock));
    expect(actual).toEqual(state);
  });

  it('should update search object on SEARCH_QUERY', () => {
    const state = mockedState();
    const search = {
      name: 'Project 1',
      domains: '["project1.com"]'
    };
    const actual = ProjectReducer(state, projectActions.searchQuery(search));
    const expected: ProjectState = {
      ...initialProjectState,
      search,
    };
    expect(actual).toEqual(expected, 'Didn\'t update search query correctly');
  });

  it('should add search results on ADD_PROJECTS', () => {
    const state = mockedState();
    const actual = ProjectReducer(state, projectActions.addProjects(addItems));
    const expected: ProjectState = nonEmptyState;
    expect(actual).toEqual(expected, 'Didn\'t add search items');
  });

  describe('when a Project already exists in the state', () => {
    const state = mockedState();
    let addedState = initialProjectState;

    beforeEach(() => {
      addedState = ProjectReducer(state, projectActions.createProjectSuccess(projectMock));
    });

    it('should GET_PROJECTS when there already exists a Project on the state', () => {
      const actual = ProjectReducer(addedState, projectActions.getProjects());
      const expected = {
        ids: [...state.ids, ...[projectMock.id]],
        entities: Object.assign({}, state.entities, { [projectMock.id]: projectMock }),
        selectedProjectId: null,
        search: initialProjectState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('should GET_PROJECT will return the selected Project', () => {
      const actual = ProjectReducer(addedState, projectActions.getProject(projectMock));
      const expected = {
        ids: [projectMock.id],
        entities: { [projectMock.id]: projectMock },
        selectedProjectId: projectMock.id,
        search: initialProjectState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('should update the given project on UPDATE_PROJECT', () => {
      projectMock.name = 'Updated Project Name';
      const actual = ProjectReducer(addedState, projectActions.updateProjectSuccess(projectMock));
      const expected = {
        ids: addedState.ids,
        entities: { [projectMock.id]: projectMock },
        selectedProjectId: projectMock.id,
        search: initialProjectState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('should NOT update the given project on UPDATE_PROJECT_FAIL', () => {
      projectMock.name = 'Updated Project Name';
      const actual = ProjectReducer(addedState, projectActions.updateProjectFail(projectMock));
      expect(actual).toEqual(addedState);
    });

    it('should remove the given project on REMOVE_PROJECT_SUCCESS', () => {
      const actual = ProjectReducer(addedState, projectActions.removeProjectSuccess(projectMock));
      delete state.entities[projectMock.id];
      const expected = {
        ids: addedState.ids.filter((id) => id !== projectMock.id),
        entities: Object.assign({}, state.entities),
        selectedProjectId: null,
        search: initialProjectState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('should NOT remove the given project on REMOVE_PROJECT_FAIL', () => {
      const actual = ProjectReducer(addedState, projectActions.removeProjectFail(projectMock));
      expect(actual).toEqual(addedState);
    });

    it('getEntities should return all the entities of a ProjectState', () => {
      const entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of a ProjectState', () => {
      const ids = getIds(addedState);
      expect(ids).toEqual(addedState.ids);
    });

    it('getSelectedId should return the id of the selected ProjectState', () => {
      const selectedProjectId = getSelectedId(addedState);
      expect(selectedProjectId).toEqual(addedState.selectedProjectId);
    });

    it('getSelected should return the entity of the selected ProjectState', () => {
      const selectedProject = getSelected(addedState);
      const selected = addedState.entities[addedState.selectedProjectId];
      expect(selectedProject).toEqual(selected);
    });

    it('getAll should return all the entities of the ProjectState', () => {
      const selectedProject = getAll(addedState);
      const selected = addedState.ids.map((id) => addedState.entities[id]);
      expect(selectedProject).toEqual(selected);
    });

    it('getProjectById should return a specific Project with the id provided', () => {
      const selectedProject = getProjectById(addedState, projectMock.id);
      expect(selectedProject).toEqual(projectMock);
    });

  });
});
