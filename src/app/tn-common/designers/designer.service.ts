import { Injectable } from '@angular/core';

import { Designer } from './designer.model';
import { ModelService } from '../model';
import { TnApiHttpService } from '../tn-api-http';

@Injectable()
export class DesignerService extends ModelService<Designer> {

  /**
   * Creates an instance of the DesignerService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(apiHttp: TnApiHttpService) {
    super('/api/1/people/', apiHttp);
  }

}
