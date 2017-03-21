import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../tn-api-http/';
import { UserService } from './user.service';

describe('UserService', () => {
  let mockBackend: MockBackend;
  let userService: UserService;
  let apiClient: TnApiHttpService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    let options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    userService = new UserService(apiClient);
  });

  it('should create', () => {
    expect(userService).toBeTruthy();
  });
});
