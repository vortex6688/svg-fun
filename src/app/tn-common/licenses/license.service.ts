import { Injectable } from '@angular/core';

import { License } from './license.model';
import { ModelService } from '../model';
import { TnApiHttpService } from '../tn-api-http';

@Injectable()
export class LicenseService extends ModelService<License> {

  /**
   * Creates an instance of the OrderService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(apiHttp: TnApiHttpService) {
    super('/api/2/licenses/', apiHttp);
  }

}
