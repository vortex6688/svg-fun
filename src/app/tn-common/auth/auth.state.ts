import { Authorization, ANONYMOUS_AUTHORIZATION } from '../auth/auth.model';

export interface AuthState {
  inProgress: boolean;
  user: Authorization;
  error?: object;
}

export const initialAuthState: AuthState = {
  inProgress: false,
  user: ANONYMOUS_AUTHORIZATION,
  error: null
};
