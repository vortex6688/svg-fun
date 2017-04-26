import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

import { AuthService, Credentials } from '../../tn-common/auth';
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

class MockAuthService {
  public login(credentials: Credentials): Observable<User> {
    if (credentials.username === 'no_server') {
      return Observable.throw({status: 404, body: 'Not Found'});
    } else if (credentials.username === 'error') {
      return Observable.throw({status: 500, body: 'Internal Server Error'});
    } else if (credentials.username === user.username
        && credentials.password === user.password) {
      return Observable.of(user);
    } else {
      return Observable.throw({status: 401, body: 'Unauthorized'});
    }
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const credentials: Credentials = {
    username: 'jane@doe.com',
    password: 'correctPassword'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule ],
      providers: [ NgbActiveModal, {provide: AuthService, useClass: MockAuthService} ]
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

  it('should set the user if the credentials are correct', () => {
    expect(component.user).toBeFalsy('User already set prior to logIn!');
    component.credentials = credentials;
    component.login();
    expect(component.user).toBeTruthy('Did not set user!');
    expect(component.user.username).toBe(credentials.username,
                                         'Did not set the correct username!');
  });

  it('should return the errors if the credentials are incorrect', () => {
    component.credentials.password = 'incorrectPassword';
    component.login();
    expect(component.errorMessage).toBe('Invalid username or password', 'errorMessage not set');
    expect(component.user).toBeFalsy('User set after an erroneous logIn attempt!');
  });

  it('should return the errors if there is no conection to the server', () => {
    component.credentials.username = 'no_server';
    component.login();
    expect(component.errorMessage).toBe('The server can\'t be reached!', 'errorMessage not set');
    expect(component.user).toBeFalsy('User set after an erroneous logIn attempt!');
  });

  it('should return default error message if a different error happens', () => {
    component.credentials.username = 'error';
    component.login();
    expect(component.errorMessage).toBe('An error happened!', 'errorMessage not set');
    expect(component.user).toBeFalsy('User set after an erroneous logIn attempt!');
  });

});
