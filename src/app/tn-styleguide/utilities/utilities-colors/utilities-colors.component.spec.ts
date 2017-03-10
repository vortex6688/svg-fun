/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UtilitiesColorsComponent } from './utilities-colors.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UtilitiesColorsComponent', () => {
  let component: UtilitiesColorsComponent;
  let fixture: ComponentFixture<UtilitiesColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([])],
      declarations: [ UtilitiesColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiesColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
