import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { SeriesService } from './series.service';

describe('UserService', () => {
  let mockBackend: MockBackend;
  let seriesService: SeriesService;
  let apiClient: TnApiHttpService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    seriesService = new SeriesService(apiClient);
  });

  it('should create', () => {
    expect(seriesService).toBeTruthy();
  });
});
