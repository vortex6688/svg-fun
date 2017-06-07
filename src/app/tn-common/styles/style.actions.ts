import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class StyleActions {
  public static CREATE_STYLE: string = '[Style] CREATE_STYLE';
  public static CREATE_STYLE_SUCCESS: string = '[Style] CREATE_STYLE_SUCCESS';
  public static CREATE_STYLE_FAIL: string = '[Style] CREATE_STYLE_FAIL';
  public static UPDATE_STYLE: string = '[Style] UPDATE_STYLE';
  public static UPDATE_STYLE_SUCCESS: string = '[Style] UPDATE_STYLE_SUCCESS';
  public static UPDATE_STYLE_FAIL: string = '[Style] UPDATE_STYLE_FAIL';
  public static REMOVE_STYLE: string = '[Style] REMOVE_STYLE';
  public static REMOVE_STYLE_SUCCESS: string = '[Style] REMOVE_STYLE_SUCCESS';
  public static REMOVE_STYLE_FAIL: string = '[Style] REMOVE_STYLE_FAIL';

  // Results
  public static GET_STYLES: string = '[Style] GET_STYLES';
  public static GET_STYLE: string = '[Style] GET_STYLE';
  public static SEARCH_QUERY: string = '[Style] SEARCH_QUERY';
  public static ADD_STYLES: string = '[Style] ADD_STYLES';

  public createStyle = ActionCreatorFactory.create(StyleActions.CREATE_STYLE);
  public createStyleSuccess = ActionCreatorFactory.create(StyleActions.CREATE_STYLE_SUCCESS);
  public createStyleFail = ActionCreatorFactory.create(StyleActions.CREATE_STYLE_FAIL);
  public updateStyle = ActionCreatorFactory.create(StyleActions.UPDATE_STYLE);
  public updateStyleSuccess = ActionCreatorFactory.create(StyleActions.UPDATE_STYLE_SUCCESS);
  public updateStyleFail = ActionCreatorFactory.create(StyleActions.UPDATE_STYLE_FAIL);
  public removeStyle = ActionCreatorFactory.create(StyleActions.REMOVE_STYLE);
  public removeStyleSuccess = ActionCreatorFactory.create(StyleActions.REMOVE_STYLE_SUCCESS);
  public removeStyleFail = ActionCreatorFactory.create(StyleActions.REMOVE_STYLE_FAIL);

  public getStyles = ActionCreatorFactory.create(StyleActions.GET_STYLES);
  public getStyle = ActionCreatorFactory.create(StyleActions.GET_STYLE);
  public searchQuery = ActionCreatorFactory.create(StyleActions.SEARCH_QUERY);
  public addStyles = ActionCreatorFactory.create(StyleActions.ADD_STYLES);
}
