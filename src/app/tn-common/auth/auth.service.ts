import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user.model';
import { TnApiHttpService } from '../tn-api-http/tn-api-http.service';
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

  public user$: BehaviorSubject<User>;

  /**
   * Creates an instance of AuthService.
   *
   * We use the module TnApiHttpService to connect with our server and keep all the connections
   * in that injection.
   *
   * @param {TnApiHttpService} httpService
   *
   * @memberOf AuthService
   */
  constructor(private httpService: TnApiHttpService) {
    let user: User = JSON.parse(localStorage.getItem('user'));
    this.user$ = new BehaviorSubject<User>(user);
  };

  /**
   * Authenticate and return the user with the authentication token.
   *
   * @public
   * @param {string} [email] Email of the user to be authenticated.
   * @param {string} [password] Password of the user to be authenticated.
   *
   * @memberOf AuthService
   */
  public login(email: string, password: string): Observable<User> {
    return this.httpService.post('/auth/login/', {
        username: email,
        password
      })
      .map((res: any) => {
        let user: User = JSON.parse(res._body);
        this.httpService.setAuthToken(user.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.user$.next(user);
        return user;
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
        localStorage.removeItem('user');
        this.user$.unsubscribe();
      });
  }

  /**
   * Return a boolean if the user is authenticated.
   *
   * @public
   *
   * @memberOf AuthService
   */
  public isLoggedIn(): boolean {
    return !!this.user$.getValue();
  }

  /**
   * Register the user and authenticate him and return the user with the authentication token.
   *
   * @public
   * @param {string} [email] Email of the user to be registered.
   * @param {string} [password] Password of the user to be registered.
   *
   * @memberOf AuthService
   */
  public register(email: string, password: string): Observable<User> {
    return this.httpService.post('/api/1/user/', {
        username: email,
        email,
        password,
      })
      .map((res: any) => {
        let user: User = JSON.parse(res._body);
        this.httpService.setAuthToken(user.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.user$.next(user);
        return user;
      });
  }
}
