/* tslint:disable:no-unused-variable */
import {
  BaseRequestOptions,
  ConnectionBackend,
  Headers,
  Http,
  HttpModule,
  RequestMethod,
  RequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { DjangoClientService } from './django-client.service';

describe('DjangoClientService', () => {
  let djangoClientService;
  let mockBackend;

  const mockResponse = {
    id: 88,
    name: 'Jane Doe',
    slug: 'Jane_Doe',
    description: 'Lorem ipsum dolor',
    birth_date: '1927-02-15',
    death_date: '2017-02-16',
    foundry: [2],
    title: []
  };

  const mockResponseError = {
    name: 'This field may not be blank.'
  };

  const data = {
    full_bio: 'This a full bio.',
    person: 88,
    short_bio: 'Short bio.',
    job_title: 'A job title.'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        DjangoClientService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  beforeEach(inject([DjangoClientService, MockBackend], (service, mock) => {
    djangoClientService = service;
    mockBackend = mock;
  }));

  it('should be created', () => {
    expect(djangoClientService).toBeTruthy();
  });

  it('should fetch a list of elements', () => {
    let url = '/api/1/people/';
    let fullUrl = djangoClientService.baseUrl + url;
    let mockListResponse = {
      count: 1,
      next: null,
      previous : null,
      results: [ mockResponse ]
    };
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Get, 'Not using GET method');
      expect(connection.request.url).toBe(fullUrl, 'Incorrect URL used');
      expect(connection.request.headers).toBeTruthy('No Headers');
      expect(connection.request.headers.get('Authorization'))
            .toBeTruthy('No Authorization field in Headers exist');
      expect(connection.request.headers.get('Authorization').length)
            .toBeGreaterThan(7, 'Content of Authorization is smaller than 7 characters');
      expect(connection.request.headers.get('Authorization').substring(0, 5))
            .toBe('Token', 'Content of Authorization does not start with Token');
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockListResponse)
      })));
    });

    djangoClientService.get(url).subscribe((result) => {
      expect(result).toEqual(mockListResponse, 'Response does not match');
    });
  });

  it('should fetch a single element by a given key', () => {
    let url = '/api/1/people/1';
    let fullUrl = djangoClientService.baseUrl + url;
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Get, 'Not using GET method');
      expect(connection.request.url).toBe(fullUrl, 'Incorrect URL used');
      expect(connection.request.headers).toBeTruthy('No Headers');
      expect(connection.request.headers.get('Authorization'))
            .toBeTruthy('No Authorization field in Headers exist');
      expect(connection.request.headers.get('Authorization').length)
            .toBeGreaterThan(7, 'Content of Authorization is smaller than 7 characters');
      expect(connection.request.headers.get('Authorization').substring(0, 5))
            .toBe('Token', 'Content of Authorization does not start with Token');
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    // Test branch when headers are already present
    let h = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: h});
    djangoClientService.get(url, options).subscribe((result) => {
      expect(result).toEqual(mockResponse, 'Response does not match');
    });
  });

  it('should create an element with the given data', () => {
    let url = '/api/1/people/';
    let fullUrl = djangoClientService.baseUrl + url;
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Post, 'Not using POST method');
      expect(connection.request.url).toBe(fullUrl, 'Incorrect URL used');
      expect(connection.request._body).toBe(data, 'Incorrect data sent');
      expect(connection.request.headers).toBeTruthy('No Headers');
      expect(connection.request.headers.get('Authorization'))
            .toBeTruthy('No Authorization field in Headers exist');
      expect(connection.request.headers.get('Authorization').length)
            .toBeGreaterThan(7, 'Content of Authorization is smaller than 7 characters');
      expect(connection.request.headers.get('Authorization').substring(0, 5))
            .toBe('Token', 'Content of Authorization does not start with Token');
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    djangoClientService.post(url, data).subscribe((result) => {
      expect(result).toEqual(mockResponse, 'Response does not match');
    });
  });

  it('should send data to update an element to the proper url using the PUT method', () => {
    let url = '/api/1/people/1';
    let fullUrl = djangoClientService.baseUrl + url;
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Put, 'Not using PUT method');
      expect(connection.request.url).toBe(fullUrl, 'Incorrect URL used');
      expect(connection.request._body).toBe(data, 'Incorrect data sent');
      expect(connection.request.headers).toBeTruthy('No Headers');
      expect(connection.request.headers.get('Authorization'))
            .toBeTruthy('No Authorization field in Headers exist');
      expect(connection.request.headers.get('Authorization').length)
            .toBeGreaterThan(7, 'Content of Authorization is smaller than 7 characters');
      expect(connection.request.headers.get('Authorization').substring(0, 5))
            .toBe('Token', 'Content of Authorization does not start with Token');
      connection.mockRespond(new Response(new ResponseOptions({
        body: 200
      })));
    });

    djangoClientService.put(url, data).subscribe((result) => {
      expect(result).toEqual(200, 'Status is not 200');
    });
  });

  it('unauthorized user try to update an element using the PUT method', async(() => {
    let url = '/api/1/people/1';
    let fullUrl = djangoClientService.baseUrl + url;
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Put, 'Not using PUT method');
      expect(connection.request.url).toBe(fullUrl, 'Incorrect URL used');
      connection.mockError(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponseError),
        status: 401,
        statusText: 'Unauthorized'
      })));
    });

    djangoClientService.put(url, data).subscribe(
      () => {
        fail('Expected error');
      },
      (error) => {
        expect(error).toBe('Server error');
      });
  }));

  it('should send data to delete an element to the proper url using the DELETE method', () => {
    let url = '/api/1/people/1';
    let fullUrl = djangoClientService.baseUrl + url;
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Delete,
                                             'Not using DELETE method');
      expect(connection.request.url).toBe(fullUrl, 'Incorrect URL used');
      expect(connection.request.headers).toBeTruthy('No Headers');
      expect(connection.request.headers.get('Authorization'))
            .toBeTruthy('No Authorization field in Headers exist');
      expect(connection.request.headers.get('Authorization').length)
            .toBeGreaterThan(7, 'Content of Authorization is smaller than 7 characters');
      expect(connection.request.headers.get('Authorization').substring(0, 5))
            .toBe('Token', 'Content of Authorization does not start with Token');
      connection.mockRespond(new Response(new ResponseOptions({
        body: {}
      })));
    });

    djangoClientService.delete(url).subscribe((result) => {
      expect(result).toEqual({}, 'Response is not empty');
    });
  });

});
