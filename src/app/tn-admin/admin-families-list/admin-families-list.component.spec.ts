/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';

import { Family, FamilyActions, FamilySearch, initialFamilyState } from '../../tn-common/families';
import { AdminFamiliesListComponent } from './admin-families-list.component';
import { TnAdminStoreModule, productionReducer } from '../store';
import { TnCommonModule } from '../../tn-common/';

describe('AdminFamiliesListComponent', () => {
  let component: AdminFamiliesListComponent;
  let fixture: ComponentFixture<AdminFamiliesListComponent>;
  let store: Store<any>;

  class MockFamilyActions {
    public searchQuery = jasmine.createSpy('searchQuery');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        StoreModule.provideStore(productionReducer),
      ],
      declarations: [
        AdminFamiliesListComponent,
      ],
      providers: [
        { provide: FamilyActions, useClass: MockFamilyActions },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AdminFamiliesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
