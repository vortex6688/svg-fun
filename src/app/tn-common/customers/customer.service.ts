import { Injectable } from '@angular/core';

import { Customer } from './customer.model';
import { ModelService } from '../model';
import { TnApiHttpService } from '../tn-api-http';

@Injectable()
export class CustomerService extends ModelService<Customer> {

  /**
   * Creates an instance of the CustomerService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(apiHttp: TnApiHttpService) {
    super('/api/1/users/', apiHttp);
  }

}
