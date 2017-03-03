/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UtilitiesCloseIconComponent } from './utilities-close-icon.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UtilitiesCloseIconComponent', () => {
  let component: UtilitiesCloseIconComponent;
  let fixture: ComponentFixture<UtilitiesCloseIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([])],
      declarations: [ UtilitiesCloseIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiesCloseIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
