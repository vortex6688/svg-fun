import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SeriesService } from './series.service';
import { SeriesActions } from './series.actions';

@Injectable()
export class SeriesEffects {
  @Effect()
  public search$: Observable<Action> = this.actions$
    .ofType(SeriesActions.SEARCH_QUERY)
    .map(toPayload)
    .switchMap((query) =>
      this.seriesService.find(query)
        .map((series) => this.seriesActions.searchComplete(series))
    );

  constructor(private actions$: Actions, private seriesService: SeriesService, private seriesActions: SeriesActions) {}
}
