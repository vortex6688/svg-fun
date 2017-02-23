/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LayoutResponsiveUtilitiesComponent } from './layout-responsive-utilities.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutResponsiveUtilitiesComponent', () => {
  let component: LayoutResponsiveUtilitiesComponent;
  let fixture: ComponentFixture<LayoutResponsiveUtilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([])],
      declarations: [ LayoutResponsiveUtilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutResponsiveUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
