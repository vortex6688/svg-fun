import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { StyleSearch, initialStyleState } from '../../../tn-common/styles';
import { StylesControlsComponent } from './styles-controls.component';
import { Foundry } from '../../../tn-common/foundries';
import { Designer } from '../../../tn-common/designers';
import { DropdownOption } from '../../../tn-common/dropdown-input';

describe('StylesControlComponent', () => {
  let component: StylesControlsComponent;
  let fixture: ComponentFixture<StylesControlsComponent>;
  let formBuilder: FormBuilder;
  const defaultQuery: StyleSearch = initialStyleState.search;
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
  const mockDesigner: Designer = {
    id: 1,
    name: 'mega designer',
    slug: 'mega-designer',
    description: 'loves design',
    birth_date: '1999/11/30',
    death_date: '1999/12/30',
    foundry: [2],
    title: [1],
  };
  const mockFoundryList: Foundry[] = [
    { ...mockFoundry, id: 2, name: 'foundr' },
    { ...mockFoundry, id: 3, name: 'supa' },
    { ...mockFoundry, id: 4, name: 'dupa' },
  ];
  const mockDesignerList: Designer[] = [
    { ...mockDesigner, id: 2, name: 'foundr' },
    { ...mockDesigner, id: 3, name: 'supa' },
    { ...mockDesigner, id: 4, name: 'dupa' },
  ];

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
    component.foundries = mockFoundryList;
    component.designers = mockDesignerList;
    formBuilder = TestBed.get(FormBuilder);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear all the filters', () => {
    component.searchForm = formBuilder.group({
      name: 'John',
      foundry: formBuilder.array([2]),
      designer: formBuilder.array([3]),
    });
    component.filterForm = formBuilder.group({
      visible: formBuilder.array(component.visibilityData.map((data) => data.value)),
      categories: formBuilder.array(component.categoryData.map((data) => data.value)),
    });
    component.clearFilters();
    expect(component.searchForm.value).toEqual({
      name: null,
      foundry: [],
      designer: [],
    });
    expect(component.filterForm.value).toEqual({
      visible: component.visibilityData.map(() => null),
      categories: component.categoryData.map(() => null),
    });
  });

  it('should update item lists on changes', () => {
    const initialFoundryList: DropdownOption[] = mockFoundryList.map((foundry) => ({
      name: foundry.name,
      value: foundry.id,
      selected: false,
    }));
    const initialDesignerList: DropdownOption[] = mockDesignerList.map((designer) => ({
      name: designer.name,
      value: designer.id,
      selected: false,
    }));
    const query = {
      ...initialStyleState.search,
      foundry: [mockFoundryList[0].id, mockFoundryList[1].id],
      designer: [mockDesignerList[0].id, mockDesignerList[1].id],
    };
    const moddedFoundries = [
      ...mockFoundryList,
      { ...mockFoundry, name: 'new', id: 22 }
    ];
    const moddedDesigners = [
      ...mockDesignerList,
      { ...mockDesigner, name: 'new', id: 22 }
    ];
    const foundryList = moddedFoundries.map((foundry) => ({
      name: foundry.name,
      value: foundry.id,
      selected: query.foundry.indexOf(foundry.id) !== -1,
    }));
    const designerList = moddedDesigners.map((designer) => ({
      name: designer.name,
      value: designer.id,
      selected: query.designer.indexOf(designer.id) !== -1,
    }));
    component.ngOnChanges({ foundries: initialFoundryList, designers: initialDesignerList });
    expect(component.foundryList).toEqual(initialFoundryList);
    expect(component.designerList).toEqual(initialDesignerList);

    component.foundries = moddedFoundries;
    component.designers = moddedDesigners;
    component.initialQuery = query;
    component.ngOnChanges({ foundries: moddedFoundries, designers: moddedDesigners });
    expect(component.foundryList).toEqual(foundryList);
    expect(component.designerList).toEqual(designerList);
    expect(component.designerList).toEqual(designerList);
  });

  it('should update item selection', () => {
    const foundryOptions: DropdownOption[] = [
      { name: 'empty', selected: true, value: 2 },
      { name: 'empty', selected: false, value: 222 },
      { name: 'empty', selected: true, value: 44 },
    ];
    const expected = {
      ...component.searchForm.value,
      foundry: foundryOptions.filter((foundry) => foundry.selected).map((foundry) => foundry.value),
    };
    component.updateList(foundryOptions, 'foundry');
    expect(component.searchForm.value).toEqual(expected);
  });

});
