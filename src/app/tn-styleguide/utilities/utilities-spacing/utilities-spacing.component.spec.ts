/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UtilitiesSpacingComponent } from './utilities-spacing.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UtilitiesSpacingComponent', () => {
  let component: UtilitiesSpacingComponent;
  let fixture: ComponentFixture<UtilitiesSpacingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([])],
      declarations: [ UtilitiesSpacingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiesSpacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
