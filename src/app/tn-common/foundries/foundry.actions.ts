import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class FoundryActions {
  public static CREATE_FOUNDRY: string = '[Foundry] CREATE_FOUNDRY';
  public static CREATE_FOUNDRY_SUCCESS: string = '[Foundry] CREATE_FOUNDRY_SUCCESS';
  public static CREATE_FOUNDRY_FAIL: string = '[Foundry] CREATE_FOUNDRY_FAIL';
  public static UPDATE_FOUNDRY: string = '[Foundry] UPDATE_FOUNDRY';
  public static UPDATE_FOUNDRY_SUCCESS: string = '[Foundry] UPDATE_FOUNDRY_SUCCESS';
  public static UPDATE_FOUNDRY_FAIL: string = '[Foundry] UPDATE_FOUNDRY_FAIL';
  public static REMOVE_FOUNDRY: string = '[Foundry] REMOVE_FOUNDRY';
  public static REMOVE_FOUNDRY_SUCCESS: string = '[Foundry] REMOVE_FOUNDRY_SUCCESS';
  public static REMOVE_FOUNDRY_FAIL: string = '[Foundry] REMOVE_FOUNDRY_FAIL';

  // Results
  public static GET_FOUNDRIES: string = '[Foundry] GET_FOUNDRIES';
  public static GET_FOUNDRY: string = '[Foundry] GET_FOUNDRY';
  public static SEARCH_QUERY: string = '[Foundry] SEARCH_QUERY';
  public static LOAD_FOUNDRIES: string = '[Foundry] LOAD_FOUNDRIES';
  public static LOAD_FOUNDRIES_SUCCESS: string = '[Foundry] LOAD_FOUNDRIES_SUCCESS';
  public static LOAD_FOUNDRIES_FAIL: string = '[Foundry] LOAD_FOUNDRIES_FAIL';

  public createFoundry = ActionCreatorFactory.create(FoundryActions.CREATE_FOUNDRY);
  public createFoundrySuccess = ActionCreatorFactory.create(FoundryActions.CREATE_FOUNDRY_SUCCESS);
  public createFoundryFail = ActionCreatorFactory.create(FoundryActions.CREATE_FOUNDRY_FAIL);
  public updateFoundry = ActionCreatorFactory.create(FoundryActions.UPDATE_FOUNDRY);
  public updateFoundrySuccess = ActionCreatorFactory.create(FoundryActions.UPDATE_FOUNDRY_SUCCESS);
  public updateFoundryFail = ActionCreatorFactory.create(FoundryActions.UPDATE_FOUNDRY_FAIL);
  public removeFoundry = ActionCreatorFactory.create(FoundryActions.REMOVE_FOUNDRY);
  public removeFoundrySuccess = ActionCreatorFactory.create(FoundryActions.REMOVE_FOUNDRY_SUCCESS);
  public removeFoundryFail = ActionCreatorFactory.create(FoundryActions.REMOVE_FOUNDRY_FAIL);

  public getFoundries = ActionCreatorFactory.create(FoundryActions.GET_FOUNDRIES);
  public getFoundry = ActionCreatorFactory.create(FoundryActions.GET_FOUNDRY);
  public searchQuery = ActionCreatorFactory.create(FoundryActions.SEARCH_QUERY);
  public loadFoundries = ActionCreatorFactory.create(FoundryActions.LOAD_FOUNDRIES);
  public loadFoundriesSuccess = ActionCreatorFactory.create(FoundryActions.LOAD_FOUNDRIES_SUCCESS);
  public loadFoundriesFail = ActionCreatorFactory.create(FoundryActions.LOAD_FOUNDRIES_FAIL);
}
