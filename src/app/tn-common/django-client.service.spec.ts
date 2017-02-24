/* tslint:disable:no-unused-variable */
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  HttpModule,
  RequestMethod,
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

  const data = {
    full_bio: 'This a full bio.',
    person: 88,
    short_bio: 'Short bio.',
    job_title: 'A job title.'
  };

  const url = 'http://localhost:8000/api/1/people/';

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

  it('should fetch a single element by a given key', () => {
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Get, 'Not using GET method');
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      expect(connection.request.headers).toBeTruthy('No Headers');
      expect(connection.request.headers.get('Authorization'))
            .toBeTruthy('No Authorization field in Headers exist');
      expect(connection.request.headers.get('Authorization').length)
            .toBeGreaterThan(7, 'Content of Authorization is smaller than 7 characters');
      expect(connection.request.headers.get('Authorization').substring(0, 3))
            .toBe('JWT', 'Content of Authorization does not start with JWT');
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    djangoClientService.get(url, {}).subscribe((result) => {
      expect(result).toEqual(mockResponse, 'Response does not match');
    });
  });

  it('should create an element with the given data', () => {
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Post, 'Not using POST method');
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      expect(connection.request._body).toBe(data, 'Incorrect data sent');
      expect(connection.request.headers).toBeTruthy('No Headers');
      expect(connection.request.headers.get('Authorization'))
            .toBeTruthy('No Authorization field in Headers exist');
      expect(connection.request.headers.get('Authorization').length)
            .toBeGreaterThan(7, 'Content of Authorization is smaller than 7 characters');
      expect(connection.request.headers.get('Authorization').substring(0, 3))
            .toBe('JWT', 'Content of Authorization does not start with JWT');
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    djangoClientService.post(url, data, {}).subscribe((result) => {
      expect(result).toEqual(mockResponse, 'Response does not match');
    });
  });

  it('should send data to update an element to the proper url using the PUT method', () => {
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Put, 'Not using PUT method');
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      expect(connection.request._body).toBe(data, 'Incorrect data sent');
      expect(connection.request.headers).toBeTruthy('No Headers');
      expect(connection.request.headers.get('Authorization'))
            .toBeTruthy('No Authorization field in Headers exist');
      expect(connection.request.headers.get('Authorization').length)
            .toBeGreaterThan(7, 'Content of Authorization is smaller than 7 characters');
      expect(connection.request.headers.get('Authorization').substring(0, 3))
            .toBe('JWT', 'Content of Authorization does not start with JWT');
      connection.mockRespond(new Response(new ResponseOptions({
        body: 200
      })));
    });

    djangoClientService.put(url, data, {}).subscribe((result, status) => {
      expect(result).toEqual(200, 'Status is not 200');
    });
  });

  it('should send data to delete an element to the proper url using the DELETE method', () => {
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Delete,
                                             'Not using DELETE method');
      expect(connection.request.url).toBe(url, 'Incorrect URL used');
      expect(connection.request.headers).toBeTruthy('No Headers');
      expect(connection.request.headers.get('Authorization'))
            .toBeTruthy('No Authorization field in Headers exist');
      expect(connection.request.headers.get('Authorization').length)
            .toBeGreaterThan(7, 'Content of Authorization is smaller than 7 characters');
      expect(connection.request.headers.get('Authorization').substring(0, 3))
            .toBe('JWT', 'Content of Authorization does not start with JWT');
      connection.mockRespond(new Response(new ResponseOptions({
        body: 200
      })));
    });

    djangoClientService.delete(url, {}).subscribe((result) => {
      expect(result).toEqual(200, 'Status is not 200');
    });
  });

});
