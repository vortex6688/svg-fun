import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class LicenseActions {
  // Update
  //public static PLACE_LICENSE: string = '[License] PLACE_LICENSE';

  // Results
  public static GET_LICENSES: string = '[License] GET_LICENSES';
  public static GET_LICENSE: string = '[License] GET_LICENSE';
  public static SEARCH_QUERY: string = '[License] SEARCH_QUERY';
  public static SEARCH_COMPLETE: string = '[License] SEARCH_COMPLETE';

  //public placeLicense = ActionCreatorFactory.create(LicenseActions.PLACE_LICENSE);
  public getLicenses = ActionCreatorFactory.create(LicenseActions.GET_LICENSES);
  public getLicense = ActionCreatorFactory.create(LicenseActions.GET_LICENSE);
  public searchQuery = ActionCreatorFactory.create(LicenseActions.SEARCH_QUERY);
  public searchComplete = ActionCreatorFactory.create(LicenseActions.SEARCH_COMPLETE);
}
