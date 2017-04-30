/* tslint:disable:max-classes-per-file */
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
import { LocalStorageService } from 'ngx-webstorage';
import { AuthActions, ANONYMOUS_AUTHORIZATION, Authorization, initialAuthState, AuthState } from '../auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('AuthService', () => {
  let mockBackend: MockBackend;
  let authService: AuthService;
  let apiClient: TnApiHttpService;
  let storage: LocalStorageService;
  let authActions;
  let store;
  let storeSubject: BehaviorSubject<Authorization>;

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
    status: 200,
    statusText: 'Success'
  }));

  const mockResponseError = new Response(new ResponseOptions({
    body: JSON.stringify(errorBody),
    status: 401,
    statusText: 'Unauthorized'
  }));

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
  }

  class MockAuthActions {
    public loginSuccess = jasmine.createSpy('loginSuccess');
    public logout = jasmine.createSpy('logout');
  }

  const data = {
    first_name: 'Jane',
    last_name: 'Doe'
  };

  beforeEach(() => {
    storeSubject = new BehaviorSubject(ANONYMOUS_AUTHORIZATION);
    storage = new LocalStorageService();
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    authActions = new MockAuthActions();
    store = new MockStore();
    authService = new AuthService(apiClient, storage, store, authActions);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should dispatch store event on 401 and logged user', () => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockError(mockResponseError);
    });

    // Test on just 401 without user
    apiClient.get('').subscribe(null, (error) => {
      expect(error).toBe(mockResponseError);
      expect(authActions.logout).not.toHaveBeenCalled();
    });

    // Test with user
    storeSubject.next(successBody);
    apiClient.get('').subscribe(null, (error) => {
      expect(error).toBe(mockResponseError);
      expect(authActions.logout).toHaveBeenCalled();
    });
  });

  it('should update storage on user events', () => {
    expect(storage.retrieve('AuthService.user')).toBe(ANONYMOUS_AUTHORIZATION, 'Storage should have initial value');
    storeSubject.next(successBody);
    expect(storage.retrieve('AuthService.user')).toBe(successBody, 'Should have updated user');
  });

  it('should return the errors if the credentials are incorrect', () => {
    const credentials = { username: 'jane@doe.com', password: 'incorrectPassword' };

    mockBackend.connections.subscribe((connection) => {
      connection.mockError(mockResponseError);
    });

    authService.login(credentials).subscribe(
      null,
      (error) => {
        expect(error).toBe(mockResponseError);
      },
      null
    );

  });

  it('should login users with proper credentials', () => {
    const credentials = { username: 'jane@doe.com', password: 'password' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });
    spyOn(apiClient, 'setAuthToken');

    authService.login(credentials).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      expect(apiClient.setAuthToken).toHaveBeenCalledWith(successBody.token);
    });
  });

  it('should set the Auth Token when it is created, if the user is already logged in', () => {
    spyOn(apiClient, 'setAuthToken');
    storage.store('AuthService.user', successBody);
    const aNewAuthService = new AuthService(apiClient, storage, store, authActions);
    expect(apiClient.setAuthToken).toHaveBeenCalledWith(successBody.token);
    expect(authActions.loginSuccess).toHaveBeenCalledWith(successBody);
  });

  it('should logout users', () => {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url.indexOf('/auth/login/') !== -1 ) {
        connection.mockRespond(mockResponse);
      } else {
        connection.mockRespond(mockResponseLogout);
      }
    });
    spyOn(apiClient, 'setAuthToken');

    const credentials = { username: 'jane@doe.com', password: 'password' };
    storage.store('AuthService.user', successBody);
    authService.logout().subscribe(() => {
      expect(apiClient.setAuthToken).toHaveBeenCalledWith();
    });
  });

  it('should login and keep user credentials across AuthService instances', () => {
    const credentials = { username: 'jane@doe.com', password: 'password' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });

    authService.login(credentials).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      storage.store('AuthService.user', successBody);
      const authService2 = new AuthService(apiClient, storage, store, authActions);
      expect(authActions.loginSuccess).toHaveBeenCalledWith(successBody);
    });
  });

  it('should register new users', () => {
    const credentials = { email: 'jane@doe.com', username: 'jane@doe.com',
      password: 'password' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(mockResponse);
    });
    spyOn(apiClient, 'setAuthToken');

    authService.register(credentials).subscribe((result) => {
      expect(result).toEqual(successBody, 'Response does not match');
      expect(apiClient.setAuthToken).toHaveBeenCalledWith(successBody.token);
    });
  });

});
