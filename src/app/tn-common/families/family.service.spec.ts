import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { FamilyService } from './family.service';

describe('UserService', () => {
  let mockBackend: MockBackend;
  let familyService: FamilyService;
  let apiClient: TnApiHttpService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    familyService = new FamilyService(apiClient);
  });

  it('should create', () => {
    expect(familyService).toBeTruthy();
  });
});
