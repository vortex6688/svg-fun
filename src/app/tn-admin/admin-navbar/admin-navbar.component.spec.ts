import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ng2-webstorage';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { AuthService, ANONYMOUS_AUTHORIZATION as ANONYMOUS } from '../../tn-common/auth';

import { AdminNavbarComponent } from './admin-navbar.component';


describe('TnAdminNavbarComponent', () => {
  let component: AdminNavbarComponent;
  let fixture: ComponentFixture<AdminNavbarComponent>;
  let mockBackend: MockBackend = new MockBackend();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]) ],
      declarations: [ AdminNavbarComponent ],
      providers: [
        AuthService,
        LocalStorageService,
        {
           provide: TnApiHttpService,
           useFactory: () => { return new TnApiHttpService(mockBackend, new BaseRequestOptions()) }
        }
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
