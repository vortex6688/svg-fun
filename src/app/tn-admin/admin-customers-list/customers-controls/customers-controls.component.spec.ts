import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { initialCustomerState } from '../../../tn-common/customers';
import { CustomersControlsComponent } from './customers-controls.component';

describe('CustomersControlComponent', () => {
  let component: CustomersControlsComponent;
  let fixture: ComponentFixture<CustomersControlsComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersControlsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersControlsComponent);
    formBuilder = TestBed.get(FormBuilder);
    component = fixture.componentInstance;
    component.initialQuery = { ...initialCustomerState.search };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear all the filters', () => {
    component.searchForm = formBuilder.group({
      name: 'John',
      email: 'mail@real',
      city: 'town',
      country: 'world',
    });
    component.clearFilters();
    expect(component.searchForm.value).toEqual({
      name: null,
      email: null,
      city: null,
      country: null,
    });
  });
});
