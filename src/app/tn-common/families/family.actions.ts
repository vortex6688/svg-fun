import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class FamilyActions {
  public static CREATE_FAMILY: string = '[Family] CREATE_FAMILY';
  public static CREATE_FAMILY_SUCCESS: string = '[Family] CREATE_FAMILY_SUCCESS';
  public static CREATE_FAMILY_FAIL: string = '[Family] CREATE_FAMILY_FAIL';
  public static UPDATE_FAMILY: string = '[Family] UPDATE_FAMILY';
  public static UPDATE_FAMILY_SUCCESS: string = '[Family] UPDATE_FAMILY_SUCCESS';
  public static UPDATE_FAMILY_FAIL: string = '[Family] UPDATE_FAMILY_FAIL';
  public static REMOVE_FAMILY: string = '[Family] REMOVE_FAMILY';
  public static REMOVE_FAMILY_SUCCESS: string = '[Family] REMOVE_FAMILY_SUCCESS';
  public static REMOVE_FAMILY_FAIL: string = '[Family] REMOVE_FAMILY_FAIL';

  // Results
  public static GET_FAMILIES: string = '[Family] GET_FAMILIES';
  public static GET_FAMILY: string = '[Family] GET_FAMILY';
  public static SEARCH_QUERY: string = '[Family] SEARCH_QUERY';
  public static LOAD_FAMILIES: string = '[Family] LOAD_FAMILIES';
  public static LOAD_FAMILIES_SUCCESS: string = '[Family] LOAD_FAMILIES_SUCCESS';
  public static LOAD_FAMILIES_FAIL: string = '[Family] LOAD_FAMILIES_FAIL';

  public createFamily = ActionCreatorFactory.create(FamilyActions.CREATE_FAMILY);
  public createFamilySuccess = ActionCreatorFactory.create(FamilyActions.CREATE_FAMILY_SUCCESS);
  public createFamilyFail = ActionCreatorFactory.create(FamilyActions.CREATE_FAMILY_FAIL);
  public updateFamily = ActionCreatorFactory.create(FamilyActions.UPDATE_FAMILY);
  public updateFamilySuccess = ActionCreatorFactory.create(FamilyActions.UPDATE_FAMILY_SUCCESS);
  public updateFamilyFail = ActionCreatorFactory.create(FamilyActions.UPDATE_FAMILY_FAIL);
  public removeFamily = ActionCreatorFactory.create(FamilyActions.REMOVE_FAMILY);
  public removeFamilySuccess = ActionCreatorFactory.create(FamilyActions.REMOVE_FAMILY_SUCCESS);
  public removeFamilyFail = ActionCreatorFactory.create(FamilyActions.REMOVE_FAMILY_FAIL);

  public getFamilies = ActionCreatorFactory.create(FamilyActions.GET_FAMILIES);
  public getFamily = ActionCreatorFactory.create(FamilyActions.GET_FAMILY);
  public searchQuery = ActionCreatorFactory.create(FamilyActions.SEARCH_QUERY);
  public loadFamilies = ActionCreatorFactory.create(FamilyActions.LOAD_FAMILIES);
  public loadFamiliesSuccess = ActionCreatorFactory.create(FamilyActions.LOAD_FAMILIES_SUCCESS);
  public loadFamiliesFail = ActionCreatorFactory.create(FamilyActions.LOAD_FAMILIES_FAIL);
}
