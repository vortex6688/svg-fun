/* tslint:disable:no-unused-variable */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:max-classes-per-file */
import { TestBed, async, inject } from '@angular/core/testing';
import { Component, OpaqueToken } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TnCommonModule } from './tn-common.module';
import { TnApiHttpService, TnApiBaseUrl } from './tn-api-http';
import { AuthService, AuthActions } from './auth';
import { OrderService } from './orders';
import { LicenseService } from './licenses';
import { User, UserService } from './user';

@Component({ template: '', })
class TnCommonModuleProvidersTestComponent {
    constructor(public apiHttpService: TnApiHttpService,
                public authService: AuthService,
                public orderService: OrderService,
                public licenseService: LicenseService,
                public userService: UserService) {}
}

describe('TnCommonModule', () => {
  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => new BehaviorSubject({});
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [ TnCommonModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ TnCommonModuleProvidersTestComponent ],
      providers: [
        // must provide TnApiBaseUrl in order for the TnApiHttpService to build.
        { provide: TnApiBaseUrl, useValue: 'http://localhost:2222/' },
        // must provide UserActions and Store for AuthService.
        AuthActions,
        { provide: Store, useClass: MockStore },
      ],
    })
    .compileComponents();
  });

  it('should provide all the common services', () => {
    const fixture = TestBed.createComponent(TnCommonModuleProvidersTestComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
