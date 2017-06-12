import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StyleSearch, initialStyleState } from '../../../tn-common/styles';
import { StylesControlsComponent } from './styles-controls.component';

describe('StylesControlComponent', () => {
  let component: StylesControlsComponent;
  let fixture: ComponentFixture<StylesControlsComponent>;
  const defaultQuery: StyleSearch = initialStyleState.search;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylesControlsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesControlsComponent);
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
      foundry: 1,
      designer: 3,
    };
    const filterValues = {
      visible: component.visibilityData.map((data) => data.value),
      categories: component.categoryData.map((data) => data.value),
    };
    component.searchForm.setValue(searchValues);
    component.filterForm.setValue(filterValues);
    expect(component.searchForm.value).toEqual(searchValues);
    expect(component.filterForm.value).toEqual(filterValues);
    component.clearFilters();
    expect(component.searchForm.value).toEqual({
      name: null,
      foundry: null,
      designer: null,
    });
    expect(component.filterForm.value).toEqual({
      visible: component.visibilityData.map(() => null),
      categories: component.categoryData.map(() => null),
    });
  });

});
