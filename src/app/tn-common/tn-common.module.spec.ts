/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TnCommonModule  } from './tn-common.module';
import { TnApiHttpService } from './tn-api-http';

@Component({ template: '' })
class TnApiHttpServiceTestComponent {
    constructor(public apiHttpService: TnApiHttpService) {}
}

describe('TnCommonModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [ TnCommonModule ],
      declarations: [ TnApiHttpServiceTestComponent ]
    })
    .compileComponents();
  });

  it('should provide the TnApiHttpService', () => {
    let fixture = TestBed.createComponent(TnApiHttpServiceTestComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
