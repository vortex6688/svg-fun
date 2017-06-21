import { Injectable } from '@angular/core';

import { Foundry } from './foundry.model';
import { ModelService } from '../model';
import { TnApiHttpService } from '../tn-api-http';

@Injectable()
export class FoundryService extends ModelService<Foundry> {

  /**
   * Creates an instance of the FoundryService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(apiHttp: TnApiHttpService) {
    super('/api/1/foundries/', apiHttp);
  }

}
