import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SeriesService } from './series.service';
import { SeriesActions } from './series.actions';

@Injectable()
export class SeriesEffects {
  @Effect()
  public loadSeries$: Observable<Action> = this.actions$
    .ofType(SeriesActions.LOAD_SERIES)
    .switchMap(() => this.seriesService.getAllPages())
      .map((series) => this.seriesActions.loadSeriesSuccess(series))
      .catch((error) => of(this.seriesActions.loadSeriesFail(error))
  );

  @Effect()
  public createSeries$: Observable<Action> = this.actions$
    .ofType(SeriesActions.CREATE_SERIES)
    .map(toPayload)
    .switchMap((series) =>
      this.seriesService.save(series)
        .map((addedSeries) => this.seriesActions.createSeriesSuccess(addedSeries))
        .catch(() => of(this.seriesActions.createSeriesFail(series)))
    );

  @Effect()
  public updateSeries$: Observable<Action> = this.actions$
    .ofType(SeriesActions.UPDATE_SERIES)
    .map(toPayload)
    .switchMap((series) =>
      this.seriesService.save(series)
        .map((updatedSeries) => this.seriesActions.updateSeriesSuccess(updatedSeries))
        .catch(() => of(this.seriesActions.updateSeriesFail(series)))
    );
  @Effect()
  public removeSeries$: Observable<Action> = this.actions$
    .ofType(SeriesActions.REMOVE_SERIES)
    .map(toPayload)
    .switchMap((series) =>
      this.seriesService.delete(series)
        .map(() => this.seriesActions.removeSeriesSuccess(series))
        .catch(() => of(this.seriesActions.removeSeriesFail(series)))
    );

  constructor(
    private actions$: Actions,
    private seriesService: SeriesService,
    private seriesActions: SeriesActions
  ) {}
}
