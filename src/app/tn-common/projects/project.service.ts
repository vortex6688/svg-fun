import { Injectable } from '@angular/core';

import { Project } from './project.model';
import { ModelService } from '../model';
import { TnApiHttpService } from '../tn-api-http';

@Injectable()
export class ProjectService extends ModelService<Project> {

  /**
   * Creates an instance of the ProjectService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(apiHttp: TnApiHttpService) {
    super('/api/1/projects/', apiHttp);
  }

}
