/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';

import { Series, SeriesActions, SeriesSearch, initialSeriesState } from '../../tn-common/series';
import { AdminSeriesListComponent } from './admin-series-list.component';
import { TnAdminStoreModule, storeAssets, productionReducer } from '../store';
import { TnCommonModule } from '../../tn-common/';

describe('AdminSeriesListComponent', () => {
  let component: AdminSeriesListComponent;
  let fixture: ComponentFixture<AdminSeriesListComponent>;
  let store: Store<any>;

  class MockSeriesActions {
    public searchQuery = jasmine.createSpy('searchQuery');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        StoreModule.provideStore(productionReducer),
      ],
      declarations: [
        AdminSeriesListComponent,
      ],
      providers: [
        { provide: SeriesActions, useClass: MockSeriesActions },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AdminSeriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
