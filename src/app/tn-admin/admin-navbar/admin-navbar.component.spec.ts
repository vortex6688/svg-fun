import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';
import { AdminNavbarComponent } from './admin-navbar.component';
import { AuthService } from '../../tn-common/auth';

class MockAuthService {
  public $user;
}

describe('TnAdminNavbarComponent', () => {
  let component: AdminNavbarComponent;
  let fixture: ComponentFixture<AdminNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]) ],
      declarations: [ AdminNavbarComponent ],
      providers: [ {provide: AuthService, useClass: MockAuthService} ]
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
