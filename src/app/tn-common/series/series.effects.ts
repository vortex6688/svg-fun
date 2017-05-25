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
  public loadData$: Observable<any> = defer(() => this.seriesService.getAllPages({})
    .map((series) => this.seriesActions.addSeries(series))
    .catch(() => of())
  );

  @Effect()
  public createSeries$: Observable<Action> = this.actions$
    .ofType(SeriesActions.CREATE_SERIES)
    .map(toPayload)
    .switchMap((family) =>
      this.seriesService.save(family)
        .map((addedSeries) => this.seriesActions.createSeriesSuccess(addedSeries))
        .catch(() => of(this.seriesActions.createSeriesFail(family)))
    );

  @Effect()
  public updateSeries$: Observable<Action> = this.actions$
    .ofType(SeriesActions.UPDATE_SERIES)
    .map(toPayload)
    .switchMap((family) =>
      this.seriesService.save(family)
        .map((updatedSeries) => this.seriesActions.updateSeriesSuccess(updatedSeries))
        .catch(() => of(this.seriesActions.updateSeriesFail(family)))
    );
  @Effect()
  public removeSeries$: Observable<Action> = this.actions$
    .ofType(SeriesActions.REMOVE_SERIES)
    .map(toPayload)
    .switchMap((family) =>
      this.seriesService.delete(family)
        .map(() => this.seriesActions.removeSeriesSuccess(family))
        .catch(() => of(this.seriesActions.removeSeriesFail(family)))
    );

  constructor(
    private actions$: Actions,
    private seriesService: SeriesService,
    private seriesActions: SeriesActions
  ) {}
}
