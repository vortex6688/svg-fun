import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class AuthActions {
  public static LOGIN: string = '[Auth] LOGIN';
  public static LOGIN_SUCCESS: string = '[Auth] LOGIN Success';
  public static LOGIN_FAILED: string = '[Auth] LOGIN Failed';
  public static LOGOUT: string = '[Auth] LOGOUT';

  public login = ActionCreatorFactory.create(AuthActions.LOGIN);
  public loginSuccess = ActionCreatorFactory.create(AuthActions.LOGIN_SUCCESS);
  public loginFailed = ActionCreatorFactory.create(AuthActions.LOGIN_FAILED);
  public logout = ActionCreatorFactory.create(AuthActions.LOGOUT);
}
