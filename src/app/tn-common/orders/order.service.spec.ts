import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { OrderService } from './order.service';

describe('UserService', () => {
  let mockBackend: MockBackend;
  let orderService: OrderService;
  let apiClient: TnApiHttpService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    let options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    orderService = new OrderService(apiClient);
  });

  it('should create', () => {
    expect(orderService).toBeTruthy();
  });
});
