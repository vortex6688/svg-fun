/* tslint:disable:max-classes-per-file */
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TnApiHttpService } from '../tn-api-http/tn-api-http.service';
import { AuthService } from './auth.service';
import { AuthActions } from './auth.actions';
import { AuthEffects } from './auth.effects';
import { initialAuthState } from './auth.state';

describe('AuthEffects', () => {
  const mockUser = {
    id: 2,
    username: 'test',
    email: 'user',
    token: 'realToken',
  };

  let runner: EffectsRunner;
  let authEffects: AuthEffects;
  let authActions: AuthActions;
  let authService: MockAuthService;
  let httpService: MockHttpService;
  let logoutSubject;
  const error = 'Test error';

  class MockAuthService {
    public logout() {
      return logoutSubject;
    }

    public login(credentials: any) {
      return credentials.id === mockUser.id ? Observable.of(mockUser) : Observable.throw(error);
    }
  }

  class MockHttpService {
    public setAuthToken = jasmine.createSpy('setAuthToken');
  }

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      AuthActions,
      AuthEffects,
      {
        provide: AuthService,
        useClass: MockAuthService,
      },
      {
        provide: TnApiHttpService,
        useClass: MockHttpService,
      },
    ]
  }));

  beforeEach(() => {
    logoutSubject = new BehaviorSubject('null');
    httpService = TestBed.get(TnApiHttpService);
    authService = TestBed.get(AuthService);
    runner = TestBed.get(EffectsRunner);
    authActions = TestBed.get(AuthActions);
    authEffects = TestBed.get(AuthEffects);
  });

  describe('login$', () => {
    it('should return a login success action on success', () => {
      const expected = authActions.loginSuccess(mockUser);
      runner.queue(authActions.login(mockUser));

      authEffects.login$.subscribe(((data) => {
        expect(data).toEqual(expected);
      }));
    });

    it('should return a login fail action on fail', () => {
      const expected = authActions.loginFailed(error);
      runner.queue(authActions.login({}));

      authEffects.login$.subscribe(((data) => {
        expect(data).toEqual(expected);
        expect(httpService.setAuthToken).not.toHaveBeenCalled();
      }));
    });
  });

  describe('loginSuccess$', () => {
    it('should set token', () => {
      runner.queue(authActions.loginSuccess(mockUser));

      authEffects.loginSuccess$.subscribe(() => {
        expect(httpService.setAuthToken).toHaveBeenCalledWith(mockUser.token);
      });
    });
  });

  describe('logout$', () => {
    it('should call authService.logout', () => {
      runner.queue(authActions.logout());

      authEffects.logout$.subscribe((data) => {
        expect(logoutSubject.observers.length).toEqual(1);
        expect(httpService.setAuthToken).toHaveBeenCalledWith();
      });
    });

    it('should catch logout errors', () => {
      runner.queue(authActions.logout());

      logoutSubject = Observable.throw('error');
      authEffects.logout$.subscribe((data) => {
        expect(httpService.setAuthToken).toHaveBeenCalledWith();
      });
    });
  });
});
