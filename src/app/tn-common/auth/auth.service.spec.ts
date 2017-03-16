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
import { ANONYMOUS_AUTHORIZATION } from './auth.model';

describe('AuthService', () => {
  let mockBackend: MockBackend;
  let authService: AuthService;
  let apiClient: TnApiHttpService;
  let storage: LocalStorageService;

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

    authService.login(credentials).subscribe(
      null,
      (error) => {
        expect(error).toBe(mockResponseError);
        expect(storage.retrieve('AuthService.user'))
          .toEqual(ANONYMOUS_AUTHORIZATION, 'User data not saved in storage');
        expect(authService.user$.getValue()).toEqual(ANONYMOUS_AUTHORIZATION,
          'Subject user$ does not contain the Anonymous User');
      },
      null
    );

    apiClient.errors$.subscribe((error) => {
       expect(error).toBe(mockResponseError);
    });
  });

  it('should return the user on login', () => {
    let credentials = { username: 'jane@doe.com', password: 'password' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    authService.login(credentials).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      expect(storage.retrieve('AuthService.user'))
        .toEqual(successBody, 'User data not saved in storage');
      expect(authService.user$.getValue()).toEqual(successBody,
        'Subject user$ does not contain the User');
    });
  });

  it('should delete the user data from the storage on logout', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponseLogout);
    });

    authService.logout().subscribe((result) => {
      expect(result).toEqual(ANONYMOUS_AUTHORIZATION, 'Response does not match');
      expect(storage.retrieve('AuthService.user'))
        .toEqual(ANONYMOUS_AUTHORIZATION, 'User data not saved in storage');
      expect(authService.user$.getValue()).toEqual(ANONYMOUS_AUTHORIZATION,
        'Subject user$ does not contain the Anonymous User');
    });
  });

  it('should return the user on register', () => {
    let credentials = { email: 'jane@doe.com', username: 'jane@doe.com',
      password: 'password' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    authService.register(credentials).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      expect(storage.retrieve('AuthService.user'))
        .toEqual(successBody, 'User data not saved in storage');
      expect(authService.user$.getValue()).toEqual(successBody,
        'Subject user$ does not contain the User');
    });
  });

});
