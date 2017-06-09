import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class ProjectActions {
  public static CREATE_PROJECT: string = '[Project] CREATE_PROJECT';
  public static CREATE_PROJECT_SUCCESS: string = '[Project] CREATE_PROJECT_SUCCESS';
  public static CREATE_PROJECT_FAIL: string = '[Project] CREATE_PROJECT_FAIL';
  public static UPDATE_PROJECT: string = '[Project] UPDATE_PROJECT';
  public static UPDATE_PROJECT_SUCCESS: string = '[Project] UPDATE_PROJECT_SUCCESS';
  public static UPDATE_PROJECT_FAIL: string = '[Project] UPDATE_PROJECT_FAIL';
  public static REMOVE_PROJECT: string = '[Project] REMOVE_PROJECT';
  public static REMOVE_PROJECT_SUCCESS: string = '[Project] REMOVE_PROJECT_SUCCESS';
  public static REMOVE_PROJECT_FAIL: string = '[Project] REMOVE_PROJECT_FAIL';

  // Results
  public static GET_PROJECTS: string = '[Project] GET_PROJECTS';
  public static GET_PROJECT: string = '[Project] GET_PROJECT';
  public static SEARCH_QUERY: string = '[Project] SEARCH_QUERY';
  public static ADD_PROJECTS: string = '[Project] ADD_PROJECTS';

  public createProject = ActionCreatorFactory.create(ProjectActions.CREATE_PROJECT);
  public createProjectSuccess = ActionCreatorFactory.create(ProjectActions.CREATE_PROJECT_SUCCESS);
  public createProjectFail = ActionCreatorFactory.create(ProjectActions.CREATE_PROJECT_FAIL);
  public updateProject = ActionCreatorFactory.create(ProjectActions.UPDATE_PROJECT);
  public updateProjectSuccess = ActionCreatorFactory.create(ProjectActions.UPDATE_PROJECT_SUCCESS);
  public updateProjectFail = ActionCreatorFactory.create(ProjectActions.UPDATE_PROJECT_FAIL);
  public removeProject = ActionCreatorFactory.create(ProjectActions.REMOVE_PROJECT);
  public removeProjectSuccess = ActionCreatorFactory.create(ProjectActions.REMOVE_PROJECT_SUCCESS);
  public removeProjectFail = ActionCreatorFactory.create(ProjectActions.REMOVE_PROJECT_FAIL);

  public getProjects = ActionCreatorFactory.create(ProjectActions.GET_PROJECTS);
  public getProject = ActionCreatorFactory.create(ProjectActions.GET_PROJECT);
  public searchQuery = ActionCreatorFactory.create(ProjectActions.SEARCH_QUERY);
  public addProjects = ActionCreatorFactory.create(ProjectActions.ADD_PROJECTS);
}
