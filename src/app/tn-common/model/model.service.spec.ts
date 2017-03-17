import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../tn-api-http/';
import { ModelService } from './model.service';

class TestType {
  public id: number | string;
  public token?: string;
}

describe('ModelService', () => {
  let mockBackend: MockBackend;
  let modelService: ModelService<TestType>;
  let apiClient: TnApiHttpService;

  const query = { id: 10 };
  const element: TestType = { id: '10', token: 'token' };
  const successBody: TestType = element;
  const successBodyList: [TestType] = [successBody, successBody];
  const errorBody = { message: 'An error occured' };

  const mockResponse = new Response(new ResponseOptions({
    body: JSON.stringify(successBody),
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseList = new Response(new ResponseOptions({
    body: JSON.stringify(successBodyList),
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseError = new Response(new ResponseOptions({
    body: JSON.stringify(errorBody),
    status: 401,
    statusText: 'Unauthorized'
  }));

  beforeEach(() => {
    mockBackend = new MockBackend();
    let options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    modelService = new ModelService<TestType>(apiClient);
  });

  it('should create', () => {
    expect(apiClient).toBeTruthy();
  });

  /*
   * get()
   */
  it('should return a single Observable<T> on get in case of success', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    modelService.get('10').subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
  });

  it('should return an Observable<T> on get in case of error', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseError);
    });

    modelService.get('10').subscribe((result) => {
      expect(result).toEqual(errorBody, 'Error response does not match');
    });
  });

  it('should call the underlying get method from TnApiHttpService on get', () => {
    spyOn(apiClient, 'get');
    modelService.get('10');
    expect(apiClient.get).toHaveBeenCalledWith('10');
  });

  /*
   * find()
   */
  it('should return a list of Observable<T[]> on find in case of success', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseList);
    });

    modelService.find(query).subscribe((result) => {
      expect(result).toEqual(successBodyList, 'Response does not match');
    });
  });

  it('should return an Observable<T> on find in case of error', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseError);
    });

    modelService.find(query).subscribe((result) => {
      expect(result).toEqual(errorBody, 'Error response does not match');
    });
  });

  it('should call the underlying get method from TnApiHttpService on find', () => {
    spyOn(apiClient, 'get');
    modelService.find(query);
    expect(apiClient.get).toHaveBeenCalledWith('',
                                               new RequestOptions({body: query}));
  });

  /*
   * save()
   */
  it('should return the element being saved in case of success', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    modelService.save(element).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
  });

  it('should return an Observable<T> on find in case of error', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseError);
    });

    modelService.save(element).subscribe((result) => {
      expect(result).toEqual(errorBody, 'Error response does not match');
    });
  });

  it(`should call the underlying post method from TnApiHttpService on save
      when the element does not exist`, () => {
    spyOn(apiClient, 'post');
    modelService.save(element);
    expect(apiClient.post).toHaveBeenCalledWith('',
                                                new RequestOptions({body: element}));
  });

  it(`should call the underlying put method from TnApiHttpService on save
      when the element exists`, () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });
    spyOn(apiClient, 'put');
    modelService.save(element);
    expect(apiClient.put).toHaveBeenCalledWith(element.id,
                                               new RequestOptions({body: element}));
  });

  /*
   * delete()
   */
  it('should return an Observable<T> on delete in case of success', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    modelService.delete(element).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
  });

  it('should return an Observable<T> on delete in case of error', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseError);
    });

    modelService.delete(element).subscribe((result) => {
      expect(result).toEqual(errorBody, 'Error response does not match');
    });
  });

  it('should call the underlying delete method from TnApiHttpService on delete', () => {
    spyOn(apiClient, 'delete');
    modelService.delete(element);
    expect(apiClient.delete).toHaveBeenCalledWith(element.id);
  });

});
