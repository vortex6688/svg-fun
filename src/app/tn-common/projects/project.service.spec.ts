import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let mockBackend: MockBackend;
  let projectService: ProjectService;
  let apiClient: TnApiHttpService;

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    projectService = new ProjectService(apiClient);
  });

  it('should create', () => {
    expect(projectService).toBeTruthy();
  });
});
