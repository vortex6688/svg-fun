import { Injectable } from '@angular/core';

import { Family } from './family.model';
import { ModelService } from '../model';
import { TnApiHttpService } from '../tn-api-http';

@Injectable()
export class FamilyService extends ModelService<Family> {

  /**
   * Creates an instance of the FamilyService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(apiHttp: TnApiHttpService) {
    super('/api/1/families/', apiHttp);
  }

}
