/* tslint:disable:max-classes-per-file */
// angular imports
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// vendor imports
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';

// local imports
import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { AuthActions, ANONYMOUS_AUTHORIZATION as ANONYMOUS } from '../../tn-common/auth';
import { LoginComponent } from '../login';
// test subject
import { AdminNavbarComponent } from './admin-navbar.component';

describe('TnAdminNavbarComponent', () => {
  let component: AdminNavbarComponent;
  let fixture: ComponentFixture<AdminNavbarComponent>;
  const mockBackend: MockBackend = new MockBackend();
  let authActions: MockAuthActions;
  let storeSubject: BehaviorSubject<object>;
  let modalService: NgbModal;
  let routerSubject: BehaviorSubject<NavigationEnd>;
  const initialNavigation = new NavigationEnd(0, '', 'testUrl');
  class MockRouter {
    public events = routerSubject;
  }

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
  }

  class MockAuthActions {
    public logout = jasmine.createSpy('logout');
  }

  beforeEach(async(() => {
    routerSubject = new BehaviorSubject(initialNavigation);
    storeSubject = new BehaviorSubject(ANONYMOUS);
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot() ],
      declarations: [ AdminNavbarComponent ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: Store, useClass: MockStore },
        { provide: AuthActions, useClass: MockAuthActions },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavbarComponent);
    component = fixture.componentInstance;
    authActions = TestBed.get(AuthActions);
    modalService = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update variables on router events', () => {
    expect(component.currentUrl).toBe(initialNavigation.urlAfterRedirects);
    expect(component.isLayout).toBeFalsy();

    const expectedUrl = 'test/layout';
    routerSubject.next(new NavigationEnd(1, '', 'test/admin/layout'));
    expect(component.currentUrl).toBe(expectedUrl);
    expect(component.isLayout).toBeTruthy();

  });

  it('should call modalService on login', () => {
    spyOn(modalService, 'open');
    component.login();

    expect(modalService.open).toHaveBeenCalledWith(LoginComponent, { windowClass: 'modal-vert-centered' });
  });

  it('should call logout authAction on logout', () => {
    component.logout();
    expect(authActions.logout).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component.userSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.userSubscription.unsubscribe).toHaveBeenCalled();
  });
});
