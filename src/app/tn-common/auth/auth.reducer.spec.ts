import {
  inject,
  async,
} from '@angular/core/testing';

import { Authorization, ANONYMOUS_AUTHORIZATION as ANONYMOUS } from '../auth/auth.model';
import { AuthReducer } from './auth.reducer';
import { AuthActions } from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';
import { getUser, getProgress, getError } from './auth.selectors';

const authMock: Authorization = {
  id: 10,
  username: 'jane@doe.com',
  email: 'jane@doe.com',
  first_name: 'Jane',
  last_name: 'Doe',
  is_active: true,
  is_verified: true,
  is_superuser: false,
  is_staff: false,
  can_invoice: true,
  tax_exempt: true,
  created_at: Date.now(),
  updated_at: Date.now(),
  token: 'token',
};

describe('AuthReducer', () => {
  const mockedState = (results = []): AuthState => (initialAuthState);
  const authActions = new AuthActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = AuthReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected, 'Expected state to remain the same');
  });

  it('should set progress and clear error on LOGIN ', () => {
    const state = mockedState();
    const actual = AuthReducer(state, authActions.login());
    const expected = { ...state, inProgress: true, error: null };
    expect(actual).toEqual(expected, 'Expected progress and error to be updated');
  });

  it('should set auth data on LOGIN_SUCCESS ', () => {
    const state = mockedState();
    const actual = AuthReducer(state, authActions.loginSuccess(authMock));
    const expected = { ...state, user: authMock };
    expect(actual).toEqual(expected, 'Expected auth data to be updated');
  });

  it('should set error data on LOGIN_FAILED ', () => {
    const error = { isError: true, message: 'real error here' };
    const state = mockedState();
    const actual = AuthReducer(state, authActions.loginFailed(error));
    const expected = { ...state, error };
    expect(actual).toEqual(expected, 'Expected error data to be set');
  });

  it('should return to initial state on LOGOUT', () => {
    const state = mockedState();
    const actual = AuthReducer(state, authActions.logout());
    expect(actual).toEqual(initialAuthState, 'Logout should reset state');
  });

  it('should return user data on getUser call', () => {
    const initialState = mockedState();
    expect(getUser(initialState)).toBe(ANONYMOUS, 'Expected initial user data to equal anonymous');
    const authState = AuthReducer(initialState, authActions.loginSuccess(authMock));
    expect(getUser(authState)).toEqual(authMock, 'Expected user data');
  });

  it('should return progress flag on getProgress call', () => {
    const initialState = mockedState();
    expect(getProgress(initialState)).toBeFalsy('Expected progress to be false initially');
    const authState = AuthReducer(initialState, authActions.login());
    expect(getProgress(authState)).toBeTruthy('Expected progress to be true');
  });

  it('should return error data on getError call', () => {
    const error = { isError: true, message: 'real error here' };
    const initialState = mockedState();
    expect(getError(initialState)).toBeNull('Expected no error message initially');
    const authState = AuthReducer(initialState, authActions.loginFailed(error));
    expect(getError(authState)).toBeTruthy('Expected error message data');
  });
});
