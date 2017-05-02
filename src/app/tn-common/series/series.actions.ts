import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class SeriesActions {
  // Update
  public static PLACE_SERIES: string = '[Series] PLACE_SERIES';

  // Results
  public static GET_ALL_SERIES: string = '[Series] GET_ALL_SERIES';
  public static GET_SERIES: string = '[Series] GET_SERIES';
  public static SEARCH_QUERY: string = '[Series] SEARCH_QUERY';
  public static SEARCH_COMPLETE: string = '[Series] SEARCH_COMPLETE';

  public placeSeries = ActionCreatorFactory.create(SeriesActions.PLACE_SERIES);
  public getAllSeries = ActionCreatorFactory.create(SeriesActions.GET_ALL_SERIES);
  public getSeries = ActionCreatorFactory.create(SeriesActions.GET_SERIES);
  public searchQuery = ActionCreatorFactory.create(SeriesActions.SEARCH_QUERY);
  public searchComplete = ActionCreatorFactory.create(SeriesActions.SEARCH_COMPLETE);
}
