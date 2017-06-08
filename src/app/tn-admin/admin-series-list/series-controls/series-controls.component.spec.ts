import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SeriesSearch, initialSeriesState } from '../../../tn-common/series';
import { SeriesControlsComponent } from './series-controls.component';

describe('SeriesControlComponent', () => {
  let component: SeriesControlsComponent;
  let fixture: ComponentFixture<SeriesControlsComponent>;
  const defaultQuery: SeriesSearch = initialSeriesState.search.query;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesControlsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesControlsComponent);
    component = fixture.componentInstance;
    component.initialQuery = {
      ...defaultQuery,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear all the filters', () => {
    const searchValues = {
      name: 'John',
      foundry: 'all of em',
    };
    component.searchForm.setValue(searchValues);
    expect(component.searchForm.value).toEqual(searchValues);
    component.clearFilters();
    expect(component.searchForm.value).toEqual({
      name: null,
      foundry: null,
    });
  });

});
