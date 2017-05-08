/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UtilitiesPositionComponent } from './utilities-position.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UtilitiesPositionComponent', () => {
  let component: UtilitiesPositionComponent;
  let fixture: ComponentFixture<UtilitiesPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([])],
      declarations: [ UtilitiesPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiesPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
