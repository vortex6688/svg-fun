import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FamilyService } from './family.service';
import { FamilyActions } from './family.actions';
import { Family } from './family.model';

@Injectable()
export class FamilyEffects {
  @Effect()
  public loadFamilies$: Observable<Action> = this.actions$
    .ofType(FamilyActions.LOAD_FAMILIES)
    .switchMap(() => this.familyService.getAllPages())
      .map((families) => this.familyActions.loadFamiliesSuccess(families))
      .catch((error) => of(this.familyActions.loadFamiliesFail(error))
  );

  @Effect()
  public createFamily$: Observable<Action> = this.actions$
    .ofType(FamilyActions.CREATE_FAMILY)
    .map(toPayload)
    .switchMap((family) =>
      this.familyService.save(family)
        .map((addedFamily) => this.familyActions.createFamilySuccess(addedFamily))
        .catch(() => of(this.familyActions.createFamilyFail(family)))
    );

  @Effect()
  public updateFamily$: Observable<Action> = this.actions$
    .ofType(FamilyActions.UPDATE_FAMILY)
    .map(toPayload)
    .switchMap((family) =>
      this.familyService.save(family)
        .map((updatedFamily) => this.familyActions.updateFamilySuccess(updatedFamily))
        .catch(() => of(this.familyActions.updateFamilyFail(family)))
    );

  @Effect()
  public removeFamily$: Observable<Action> = this.actions$
    .ofType(FamilyActions.REMOVE_FAMILY)
    .map(toPayload)
    .switchMap((family) =>
      this.familyService.delete(family)
        .map(() => this.familyActions.removeFamilySuccess(family))
        .catch(() => of(this.familyActions.removeFamilyFail(family)))
    );

  constructor(
    private actions$: Actions,
    private familyService: FamilyService,
    private familyActions: FamilyActions,
  ) {}
}
