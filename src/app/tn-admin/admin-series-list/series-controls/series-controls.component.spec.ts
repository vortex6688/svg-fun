import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { SeriesSearch, initialSeriesState } from '../../../tn-common/series';
import { SeriesControlsComponent } from './series-controls.component';
import { Foundry } from '../../../tn-common/foundries';
import { DropdownOption } from '../../../tn-common/dropdown-input';

describe('SeriesControlComponent', () => {
  let component: SeriesControlsComponent;
  let fixture: ComponentFixture<SeriesControlsComponent>;
  let formBuilder: FormBuilder;
  const defaultQuery: SeriesSearch = initialSeriesState.search;
  const mockFoundry: Foundry = {
    id: 1,
    name: 'da real foundrier',
    slug: 'da-real-foundrier',
    logo: 'logo string',
    site_url: '',
    url: 'foundry url',
    bio: 'foundry bio',
    designers: [1, 2],
    ee_subdomain: 'eyeyeo',
    eula: 'eula contract',
    eula_title: 'realest contract',
    eula_subtitle: 'subbed eula',
    eula_web: 'eula for web',
    eula_epub: 'eula for epub',
    eula_app: 'eula for app',
    eula_desktop: 'eula for desktop',
    eula_web_self_hosted: 'eula for webeula_web_self_hosted',
    preface: '',
    postface: 'eula postface',
    eula_default: true,
  };
  const mockFoundryList: Foundry[] = [
    { ...mockFoundry, id: 2, name: 'foundr' },
    { ...mockFoundry, id: 3, name: 'supa' },
    { ...mockFoundry, id: 4, name: 'dupa' },
  ];

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
    component.foundries = mockFoundryList;
    formBuilder = TestBed.get(FormBuilder);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear all the filters', () => {
    component.searchForm = formBuilder.group({
      name: 'John',
      foundry: formBuilder.array([2, 3]),
    });
    component.clearFilters();
    expect(component.searchForm.value).toEqual({
      name: null,
      foundry: [],
    });
  });

  it('should update foundry list on changes', () => {
    const initialFoundryList: DropdownOption[] = mockFoundryList.map((foundry) => ({
      name: foundry.name,
      value: foundry.id,
      selected: false,
    }));
    const foundryQuery = {
      ...initialSeriesState.search,
      foundry: [mockFoundryList[0].id, mockFoundryList[1].id],
    };
    const moddedFoundries = [
      ...mockFoundryList,
      { ...mockFoundry, name: 'new', id: 22 }
    ];
    const moddedList = moddedFoundries.map((foundry) => ({
      name: foundry.name,
      value: foundry.id,
      selected: foundryQuery.foundry.indexOf(foundry.id) !== -1,
    }));
    component.ngOnChanges({ foundries: initialFoundryList });
    expect(component.foundryList).toEqual(initialFoundryList);

    component.foundries = moddedFoundries;
    component.initialQuery = foundryQuery;
    component.ngOnChanges({ foundries: moddedFoundries });
    expect(component.foundryList).toEqual(moddedList);
  });

  it('should update foundry selection', () => {
    const foundryOptions: DropdownOption[] = [
      { name: 'empty', selected: true, value: 2 },
      { name: 'empty', selected: false, value: 222 },
      { name: 'empty', selected: true, value: 44 },
    ];
    const expected = {
      ...component.searchForm.value,
      foundry: foundryOptions.filter((foundry) => foundry.selected).map((foundry) => foundry.value),
    };
    component.updateFoundry(foundryOptions);
    expect(component.searchForm.value).toEqual(expected);
  });

});
