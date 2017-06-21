import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { FoundryService } from './foundry.service';

describe('FoundryService', () => {
  let mockBackend: MockBackend;
  let foundryService: FoundryService;
  let apiClient: TnApiHttpService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    foundryService = new FoundryService(apiClient);
  });

  it('should create', () => {
    expect(foundryService).toBeTruthy();
  });
});
