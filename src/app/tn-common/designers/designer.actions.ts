import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class DesignerActions {
  public static CREATE_DESIGNER: string = '[Designer] CREATE_DESIGNER';
  public static CREATE_DESIGNER_SUCCESS: string = '[Designer] CREATE_DESIGNER_SUCCESS';
  public static CREATE_DESIGNER_FAIL: string = '[Designer] CREATE_DESIGNER_FAIL';
  public static UPDATE_DESIGNER: string = '[Designer] UPDATE_DESIGNER';
  public static UPDATE_DESIGNER_SUCCESS: string = '[Designer] UPDATE_DESIGNER_SUCCESS';
  public static UPDATE_DESIGNER_FAIL: string = '[Designer] UPDATE_DESIGNER_FAIL';
  public static REMOVE_DESIGNER: string = '[Designer] REMOVE_DESIGNER';
  public static REMOVE_DESIGNER_SUCCESS: string = '[Designer] REMOVE_DESIGNER_SUCCESS';
  public static REMOVE_DESIGNER_FAIL: string = '[Designer] REMOVE_DESIGNER_FAIL';

  // Results
  public static GET_DESIGNERS: string = '[Designer] GET_DESIGNERS';
  public static GET_DESIGNER: string = '[Designer] GET_DESIGNER';
  public static SEARCH_QUERY: string = '[Designer] SEARCH_QUERY';
  public static LOAD_DESIGNERS: string = '[Designer] LOAD_DESIGNERS';
  public static LOAD_DESIGNERS_SUCCESS: string = '[Designer] LOAD_DESIGNERS_SUCCESS';
  public static LOAD_DESIGNERS_FAIL: string = '[Designer] LOAD_DESIGNERS_FAIL';

  public createDesigner = ActionCreatorFactory.create(DesignerActions.CREATE_DESIGNER);
  public createDesignerSuccess = ActionCreatorFactory.create(DesignerActions.CREATE_DESIGNER_SUCCESS);
  public createDesignerFail = ActionCreatorFactory.create(DesignerActions.CREATE_DESIGNER_FAIL);
  public updateDesigner = ActionCreatorFactory.create(DesignerActions.UPDATE_DESIGNER);
  public updateDesignerSuccess = ActionCreatorFactory.create(DesignerActions.UPDATE_DESIGNER_SUCCESS);
  public updateDesignerFail = ActionCreatorFactory.create(DesignerActions.UPDATE_DESIGNER_FAIL);
  public removeDesigner = ActionCreatorFactory.create(DesignerActions.REMOVE_DESIGNER);
  public removeDesignerSuccess = ActionCreatorFactory.create(DesignerActions.REMOVE_DESIGNER_SUCCESS);
  public removeDesignerFail = ActionCreatorFactory.create(DesignerActions.REMOVE_DESIGNER_FAIL);

  public getDesigners = ActionCreatorFactory.create(DesignerActions.GET_DESIGNERS);
  public getDesigner = ActionCreatorFactory.create(DesignerActions.GET_DESIGNER);
  public searchQuery = ActionCreatorFactory.create(DesignerActions.SEARCH_QUERY);
  public loadDesigners = ActionCreatorFactory.create(DesignerActions.LOAD_DESIGNERS);
  public loadDesignersSuccess = ActionCreatorFactory.create(DesignerActions.LOAD_DESIGNERS_SUCCESS);
  public loadDesignersFail = ActionCreatorFactory.create(DesignerActions.LOAD_DESIGNERS_FAIL);
}
