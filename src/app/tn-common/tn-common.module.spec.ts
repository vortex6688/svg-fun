/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { Component, OpaqueToken } from '@angular/core';
import { TnCommonModule } from './tn-common.module';
import { TnApiHttpService } from './tn-api-http';
import { AuthService } from './auth';
import { ModelService, MODEL_URL } from './model';
import { User } from './user/user.model';

@Component({ template: '', })
//             providers: [{ provide: MODEL_URL, useValue: 'someValue', deps: OpaqueToken }]
// })
class TnCommonModuleProvidersTestComponent {
    constructor(public apiHttpService: TnApiHttpService,
                public authService: AuthService,
                /* public modelService: ModelService<User> */) {}
}

describe('TnCommonModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [ TnCommonModule ],
      declarations: [ TnCommonModuleProvidersTestComponent ]
    })
    .compileComponents();
  });

  it('should provide all the common services', () => {
    let fixture = TestBed.createComponent(TnCommonModuleProvidersTestComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
