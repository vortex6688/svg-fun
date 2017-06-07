import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import { StyleService } from './style.service';
import { StyleActions } from './style.actions';
import { Style } from './style.model';

@Injectable()
export class StyleEffects {

  @Effect()
  public loadData$: Observable<any> = defer(() => this.styleService.getAllPages({})
    .map((styles) => this.styleActions.addStyles(styles))
    .catch(() => of())
  );

  @Effect()
  public createStyle$: Observable<Action> = this.actions$
    .ofType(StyleActions.CREATE_STYLE)
    .map((action) => action.payload as Style)
    .switchMap((style) =>
      this.styleService.save(style)
        .map((addedStyle) => this.styleActions.createStyleSuccess(addedStyle))
        .catch(() => of(this.styleActions.createStyleFail(style)))
    );

  @Effect()
  public updateStyle$: Observable<Action> = this.actions$
    .ofType(StyleActions.UPDATE_STYLE)
    .map((action) => action.payload as Style)
    .switchMap((style) =>
      this.styleService.save(style)
        .map((updatedStyle) => this.styleActions.updateStyleSuccess(updatedStyle))
        .catch(() => of(this.styleActions.updateStyleFail(style)))
    );

  @Effect()
  public removeStyle$: Observable<Action> = this.actions$
    .ofType(StyleActions.REMOVE_STYLE)
    .map((action) => action.payload as Style)
    .switchMap((style) =>
      this.styleService.delete(style)
        .map(() => this.styleActions.removeStyleSuccess(style))
        .catch(() => of(this.styleActions.removeStyleFail(style)))
    );

  constructor(private actions$: Actions, private styleService: StyleService,
              private styleActions: StyleActions) {}
}
