import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import { FoundryService } from './foundry.service';
import { FoundryActions } from './foundry.actions';
import { Foundry } from './foundry.model';

@Injectable()
export class FoundryEffects {

  @Effect()
  public loadFoundries$: Observable<Action> = this.actions$
    .ofType(FoundryActions.LOAD_FOUNDRIES)
    .switchMap(() => this.foundryService.getAllPages())
      .map((foundries) => this.foundryActions.loadFoundriesSuccess(foundries))
      .catch((error) => of(this.foundryActions.loadFoundriesFail(error))
  );

  @Effect()
  public createFoundry$: Observable<Action> = this.actions$
    .ofType(FoundryActions.CREATE_FOUNDRY)
    .map((action) => action.payload as Foundry)
    .switchMap((foundry) =>
      this.foundryService.save(foundry)
        .map((addedFoundry) => this.foundryActions.createFoundrySuccess(addedFoundry))
        .catch(() => of(this.foundryActions.createFoundryFail(foundry)))
    );

  @Effect()
  public updateFoundry$: Observable<Action> = this.actions$
    .ofType(FoundryActions.UPDATE_FOUNDRY)
    .map((action) => action.payload as Foundry)
    .switchMap((foundry) =>
      this.foundryService.save(foundry)
        .map((updatedFoundry) => this.foundryActions.updateFoundrySuccess(updatedFoundry))
        .catch(() => of(this.foundryActions.updateFoundryFail(foundry)))
    );

  @Effect()
  public removeFoundry$: Observable<Action> = this.actions$
    .ofType(FoundryActions.REMOVE_FOUNDRY)
    .map((action) => action.payload as Foundry)
    .switchMap((foundry) =>
      this.foundryService.delete(foundry)
        .map(() => this.foundryActions.removeFoundrySuccess(foundry))
        .catch(() => of(this.foundryActions.removeFoundryFail(foundry)))
    );

  constructor(private actions$: Actions, private foundryService: FoundryService,
              private foundryActions: FoundryActions) {}
}
