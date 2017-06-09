import { ActionReducer, Action } from '@ngrx/store';

import { Project } from './project.model';
import { ProjectState, initialProjectState } from './project.state';
import { ProjectActions } from './project.actions';

export const ProjectReducer: ActionReducer<ProjectState> = (state = initialProjectState, action: Action) => {
  switch (action.type) {
    case ProjectActions.GET_PROJECTS:
      return { ...state, selectedProjectId: null };

    case ProjectActions.GET_PROJECT: {
      const project: Project = action.payload;

      return {
        ids: [ project.id ],
        entities: {
          [project.id]: project
        },
        selectedProjectId: project.id,
        search: state.search,
      };
    }

    case ProjectActions.CREATE_PROJECT_SUCCESS: {
      const project: Project = action.payload;

      return {
        ids: [ ...state.ids, project.id ],
        entities: Object.assign({}, state.entities, {
          [project.id]: project
        }),
        selectedProjectId: project.id,
        search: state.search,
      };
    }

    case ProjectActions.UPDATE_PROJECT_SUCCESS: {
      const project: Project = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [project.id]: project
        }),
        selectedProjectId: project.id,
        search: state.search,
      };
    }

    case ProjectActions.REMOVE_PROJECT_SUCCESS: {
      const project: Project = action.payload;
      delete state.entities[project.id];

      return {
        ids: state.ids.filter((id) => id !== project.id),
        entities: Object.assign({}, state.entities),
        selectedProjectId: null,
        search: state.search,
      };
    }

    case ProjectActions.SEARCH_QUERY: {
      const search = action.payload;

      return { ...state, search };
    }

    case ProjectActions.LOAD_PROJECTS_SUCCESS: {
      const projects: Project[] = action.payload;
      const { projectEntities, projectIds } = projects.reduce((result, project) => {
        result.projectEntities[project.id] = project;
        result.projectIds.push(project.id);
        return result;
      }, { projectEntities: {}, projectIds: [] });

      return {
        ...state,
        ids: projectIds,
        entities: projectEntities,
      };
    }

    case ProjectActions.CREATE_PROJECT_FAIL:
    case ProjectActions.UPDATE_PROJECT_FAIL:
    case ProjectActions.REMOVE_PROJECT_FAIL:
    case ProjectActions.LOAD_PROJECTS_FAIL:
    default: {
      return state;
    }
  }
};
