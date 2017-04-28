import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class LicenseActions {
  public static ADD_LICENSE: string = '[License] ADD_LICENSE';
  public static SAVE_LICENSE_SUCCESS: string = '[License] SAVE_LICENSE Success';
  public static SAVE_LICENSE_FAIL: string = '[License] SAVE_LICENSE Fail';
  public static UPDATE_LICENSE: string = '[License] UPDATE_LICENSE';
  public static REMOVE_LICENSE: string = '[License] REMOVE_LICENSE';
  public static REMOVE_LICENSE_SUCCESS: string = '[License] REMOVE_LICENSE Success';
  public static REMOVE_LICENSE_FAIL: string = '[License] REMOVE_LICENSE Fail';

  // Results
  public static GET_LICENSES: string = '[License] GET_LICENSES';
  public static GET_LICENSE: string = '[License] GET_LICENSE';
  public static SEARCH_QUERY: string = '[License] SEARCH_QUERY';
  public static SEARCH_COMPLETE: string = '[License] SEARCH_COMPLETE';

  public addLicense = ActionCreatorFactory.create(LicenseActions.ADD_LICENSE);
  public saveLicenseSuccess = ActionCreatorFactory.create(LicenseActions.SAVE_LICENSE_SUCCESS);
  public saveLicenseFail = ActionCreatorFactory.create(LicenseActions.SAVE_LICENSE_FAIL);
  public updateLicense = ActionCreatorFactory.create(LicenseActions.UPDATE_LICENSE);
  public removeLicense = ActionCreatorFactory.create(LicenseActions.REMOVE_LICENSE);
  public removeLicenseSuccess = ActionCreatorFactory.create(LicenseActions.REMOVE_LICENSE_SUCCESS);
  public removeLicenseFail = ActionCreatorFactory.create(LicenseActions.REMOVE_LICENSE_FAIL);

  public getLicenses = ActionCreatorFactory.create(LicenseActions.GET_LICENSES);
  public getLicense = ActionCreatorFactory.create(LicenseActions.GET_LICENSE);
  public searchQuery = ActionCreatorFactory.create(LicenseActions.SEARCH_QUERY);
  public searchComplete = ActionCreatorFactory.create(LicenseActions.SEARCH_COMPLETE);
}
