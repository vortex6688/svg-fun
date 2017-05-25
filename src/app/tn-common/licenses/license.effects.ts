import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import { LicenseService } from './license.service';
import { LicenseActions } from './license.actions';
import { License } from './license.model';

@Injectable()
export class LicenseEffects {

  @Effect()
  public loadData$: Observable<any> = defer(() => this.licenseService.find({})
    .map((licenses) => this.licenseActions.addLicenses(licenses))
    .catch(() => of())
  );

  @Effect()
  public createLicense$: Observable<Action> = this.actions$
    .ofType(LicenseActions.CREATE_LICENSE)
    .map((action) => action.payload as License)
    .switchMap((license) =>
      this.licenseService.save(license)
        .map((addedLicense) => this.licenseActions.createLicenseSuccess(addedLicense))
        .catch(() => of(this.licenseActions.createLicenseFail(license)))
    );

  @Effect()
  public updateLicense$: Observable<Action> = this.actions$
    .ofType(LicenseActions.UPDATE_LICENSE)
    .map((action) => action.payload as License)
    .switchMap((license) =>
      this.licenseService.save(license)
        .map((updatedLicense) => this.licenseActions.updateLicenseSuccess(updatedLicense))
        .catch(() => of(this.licenseActions.updateLicenseFail(license)))
    );

  @Effect()
  public removeLicense$: Observable<Action> = this.actions$
    .ofType(LicenseActions.REMOVE_LICENSE)
    .map((action) => action.payload as License)
    .switchMap((license) =>
      this.licenseService.delete(license)
        .map(() => this.licenseActions.removeLicenseSuccess(license))
        .catch(() => of(this.licenseActions.removeLicenseFail(license)))
    );

  constructor(private actions$: Actions, private licenseService: LicenseService,
              private licenseActions: LicenseActions) {}
}