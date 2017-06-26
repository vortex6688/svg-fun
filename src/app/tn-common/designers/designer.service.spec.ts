import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { DesignerService } from './designer.service';

describe('DesignerService', () => {
  let mockBackend: MockBackend;
  let designerService: DesignerService;
  let apiClient: TnApiHttpService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    designerService = new DesignerService(apiClient);
  });

  it('should create', () => {
    expect(designerService).toBeTruthy();
  });
});
