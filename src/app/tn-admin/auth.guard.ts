import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { getAuthState } from './store/reducers';

/**
 * AuthGuard gets auth state and checks if the user is
 * authorized and has the required permissions.
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {}

  /**
   * Get auth state, return true if user is authorized
   * and has staff or superuser flag. Redirec to /admin
   * otherwise
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {(Observable<boolean> | boolean)}
   *
   * @memberof AuthGuard
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | any {
    return this.store.select(getAuthState)
      .filter(({ inProgress }) => !inProgress)
      .map(({ user }) => {
        const canAccess = !!user && !!user.token && (user.is_staff || user.is_superuser);
        if (canAccess) {
          return true;
        }
        this.router.navigate(['/admin']);
        return false;
      });
  }
}
