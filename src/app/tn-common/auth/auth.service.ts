import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Authorization, ANONYMOUS_AUTHORIZATION as ANONYMOUS } from './auth.model';
import { Credentials, RegistrationCredentials } from './credentials';
import { TnApiHttpService } from '../tn-api-http/tn-api-http.service';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs/Rx';

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

  public user$: BehaviorSubject<Authorization>;

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
   *
   * @memberOf AuthService
   */
  constructor(private httpService: TnApiHttpService, private storage: LocalStorageService) {
    // create behavior subject with initial value.
    this.user$ = new BehaviorSubject<Authorization>(this.user);
    // subscribe to storage changes. (when this.user is set is should trigger storage update)
    this.storage.observe('AuthService.user').subscribe(this.user$);
    if (this.user.token) {
      // User already logged in. Set the auth token.
      this.httpService.setAuthToken(this.user.token);
    }

    this.httpService.errors$.subscribe((error) => {
      if (this.user.token && error.status === 401) {
        this.cleanAuth();
      }
    });
  }

  /**
   * Authenticate and return the user with the authentication token.
   *
   * @public
   * @param {Credentials} [credentials] Credentials of the user to be registered.
   * @memberOf AuthService
   */
  public login(credentials: Credentials): Observable<Authorization> {
    return this.httpService.post('/auth/login/', credentials)
      .map((user: any) => {
        this.httpService.setAuthToken(user.token);
        // if the user$ behavior subject is subscribed to
        // this.user it should automatically get it's next called.
        return this.user = user;
      });
  }

  /**
   * Unauthenticate the user and return an empty object.
   *
   * @public
   *
   * @memberOf AuthService
   */
  public logout() {
    this.httpService.post('/auth/logout/', {})
      .subscribe((res: any) => this.cleanAuth());
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
    return this.httpService.post('/api/1/user/', credentials)
      .map((user: any) => {
        this.httpService.setAuthToken(user.token);
        // if the user$ behavior subject is subscribed to
        // this.user it should automatically get it's next called.
        return this.user = user;
      });
  }

  /**
   * Reset authentication token and set user to anonymous.
   *
   * @private
   * @memberOf AuthService
   */
  private cleanAuth() {
    this.httpService.setAuthToken();
    this.user = ANONYMOUS;
  }
}
