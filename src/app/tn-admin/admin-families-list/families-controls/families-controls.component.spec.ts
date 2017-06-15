import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { FamilySearch, initialFamilyState } from '../../../tn-common/families';
import { FamiliesControlsComponent } from './families-controls.component';
import { Foundry } from '../../../tn-common/foundries';
import { DropdownOption } from '../../../tn-common/dropdown-input';

describe('FamiliesControlComponent', () => {
  let component: FamiliesControlsComponent;
  let fixture: ComponentFixture<FamiliesControlsComponent>;
  let formBuilder: FormBuilder;
  const defaultQuery: FamilySearch = initialFamilyState.search;
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
      declarations: [ FamiliesControlsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesControlsComponent);
    component = fixture.componentInstance;
    component.initialQuery = {
      ...defaultQuery,
    };
    formBuilder = TestBed.get(FormBuilder);

    component.foundries = mockFoundryList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear all the filters', () => {
    component.searchForm = formBuilder.group({
      name: 'John',
      foundry: formBuilder.array([1, 2]),
      designer: 'one of em',
    });
    component.filterForm = formBuilder.group({
      visibility: formBuilder.array(component.visibilityData.map(() => true)),
      categories: formBuilder.array(component.categoriesData.map((data) => data.value)),
    });
    component.clearFilters();
    expect(component.searchForm.value).toEqual({
      name: null,
      foundry: [],
      designer: null,
    });
    expect(component.filterForm.value).toEqual({
      visibility: component.visibilityData.map(() => null),
      categories: component.categoriesData.map(() => null),
    });
  });

  it('should update foundry list on changes', () => {
    const initialFoundryList: DropdownOption[] = mockFoundryList.map((foundry) => ({
      name: foundry.name,
      value: foundry.id,
      selected: false,
    }));
    const foundryQuery = {
      ...initialFamilyState.search,
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
