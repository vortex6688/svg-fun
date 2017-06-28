/* tslint:disable:max-classes-per-file */
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/Rx';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: MockRouter;
  let store: MockStore;
  let userState = new BehaviorSubject({});
  const user = {
    token: 'fake-token',
    is_staff: true,
    is_superuser: true,
  };

  class MockRouter {
    public navigate = jasmine.createSpy('navigate').and.callThrough();
  }

  class MockStore {
    public select = () => userState;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useClass: MockRouter },
        { provide: Store, useClass: MockStore },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authGuard = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    userState = new BehaviorSubject({});
  });

  it('should redirect on missing permissions or token', () => {
    userState.next({});
    authGuard.canActivate({} as any, {} as any).take(1).subscribe((result) => {
      expect(result).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    });

    userState.next({ user: { ...user, is_staff: false, is_superuser: false }});
    authGuard.canActivate({} as any, {} as any).take(1).subscribe((result) => {
      expect(result).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    });
  });

  it('should return true on correct permissions', () => {
    userState.next({ user: { ...user, is_staff: false, is_superuser: true }});
    authGuard.canActivate({} as any, {} as any).take(1).subscribe((result) => {
      expect(result).toBeTruthy();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
