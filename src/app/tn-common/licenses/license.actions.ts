import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class LicenseActions {
  public static ADD_LICENSE: string = '[License] ADD_LICENSE';
  public static ADD_LICENSE_SUCCESS: string = '[License] ADD_LICENSE_SUCCESS';
  public static ADD_LICENSE_FAIL: string = '[License] ADD_LICENSE_FAIL';
  public static UPDATE_LICENSE: string = '[License] UPDATE_LICENSE';
  public static UPDATE_LICENSE_SUCCESS: string = '[License] UPDATE_LICENSE_SUCCESS';
  public static UPDATE_LICENSE_FAIL: string = '[License] UPDATE_LICENSE_FAIL';
  public static REMOVE_LICENSE: string = '[License] REMOVE_LICENSE';
  public static REMOVE_LICENSE_SUCCESS: string = '[License] REMOVE_LICENSE_SUCCESS';
  public static REMOVE_LICENSE_FAIL: string = '[License] REMOVE_LICENSE_FAIL';

  // Results
  public static GET_LICENSES: string = '[License] GET_LICENSES';
  public static GET_LICENSE: string = '[License] GET_LICENSE';
  public static SEARCH_QUERY: string = '[License] SEARCH_QUERY';
  public static SEARCH_COMPLETE: string = '[License] SEARCH_COMPLETE';

  public addLicense = ActionCreatorFactory.create(LicenseActions.ADD_LICENSE);
  public addLicenseSuccess = ActionCreatorFactory.create(LicenseActions.ADD_LICENSE_SUCCESS);
  public addLicenseFail = ActionCreatorFactory.create(LicenseActions.ADD_LICENSE_FAIL);
  public updateLicense = ActionCreatorFactory.create(LicenseActions.UPDATE_LICENSE);
  public updateLicenseSuccess = ActionCreatorFactory.create(LicenseActions.UPDATE_LICENSE_SUCCESS);
  public updateLicenseFail = ActionCreatorFactory.create(LicenseActions.UPDATE_LICENSE_FAIL);
  public removeLicense = ActionCreatorFactory.create(LicenseActions.REMOVE_LICENSE);
  public removeLicenseSuccess = ActionCreatorFactory.create(LicenseActions.REMOVE_LICENSE_SUCCESS);
  public removeLicenseFail = ActionCreatorFactory.create(LicenseActions.REMOVE_LICENSE_FAIL);

  public getLicenses = ActionCreatorFactory.create(LicenseActions.GET_LICENSES);
  public getLicense = ActionCreatorFactory.create(LicenseActions.GET_LICENSE);
  public searchQuery = ActionCreatorFactory.create(LicenseActions.SEARCH_QUERY);
  public searchComplete = ActionCreatorFactory.create(LicenseActions.SEARCH_COMPLETE);
}
