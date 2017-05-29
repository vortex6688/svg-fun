import { Injectable } from '@angular/core';

import { Series } from './series.model';
import { ModelService } from '../model';
import { TnApiHttpService } from '../tn-api-http';

@Injectable()
export class SeriesService extends ModelService<Series> {

  /**
   * Creates an instance of the SeriesService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(apiHttp: TnApiHttpService) {
    super('/api/1/series/', apiHttp);
  }

}
