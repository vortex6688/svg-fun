import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Authorization, ANONYMOUS_AUTHORIZATION } from './auth.model';
import { Credentials, RegistrationCredentials } from './credentials';
import { TnApiHttpService } from '../tn-api-http/tn-api-http.service';
import { LocalStorageService, LocalStorage } from 'ng2-webstorage';
import { BehaviorSubject } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

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

  @LocalStorage('AuthService.user')
  protected user = ANONYMOUS_AUTHORIZATION;

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
    this.user$ = new BehaviorSubject<Authorization>(this.user);
    this.storage.observe('AuthService.user').subscribe(this.user$);
    this.httpService.setBaseUrl(environment.djangoBaseUrl);
  };

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
    return this.httpService.post('/auth/logout/', {})
      .map((res: any) => {
        this.httpService.setAuthToken();
        return this.user = ANONYMOUS_AUTHORIZATION;
      });
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
}
