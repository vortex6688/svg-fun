import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class LicenseActions {
  // Update
  public static ADD_LICENSE: string = '[License] ADD_LICENSE';
  public static ADD_LICENSE_SUCCESS = '[License] ADD_LICENSE Success';
  public static ADD_LICENSE_FAIL = '[License] ADD_LICENSE Fail';

  // Results
  public static GET_LICENSES: string = '[License] GET_LICENSES';
  public static GET_LICENSE: string = '[License] GET_LICENSE';
  public static SEARCH_QUERY: string = '[License] SEARCH_QUERY';
  public static SEARCH_COMPLETE: string = '[License] SEARCH_COMPLETE';

  public addLicense = ActionCreatorFactory.create(LicenseActions.ADD_LICENSE);
  public addLicenseSuccess = ActionCreatorFactory.create(LicenseActions.ADD_LICENSE_SUCCESS);
  public addLicenseFail = ActionCreatorFactory.create(LicenseActions.ADD_LICENSE_FAIL);
  public getLicenses = ActionCreatorFactory.create(LicenseActions.GET_LICENSES);
  public getLicense = ActionCreatorFactory.create(LicenseActions.GET_LICENSE);
  public searchQuery = ActionCreatorFactory.create(LicenseActions.SEARCH_QUERY);
  public searchComplete = ActionCreatorFactory.create(LicenseActions.SEARCH_COMPLETE);
}
