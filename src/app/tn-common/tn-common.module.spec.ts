/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { Component, OpaqueToken } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TnCommonModule } from './tn-common.module';
import { TnApiHttpService, TnApiBaseUrl } from './tn-api-http';
import { AuthService } from './auth';
import { OrderService } from './orders';
import { User, UserService } from './user';

@Component({ template: '', })
class TnCommonModuleProvidersTestComponent {
    constructor(public apiHttpService: TnApiHttpService,
                public authService: AuthService,
                public orderService: OrderService,
                public userService: UserService) {}
}

describe('TnCommonModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [ TnCommonModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ TnCommonModuleProvidersTestComponent ],
      // must provide TnApiBaseUrl in order for the TnApiHttpService to build.
      providers: [ { provide: TnApiBaseUrl, useValue: 'http://localhost:2222/' } ]
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
