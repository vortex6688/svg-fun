import { Injectable } from '@angular/core';

import { Order } from './order.model';
import { ModelService } from '../../tn-common/model';
import { TnApiHttpService } from '../../tn-common/tn-api-http';

@Injectable()
export class OrderService extends ModelService<Order> {

  /**
   * Creates an instance of the OrderService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(apiHttp: TnApiHttpService) {
    super('/orders/', apiHttp);
  }

}
