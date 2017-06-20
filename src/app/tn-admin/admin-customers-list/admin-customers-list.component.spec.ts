/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';

import { AdminCustomersListComponent } from './admin-customers-list.component';
import { TnCommonModule } from '../../tn-common/';

describe('AdminCustomersListComponent', () => {
  let component: AdminCustomersListComponent;
  let fixture: ComponentFixture<AdminCustomersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AdminCustomersListComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
