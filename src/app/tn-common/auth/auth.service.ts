import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Authorization, ANONYMOUS_AUTHORIZATION as ANONYMOUS } from './auth.model';
import { Credentials, RegistrationCredentials } from './credentials';
import { TnApiHttpService } from '../tn-api-http/tn-api-http.service';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth.actions';
/**
 * TypeNetwork Authentication Service.
 *
 * This is a Service that will connect to TypeNetwork to authenticate and unauthenticate
 * the requests of user.
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  @LocalStorage('AuthService.user', ANONYMOUS)
  protected user: Authorization;

  /**
   * Creates an instance of AuthService.
   *
   * We use the module TnApiHttpService to connect with our server and keep all the connections
   * in that injection.
   *
   * @param {TnApiHttpService} httpService
   * @param {LocalStorageService} storage
   * @param {Store} store
   * @param {AuthActions} authActions
   *
   * @memberOf AuthService
   */
  constructor(private httpService: TnApiHttpService, private storage: LocalStorageService,
              private store: Store<any>, private authActions: AuthActions) {
    if (this.user.token) {
      // User already logged in. Set the auth token.
      this.store.dispatch(this.authActions.loginSuccess(this.user));
    }

    this.httpService.errors$
      .filter((error) => error.status === 401 && !!this.user.token)
      .subscribe(() => this.store.dispatch(this.authActions.logout()));

    this.store.select((state) => state.auth.user).subscribe((user) => this.user = user);
  }

  /**
   * Authenticate and return the user with the authentication token.
   *
   * @public
   * @param {Credentials} [credentials] Credentials of the user to be registered.
   * @memberOf AuthService
   */
  public login(credentials: Credentials): Observable<Authorization> {
    return this.httpService.post('/auth/login/', credentials);
  }

  /**
   * Unauthenticate the user and return an empty object.
   *
   * @public
   *
   * @memberOf AuthService
   */
  public logout() {
    return this.httpService.post('/auth/logout/', {});
  }

  /**
   * Register the user and authenticate him and return the user with the authentication token.
   *
   * @public
   * @param {Credentials} [credentials] Credentials of the user to be registered.
   *
   * @memberOf AuthService
   */
  public register(credentials: RegistrationCredentials): Observable<Authorization> {
    return this.httpService.post('/api/1/user/', credentials);
  }
}
