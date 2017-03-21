import { Injectable } from '@angular/core';

import { ModelService } from '../model';
import { User } from './user.model';
import { TnApiHttpService } from '../tn-api-http';

/**
 * User Service.
 *
 * This service provides an interface to make User related requests
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService extends ModelService<User> {

  /**
   * Creates an instance of the UserService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(apiHttp: TnApiHttpService) {
    super('/users/', apiHttp);
  }

}
