import { createSelector } from 'reselect';

import { AuthState } from './auth.state';

/**
 * Returns auth token.
 * @param {AuthState} state
 */
export const getUser = (state: AuthState) => state.user;
export const getProgress = (state: AuthState) => state.inProgress;
export const getError = (state: AuthState) => state.error;
