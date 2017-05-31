import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { StyleService } from './style.service';

describe('StyleService', () => {
  let mockBackend: MockBackend;
  let styleService: StyleService;
  let apiClient: TnApiHttpService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    styleService = new StyleService(apiClient);
  });

  it('should create', () => {
    expect(styleService).toBeTruthy();
  });
});
