import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class SeriesActions {
  // Update
  public static CREATE_SERIES: string = '[Series] CREATE_SERIES';
  public static CREATE_SERIES_SUCCESS: string = '[Series] CREATE_SERIES_SUCCESS';
  public static CREATE_SERIES_FAIL: string = '[Series] CREATE_SERIES_FAIL';
  public static UPDATE_SERIES: string = '[Series] UPDATE_SERIES';
  public static UPDATE_SERIES_SUCCESS: string = '[Series] UPDATE_SERIES_SUCCESS';
  public static UPDATE_SERIES_FAIL: string = '[Series] UPDATE_SERIES_FAIL';
  public static REMOVE_SERIES: string = '[Series] REMOVE_SERIES';
  public static REMOVE_SERIES_SUCCESS: string = '[Series] REMOVE_SERIES_SUCCESS';
  public static REMOVE_SERIES_FAIL: string = '[Series] REMOVE_SERIES_FAIL';

  // Results
  public static GET_ALL_SERIES: string = '[Series] GET_ALL_SERIES';
  public static GET_SERIES: string = '[Series] GET_SERIES';
  public static SEARCH_QUERY: string = '[Series] SEARCH_QUERY';
  public static ADD_SERIES: string = '[Series] ADD_SERIES';

  public createSeries = ActionCreatorFactory.create(SeriesActions.CREATE_SERIES);
  public createSeriesSuccess = ActionCreatorFactory.create(SeriesActions.CREATE_SERIES_SUCCESS);
  public createSeriesFail = ActionCreatorFactory.create(SeriesActions.CREATE_SERIES_FAIL);
  public updateSeries = ActionCreatorFactory.create(SeriesActions.UPDATE_SERIES);
  public updateSeriesSuccess = ActionCreatorFactory.create(SeriesActions.UPDATE_SERIES_SUCCESS);
  public updateSeriesFail = ActionCreatorFactory.create(SeriesActions.UPDATE_SERIES_FAIL);
  public removeSeries = ActionCreatorFactory.create(SeriesActions.REMOVE_SERIES);
  public removeSeriesSuccess = ActionCreatorFactory.create(SeriesActions.REMOVE_SERIES_SUCCESS);
  public removeSeriesFail = ActionCreatorFactory.create(SeriesActions.REMOVE_SERIES_FAIL);

  public addSeries = ActionCreatorFactory.create(SeriesActions.ADD_SERIES);
  public getAllSeries = ActionCreatorFactory.create(SeriesActions.GET_ALL_SERIES);
  public getSeries = ActionCreatorFactory.create(SeriesActions.GET_SERIES);
  public searchQuery = ActionCreatorFactory.create(SeriesActions.SEARCH_QUERY);
}
