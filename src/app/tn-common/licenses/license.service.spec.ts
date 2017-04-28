import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { LicenseService } from './license.service';

describe('LicenseService', () => {
  let mockBackend: MockBackend;
  let licenseService: LicenseService;
  let apiClient: TnApiHttpService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    licenseService = new LicenseService(apiClient);
  });

  it('should create', () => {
    expect(licenseService).toBeTruthy();
  });
});
