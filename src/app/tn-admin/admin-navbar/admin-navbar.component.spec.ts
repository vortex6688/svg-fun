/* tslint:disable:max-classes-per-file */
// angular imports
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

// vendor imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';

// local imports
import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { AuthActions, ANONYMOUS_AUTHORIZATION as ANONYMOUS } from '../../tn-common/auth';
// test subject
import { AdminNavbarComponent } from './admin-navbar.component';

describe('TnAdminNavbarComponent', () => {
  let component: AdminNavbarComponent;
  let fixture: ComponentFixture<AdminNavbarComponent>;
  const mockBackend: MockBackend = new MockBackend();
  let storeSubject: BehaviorSubject<object>;

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
  }

  class MockAuthActions {
    public login = jasmine.createSpy('login');
  }

  beforeEach(async(() => {
    storeSubject = new BehaviorSubject(ANONYMOUS);
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]) ],
      declarations: [ AdminNavbarComponent ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: AuthActions, useClass: MockAuthActions },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
