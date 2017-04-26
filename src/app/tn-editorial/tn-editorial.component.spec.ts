import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

// Load the implementations that should be tested
import { TnEditorialComponent } from './tn-editorial.component';

describe(`Editorial`, () => {
  let fixture: ComponentFixture<TnEditorialComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnEditorialComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(TnEditorialComponent);
    fixture.detectChanges(); // trigger initial data binding
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(fixture.componentInstance).toBeDefined();
  });
});
