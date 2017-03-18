/* tslint:disable:no-unused-variable */
import {
  BaseRequestOptions,
  RequestMethod,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TnApiHttpService } from './tn-api-http.service';

describe('TnApiHttpService', () => {
  let apiClient: TnApiHttpService;
  let mockBackend: MockBackend;

  const baseUrl = 'http://localhost:2222/';

  const successBody = {
      id: 88,
      name: 'Jane Doe',
      slug: 'Jane_Doe',
      description: 'Lorem ipsum dolor',
      birth_date: '1927-02-15',
      death_date: '2017-02-16',
      foundry: [2],
      title: []
  };

  const errorBody = {
      name: 'This field may not be blank.'
  };

  const mockResponse = new Response(new ResponseOptions({
    body: JSON.stringify(successBody),
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseError = new Response(new ResponseOptions({
    body: JSON.stringify(errorBody),
    status: 401,
    statusText: 'Unauthorized'
  }));

  const data = {
    full_bio: 'This a full bio.',
    person: 88,
    short_bio: 'Short bio.',
    job_title: 'A job title.'
  };

  beforeEach(() => {
    mockBackend = new MockBackend();
    let options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
  });

  it('should be created', () => {
    expect(apiClient).toBeTruthy();
  });

  it('should setBaseUrl properly', () => {
    let path = 'api/users/1';
    let url = baseUrl + path;
    apiClient.setBaseUrl(baseUrl);

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
    });

    apiClient.get(path);
  });

  it('should un setBaseUrl properly', () => {
    let path = 'api/users/1';
    let url = baseUrl + path;
    apiClient.setBaseUrl(baseUrl);
    apiClient.setBaseUrl();

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.url).toBe(path, 'Incorrect URL used');
    });

    apiClient.get(path);
  });

  it('should not use BaseUrl when passed a full url', () => {
    let url = 'http://localhost:2223/test/test';
    apiClient.setBaseUrl(baseUrl);

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
    });

    apiClient.get(url);
  });

  it('should setAuthToken properly', () => {
    let token = 'token';
    apiClient.setAuthToken(token);

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.headers).toBeTruthy('Request Headers are no properly set.');
      expect(connection.request.headers.get('Authorization'))
            .toBeTruthy('Authorization Headers does not exist');
      expect(connection.request.headers.get('Authorization')).toBe('Token ' + token);
    });

    apiClient.get('/');
  });

  it('should un setAuthToken properly', () => {
    let token = 'token';
    apiClient.setAuthToken(token);
    apiClient.setAuthToken();

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.headers.get('Authorization'))
           .toBeFalsy('Authorization Headers should not exist');
      connection.mockRespond(mockResponse);
    });

    apiClient.get('/');
  });

  it('should unwrap json on get', () => {
    let url = 'http://localhost:2223/api/users/1';

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      connection.mockRespond(mockResponse);
    });

    apiClient.get(url).subscribe((results) => {
      expect(results).toEqual(successBody);
    });
  });

  it('should catch and rethrow errors on get', () => {
    let url = 'http://localhost:2223/api/users/1';

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      connection.mockError(mockResponseError);
    });

    apiClient.errors$.subscribe((error) => {
       expect(error).toBe(mockResponseError);
    });

    apiClient.get(url).subscribe(
      null,
      (error) => { expect(error).toBe(mockResponseError); },
      null
    );
  });

  it('should unwrap json on put', () => {
    let url = '/api/1/people/';

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Put, 'Not using PUT method');
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      expect(connection.request._body).toBe(data, 'Incorrect data sent');
      connection.mockRespond(mockResponse);
    });

    apiClient.put(url, data).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
  });

  it('should catch and rethrow errors on put', () => {
    let url = 'http://localhost:2223/api/users/1';

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      connection.mockError(mockResponseError);
    });

    apiClient.errors$.subscribe((error) => {
       expect(error).toBe(mockResponseError);
    });

    apiClient.put(url, data).subscribe(
      null,
      (error) => { expect(error).toBe(mockResponseError); },
      null
    );
  });

  it('should unwrap json on post', () => {
    let url = '/api/1/people/';

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Post, 'Not using POST method');
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      expect(connection.request._body).toBe(data, 'Incorrect data sent');
      connection.mockRespond(mockResponse);
    });

    apiClient.post(url, data).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
  });

  it('should catch and rethrow errors on post', () => {
    let url = 'http://localhost:2223/api/users/1';

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      connection.mockError(mockResponseError);
    });

    apiClient.errors$.subscribe((error) => {
       expect(error).toBe(mockResponseError);
    });

    apiClient.post(url, data).subscribe(
      null,
      (error) => { expect(error).toBe(mockResponseError); },
      null
    );
  });

  it('should unwrap json on delete', () => {
    let url = '/api/1/people/1';

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Delete, 'Not using DELETE method');
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      connection.mockRespond(mockResponse);
    });

    apiClient.delete(url).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match.');
    });
  });

  it('should catch and rethrow errors on delete', () => {
    let url = 'http://localhost:2223/api/users/1';

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      connection.mockError(mockResponseError);
    });

    apiClient.errors$.subscribe((error) => {
       expect(error).toBe(mockResponseError);
    });

    apiClient.delete(url).subscribe(
      null,
      (error) => { expect(error).toBe(mockResponseError); },
      null
    );
  });

});
