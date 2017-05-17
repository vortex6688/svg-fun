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

  /**
   * Go through all the pages and get all orders
   *
   * @param {object} query - query parameters to be appended
   * @returns {Observable<Order[]>} - returns an observable with all items from all pages as a single event
   */
  public getAllPages(query?: object): Observable<Order[]> {
    return this.find(query)
      .switchMap(({ results, next }: any) => (next ? this.getPages(next, results) : Observable.from(results)))
      .toArray();
  }
}
