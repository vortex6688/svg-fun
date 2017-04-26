/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsFormsComponent } from './components-forms.component';

describe('ComponentsFormsComponent', () => {
  let component: ComponentsFormsComponent;
  let fixture: ComponentFixture<ComponentsFormsComponent>;
  const additionalTimeout = 5000;

  beforeAll(() => {
    // grant more time due to timeouts on local tests. (dopry)
    // TODO: figure out how to ensure test completes in default timeout.
    jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmine.DEFAULT_TIMEOUT_INTERVAL + additionalTimeout;
  });

  afterAll(() => {
    // clear additional timeout.
    jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmine.DEFAULT_TIMEOUT_INTERVAL - additionalTimeout;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]), FormsModule ],
      declarations: [ ComponentsFormsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
