/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UtilitiesDisplayPropertyComponent } from './utilities-display-property.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UtilitiesDisplayPropertyComponent', () => {
  let component: UtilitiesDisplayPropertyComponent;
  let fixture: ComponentFixture<UtilitiesDisplayPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([])],
      declarations: [ UtilitiesDisplayPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiesDisplayPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
