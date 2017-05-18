import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Order } from './order.model';
import { ModelService } from '../model';
import { TnApiHttpService } from '../tn-api-http';

@Injectable()
export class OrderService extends ModelService<Order> {

  /**
   * Creates an instance of the OrderService
   *
   * @param {TnApiHttpService} apiHttp
   */
  constructor(private http: TnApiHttpService) {
    super('/api/2/orders/', http);
  }
}
