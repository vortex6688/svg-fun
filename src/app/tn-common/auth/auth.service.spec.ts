/* tslint:disable:no-unused-variable */
/* tslint:disable:no-shadowed-variable */
import {
  Response,
  ResponseOptions,
  BaseRequestOptions
} from '@angular/http';
import { AuthService } from './auth.service';
import { MockBackend } from '@angular/http/testing';
import { TnApiHttpService } from '../tn-api-http/tn-api-http.service';
import { LocalStorageService } from 'ng2-webstorage';
import { ANONYMOUS_AUTHORIZATION, Authorization } from './auth.model';

describe('AuthService', () => {
  let mockBackend: MockBackend;
  let authService: AuthService;
  let apiClient: TnApiHttpService;
  let storage: LocalStorageService;

  const successBody: Authorization = {
    id: 10,
    username: 'jane@doe.com',
    email: 'jane@doe.com',
    first_name: 'Jane',
    last_name: 'Doe',
    is_active: true,
    is_verified: true,
    is_admin: false,
    is_staff: false,
    can_invoice: true,
    tax_exempt: true,
    created_at: Date.now(),
    updated_at: Date.now(),
    token: 'token',
  };

  const errorBody = {
    message: 'Username or password invalid'
  };

  const mockResponse = new Response(new ResponseOptions({
    body: JSON.stringify(successBody),
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseLogout = new Response(new ResponseOptions({
    body: JSON.stringify(null),
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseError = new Response(new ResponseOptions({
    body: JSON.stringify(errorBody),
    status: 401,
    statusText: 'Unauthorized'
  }));

  const data = {
    first_name: 'Jane',
    last_name: 'Doe'
  };

  beforeEach(() => {
    storage = new LocalStorageService();
    mockBackend = new MockBackend();
    let options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    authService = new AuthService(apiClient, storage);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return the errors if the credentials are incorrect', () => {
    let credentials = { username: 'jane@doe.com', password: 'incorrectPassword' };

    mockBackend.connections.subscribe((connection) => {
      connection.mockError(mockResponseError);
    });

    let observer = jasmine.createSpy('observer');
    authService.user$.subscribe(observer);

    apiClient.errors$.subscribe((error) => {
       expect(error).toBe(mockResponseError);
    });

    authService.login(credentials).subscribe(
      null,
      (error) => {
        expect(error).toBe(mockResponseError);
        expect(storage.retrieve('AuthService.user'))
          .toEqual(ANONYMOUS_AUTHORIZATION, 'User data not saved in storage');
        expect(authService.user$.getValue()).toEqual(ANONYMOUS_AUTHORIZATION,
          'Subject user$ does not contain the Anonymous User');
        expect(observer).toHaveBeenCalledTimes(1);
        expect(observer.calls.argsFor(0)).toContain(ANONYMOUS_AUTHORIZATION,
          'user$ should call subscribers with an initial value.');
      },
      null
    );

  });

  it('should login users with proper credentials', () => {
    let credentials = { username: 'jane@doe.com', password: 'password' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    let observer = jasmine.createSpy('observer');
    authService.user$.subscribe(observer);

    authService.login(credentials).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      expect(storage.retrieve('AuthService.user'))
        .toEqual(successBody, 'User data not saved in storage');
      expect(authService.user$.getValue()).toEqual(successBody,
        'Subject user$ does not contain the User');
      expect(observer).toHaveBeenCalledTimes(2);
      expect(observer.calls.argsFor(0)).toContain(ANONYMOUS_AUTHORIZATION,
          'user$ should call subscribers with an initial value.');
      expect(observer.calls.argsFor(1)).toContain(successBody,
          'user$ should call subscribers on successful login.');
    });
  });

  it('should logout users', () => {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url.indexOf('/auth/login/') > -1 ) {
        connection.mockRespond(mockResponse);
      } else {
        connection.mockRespond(mockResponseLogout);
      }
    });

    let observer = jasmine.createSpy('observer');
    authService.user$.subscribe(observer);

    let credentials = { username: 'jane@doe.com', password: 'password' };
    authService.login(credentials).subscribe(() => {
      // verify we're starting with a logged in user.
      expect(authService.user$.getValue()).toEqual(successBody,
          'Subject user$ does not contain an Authenticated user');
      expect(observer).toHaveBeenCalledTimes(2);
      expect(observer.calls.argsFor(1)).toContain(successBody,
          'user$ does show login event');
      // now logout
      authService.logout().subscribe((result) => {
        expect(result).toEqual(ANONYMOUS_AUTHORIZATION, 'Response does not match');
        expect(storage.retrieve('AuthService.user'))
          .toEqual(ANONYMOUS_AUTHORIZATION, 'User data not saved in storage');
        expect(authService.user$.getValue()).toEqual(ANONYMOUS_AUTHORIZATION,
          'Subject user$ does not contain the Anonymous User');
        expect(observer).toHaveBeenCalledTimes(3);
        expect(observer.calls.argsFor(2)).toContain(ANONYMOUS_AUTHORIZATION,
          'user$ does not show logout event');
      });
    });

  });

  it('should register new users', () => {
    let credentials = { email: 'jane@doe.com', username: 'jane@doe.com',
      password: 'password' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    let observer = jasmine.createSpy('observer');
    authService.user$.subscribe(observer);
    expect(observer).toHaveBeenCalledTimes(1);
    expect(observer.calls.argsFor(0)).toContain(ANONYMOUS_AUTHORIZATION);

    authService.register(credentials).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      expect(storage.retrieve('AuthService.user'))
        .toEqual(successBody, 'User data not saved in storage');
      expect(authService.user$.getValue()).toEqual(successBody,
        'Subject user$ does not contain the User');
      expect(observer).toHaveBeenCalledTimes(2);
      expect(observer.calls.argsFor(1)).toContain(successBody,
          'user$ does show login event');
    });
  });

});
