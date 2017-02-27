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

describe('AuthService', () => {
  let mockBackend: MockBackend;
  let authService: AuthService;
  let apiClient: TnApiHttpService;

  const successBody = {
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
    created_at: '2017-02-16',
    updated_at: '2017-02-16',
    token: 'token',
  };

  const successBodyLogout = {};

  const errorBody = {
    message: 'Username or password invalid'
  };

  const mockResponse = new Response(new ResponseOptions({
    body: JSON.stringify(successBody),
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseLogout = new Response(new ResponseOptions({
    body: JSON.stringify(successBodyLogout),
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
      mockBackend = new MockBackend();
      let options = new BaseRequestOptions();
      apiClient = new TnApiHttpService(mockBackend, options);
      authService = new AuthService(apiClient);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return the errors if the credentials are incorrect', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseError);
    });

    authService.login('jane@doe.com', 'incorrectPassword').subscribe((result) => {
      expect(result).toEqual(errorBody, 'Response does not match');
      expect(localStorage.getItem('user')).toBeFalsy('User info not deleted from store');
    });
  });

  it('should return the user on login', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    authService.login('jane@doe.com', 'password').subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      expect(JSON.parse(localStorage.getItem('user')))
        .toEqual(successBody, 'User data not saved in storage');
    });
  });

  it('should delete the user data from the storage on logout', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseLogout);
    });

    authService.logout().subscribe((result) => {
      expect(result).toEqual(successBodyLogout, 'Response does not match');
      expect(localStorage.getItem('user')).toBeFalsy('User info not deleted from store');
    });
  });

  it('should return false if the user is not logged in', () => {
    expect(authService.isLoggedIn()).toBeFalsy('Got true, but user is not logged-in');
  });

  it('should return true if the user is logged in', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    authService.login('jane@doe.com', 'password').subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
    });
    expect(authService.isLoggedIn()).toBeTruthy('Got false, but user is logged-in');
  });

  it('should return the user on login', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    authService.register('jane@doe.com', 'password').subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      expect(JSON.parse(localStorage.getItem('user')))
        .toEqual(successBody, 'User data not saved in storage');
    });
  });

});
