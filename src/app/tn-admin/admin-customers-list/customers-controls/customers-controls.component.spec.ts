import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SeriesSearch, initialSeriesState } from '../../../tn-common/series';
import { CustomersControlsComponent } from './customers-controls.component';

describe('SeriesControlComponent', () => {
  let component: CustomersControlsComponent;
  let fixture: ComponentFixture<CustomersControlsComponent>;
  const defaultQuery: SeriesSearch = initialSeriesState.search;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersControlsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersControlsComponent);
    component = fixture.componentInstance;
//    component.initialQuery = {
//      ...defaultQuery,
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
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
*/
});
