/* tslint:disable:max-classes-per-file */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';

import { AuthActions, Credentials } from '../../tn-common/auth';
import { User } from '../../tn-common/user/user.model';
import { LoginComponent } from './login.component';

const user: User = {
  id: 10,
  username: 'jane@doe.com',
  email: 'jane@doe.com',
  password: 'correctPassword',
  first_name: 'Jane',
  last_name: 'Doe',
  is_active: true,
  is_verified: true,
  is_admin: false,
  is_staff: false,
  can_invoice: true,
  tax_exempt: true,
  created_at: Date.now(),
  updated_at: Date.now(),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const credentials: Credentials = {
    username: 'jane@doe.com',
    password: 'correctPassword'
  };
  let storeSubject: BehaviorSubject<object>;

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
  }

  class MockAuthActions {
    public login = jasmine.createSpy('login');
  }

  beforeEach(async(() => {
    storeSubject = new BehaviorSubject({});

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule ],
      providers: [
        NgbActiveModal,
        { provide: Store, useClass: MockStore },
        { provide: AuthActions, useClass: MockAuthActions },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading flag', () => {
    expect(component.loading).toBeFalsy();
    storeSubject.next({});
    expect(component.loading).toBeFalsy();
    storeSubject.next({ inProgress: true });
    expect(component.loading).toBeTruthy();
  });

  it('should attempt to navigate away on login', () => {
    spyOn(component.activeModal, 'close');
    storeSubject.next({});
    expect(component.activeModal.close).not.toHaveBeenCalled();
    storeSubject.next({ isLoggedIn: true });
    expect(component.activeModal.close).toHaveBeenCalled();
  });

  it('should dispatch login action', () => {
    component.credentials = credentials;
    component.login();
    const actions = fixture.debugElement.injector.get(AuthActions);
    expect(actions.login).toHaveBeenCalledWith(credentials);
  });

  it('should set error messages', () => {
    // Should start clean
    expect(component.errorMessage).toEqual('', 'Expected no error message');

    // Should remain clean if no error
    storeSubject.next({});
    expect(component.errorMessage).toEqual('', 'Should remain empty');

    // Specific status messages
    storeSubject.next({
      error: { status: 404 }
    });
    expect(component.errorMessage).toEqual('The server can\'t be reached!');

    storeSubject.next({
      error: { status: 401 }
    });
    expect(component.errorMessage).toEqual('Invalid username or password');

    storeSubject.next({
      error: { status: 4 }
    });
    expect(component.errorMessage).toEqual('An error happened!');
  });

});
