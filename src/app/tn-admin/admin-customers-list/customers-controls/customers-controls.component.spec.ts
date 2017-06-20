import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CustomersControlsComponent } from './customers-controls.component';

describe('CustomersControlComponent', () => {
  let component: CustomersControlsComponent;
  let fixture: ComponentFixture<CustomersControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersControlsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
