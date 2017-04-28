/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContentTablesComponent } from './content-tables.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderByPipe } from '../../../tn-common/pipes/';

describe('ContentTablesComponent', () => {
  let component: ContentTablesComponent;
  let fixture: ComponentFixture<ContentTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([])],
      declarations: [ ContentTablesComponent, OrderByPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
