import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class SeriesActions {
  // Update
  public static ADD_SERIES: string = '[Series] ADD_SERIES';

  // Results
  public static GET_ALL_SERIES: string = '[Series] GET_ALL_SERIES';
  public static GET_SERIES: string = '[Series] GET_SERIES';
  public static SEARCH_QUERY: string = '[Series] SEARCH_QUERY';
  public static SEARCH_COMPLETE: string = '[Series] SEARCH_COMPLETE';
  public static CREATE_SERIES: string = '[Series] CREATE_SERIES';

  public addSeries = ActionCreatorFactory.create(SeriesActions.ADD_SERIES);
  public createSeries = ActionCreatorFactory.create(SeriesActions.CREATE_SERIES);
  public getAllSeries = ActionCreatorFactory.create(SeriesActions.GET_ALL_SERIES);
  public getSeries = ActionCreatorFactory.create(SeriesActions.GET_SERIES);
  public searchQuery = ActionCreatorFactory.create(SeriesActions.SEARCH_QUERY);
}
