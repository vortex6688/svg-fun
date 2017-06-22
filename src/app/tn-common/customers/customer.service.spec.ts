import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { CustomerService } from './customer.service';

describe('UserService', () => {
  let mockBackend: MockBackend;
  let customerService: CustomerService;
  let apiClient: TnApiHttpService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    customerService = new CustomerService(apiClient);
  });

  it('should create', () => {
    expect(customerService).toBeTruthy();
  });
});
