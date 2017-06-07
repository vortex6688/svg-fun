import { Injectable } from '@angular/core';

import { Style } from './style.model';
import { ModelService } from '../model';
import { TnApiHttpService } from '../tn-api-http';

@Injectable()
export class StyleService extends ModelService<Style> {

  /**
   * Creates an instance of the StyleService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(apiHttp: TnApiHttpService) {
    super('/api/1/styles/', apiHttp);
  }

}
