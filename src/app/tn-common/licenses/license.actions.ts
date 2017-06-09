import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class LicenseActions {
  public static CREATE_LICENSE: string = '[License] CREATE_LICENSE';
  public static CREATE_LICENSE_SUCCESS: string = '[License] CREATE_LICENSE_SUCCESS';
  public static CREATE_LICENSE_FAIL: string = '[License] CREATE_LICENSE_FAIL';
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
  public static LOAD_LICENSES: string = '[License] LOAD_LICENSES';
  public static LOAD_LICENSES_SUCCESS: string = '[License] LOAD_LICENSES_SUCCESS';
  public static LOAD_LICENSES_FAIL: string = '[License] LOAD_LICENSES_FAIL';

  public createLicense = ActionCreatorFactory.create(LicenseActions.CREATE_LICENSE);
  public createLicenseSuccess = ActionCreatorFactory.create(LicenseActions.CREATE_LICENSE_SUCCESS);
  public createLicenseFail = ActionCreatorFactory.create(LicenseActions.CREATE_LICENSE_FAIL);
  public updateLicense = ActionCreatorFactory.create(LicenseActions.UPDATE_LICENSE);
  public updateLicenseSuccess = ActionCreatorFactory.create(LicenseActions.UPDATE_LICENSE_SUCCESS);
  public updateLicenseFail = ActionCreatorFactory.create(LicenseActions.UPDATE_LICENSE_FAIL);
  public removeLicense = ActionCreatorFactory.create(LicenseActions.REMOVE_LICENSE);
  public removeLicenseSuccess = ActionCreatorFactory.create(LicenseActions.REMOVE_LICENSE_SUCCESS);
  public removeLicenseFail = ActionCreatorFactory.create(LicenseActions.REMOVE_LICENSE_FAIL);

  public getLicenses = ActionCreatorFactory.create(LicenseActions.GET_LICENSES);
  public getLicense = ActionCreatorFactory.create(LicenseActions.GET_LICENSE);
  public searchQuery = ActionCreatorFactory.create(LicenseActions.SEARCH_QUERY);
  public loadLicenses = ActionCreatorFactory.create(LicenseActions.LOAD_LICENSES);
  public loadLicensesSuccess = ActionCreatorFactory.create(LicenseActions.LOAD_LICENSES_SUCCESS);
  public loadLicensesFail = ActionCreatorFactory.create(LicenseActions.LOAD_LICENSES_FAIL);
}
