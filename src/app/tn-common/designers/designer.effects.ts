import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import { DesignerService } from './designer.service';
import { DesignerActions } from './designer.actions';
import { Designer } from './designer.model';

@Injectable()
export class DesignerEffects {

  @Effect()
  public loadDesigners$: Observable<Action> = this.actions$
    .ofType(DesignerActions.LOAD_DESIGNERS)
    .switchMap(() => this.designerService.getAllPages())
      .map((designers) => this.designerActions.loadDesignersSuccess(designers))
      .catch((error) => of(this.designerActions.loadDesignersFail(error))
  );

  @Effect()
  public createDesigner$: Observable<Action> = this.actions$
    .ofType(DesignerActions.CREATE_DESIGNER)
    .map((action) => action.payload as Designer)
    .switchMap((designer) =>
      this.designerService.save(designer)
        .map((addedDesigner) => this.designerActions.createDesignerSuccess(addedDesigner))
        .catch(() => of(this.designerActions.createDesignerFail(designer)))
    );

  @Effect()
  public updateDesigner$: Observable<Action> = this.actions$
    .ofType(DesignerActions.UPDATE_DESIGNER)
    .map((action) => action.payload as Designer)
    .switchMap((designer) =>
      this.designerService.save(designer)
        .map((updatedDesigner) => this.designerActions.updateDesignerSuccess(updatedDesigner))
        .catch(() => of(this.designerActions.updateDesignerFail(designer)))
    );

  @Effect()
  public removeDesigner$: Observable<Action> = this.actions$
    .ofType(DesignerActions.REMOVE_DESIGNER)
    .map((action) => action.payload as Designer)
    .switchMap((designer) =>
      this.designerService.delete(designer)
        .map(() => this.designerActions.removeDesignerSuccess(designer))
        .catch(() => of(this.designerActions.removeDesignerFail(designer)))
    );

  constructor(private actions$: Actions, private designerService: DesignerService,
              private designerActions: DesignerActions) {}
}
