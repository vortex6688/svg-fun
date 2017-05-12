import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { defer } from 'rxjs/observable/defer';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { SeriesService } from './series.service';
import { SeriesActions } from './series.actions';

@Injectable()
export class SeriesEffects {
  @Effect()
  public loadData$: Observable<any> = defer(() => this.seriesService.find({})
    .map((series) => this.seriesActions.addSeries(series)));

  constructor(private actions$: Actions, private seriesService: SeriesService, private seriesActions: SeriesActions) {}
}
