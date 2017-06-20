/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';

import { Family, FamilyActions, FamilySearch, initialFamilyState } from '../../tn-common/families';
import { Foundry, FoundryActions } from '../../tn-common/foundries';
import { Style, StyleActions } from '../../tn-common/styles';
import { Designer, DesignerActions } from '../../tn-common/designers';
import { AdminFamiliesListComponent } from './admin-families-list.component';
import { TnAdminStoreModule, productionReducer } from '../store';
import { TnCommonModule } from '../../tn-common/';

describe('AdminFamiliesListComponent', () => {
  let component: AdminFamiliesListComponent;
  let fixture: ComponentFixture<AdminFamiliesListComponent>;
  let store: Store<any>;
  const mockFamily: Family = {
    id: 1,
    name: 'Mock family',
    slug: 'mock-family',
    description: '2 real 2 describe',
    descripion_link: [{
      text: 'link text',
      url: 'link url',
    }],
    more: 'don\'t hurt me',
    category: [ 1, 2 ],
    mood: [ 3, 4 ],
    designer: [ 5, 6 ],
    foundry: [ 7, 8 ],
    posture: [ 9, 10 ],
    recommended_function: [ 11, 12 ],
    recommended_size: [ 13, 14 ],
    width: [ 15, 16 ],
    weight: [ 17, 18 ],
    tn_width: [ 19, 20 ],
    tn_weight: [ 21, 22 ],
    released: '2017-01-01',
    style: [],
    default_style: 111,
    link_only_styles: [ 25, 26 ],
    canonical: 234,
    canonical_series: 234,
    series: [ 27, 28 ],
    visible: 2,
  };
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
  const mockStyle: Style = {
    id: 1,
    name: 'Style bolder',
    style_name: 'Bold',
    family: 1,
    base_price: '22.0000',
    specimen_text: 'Text for specimen',
    support: {
      'supported language': [
        'uppercase',
        'lowercase',
      ],
    },
    default_style: false,
    foundry: [2],
    designer: [3],
    posture: 1,
    visible: 3,
    optical: 500,
    grade: 11,
    weight: 400,
    width: 500,
    tn_size: [],
    released: new Date().toString(),
    tn_weight: 300,
    tn_width: 600,
    min_recommended_size: 24,
    max_recommended_size: 100,
    isRE: false,
    recommended_function: [0, 1, 2],
    recommended_size: [400, 500],
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

  const mockFamilyList: Family[] = [
    { ...mockFamily, name: 'fake', id: 1, styles: [2, 3], foundry: [2] },
    { ...mockFamily, name: 'famo', id: 2, styles: [4], foundry: [2, 3] },
    { ...mockFamily, name: 'la famillia', id: 3, styles: [5], foundry: [4] },
    { ...mockFamily, name: 'special', id: 4, styles: [6], foundry: [5] },
  ];
  const mockFoundryList: Foundry[] = [
    { ...mockFoundry, id: 2, name: 'foundr' },
    { ...mockFoundry, id: 3, name: 'supa' },
    { ...mockFoundry, id: 4, name: 'dupa' },
  ];
  const mockStyleList: Style[] = [
    { ...mockStyle, id: 2, name: 'foundr' },
    { ...mockStyle, id: 3, name: 'supa' },
    { ...mockStyle, id: 4, name: 'dupa' },
  ];
  const mockDesignerList: Designer[] = [
    { ...mockDesigner, id: 2, name: 'foundr' },
    { ...mockDesigner, id: 3, name: 'supa' },
    { ...mockDesigner, id: 4, name: 'dupa' },
  ];

  const CATEGORIES = [
    'Sans',       // 0
    'Serif',      // 1
    'Symbol',     // 2
    'Slab Serif', // 3
    'Wacky',      // 4
    'Script',     // 5
    'Decorative', // 6
  ];
  const MOODS = [
    'Rustic',        // 0
    'Sturdy',        // 1
    'Mechanical',    // 2
    'Industrial',    // 3
    'Informal',      // 4
    'Contemporary',  // 5
    'High-tech',     // 6
    'Futuristic',    // 7
    'Lively',        // 8
    'Delicate',      // 9
    'Classical',     // 10
    'Formal',        // 11
    'Cute',          // 12
    'Fun',           // 13
    'Technical',     // 14
    'Retro',         // 15
    'Friendly',      // 16
    'Digital',       // 17
  ];
  const VISIBLE_STATES = [
    'Inactive',    // 0
    'Staff only',  // 1
    'With link',   // 2
    'Everyone',    // 3
  ];

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

  it('should call families search action', () => {
    const orderActions = fixture.debugElement.injector.get(FamilyActions);
    const query: FamilySearch = {
      name: 'fam name',
      foundry: [2],
      designer: [4],
      visibility: [1, 2],
      categories: [1],
    };
    spyOn(store, 'dispatch');
    component.searchFamilies(query);
    expect(orderActions.searchQuery).toHaveBeenCalledWith(query);
  });
  describe('family combining', () => {
    const familiesPopulated = mockFamilyList.map((family) => ({
      ...family,
      foundry: (family.foundry as number[]).map((id) => mockFoundryList.find((foundry) => foundry.id === id)),
      style: (family.style as number[]).map((id) => mockStyleList.find((style) => style.id === id)),
      designer: (family.designer as number[]).map((id) => mockDesignerList.find((designer) => designer.id === id))
    }));
    const namedFamilies = familiesPopulated.map((family) => ({
      ...family,
      categoryName: family.category.map((category) => CATEGORIES[category]).sort(),
      min_size: Math.min(...family.recommended_size),
      max_size: Math.max(...family.recommended_size),
      moodName: family.mood.map((mood) => MOODS[mood]).sort(),
      visibleName: VISIBLE_STATES[family.visible],
    }));

    beforeEach(() => {
      store.dispatch({ type: FamilyActions.LOAD_FAMILIES_SUCCESS, payload: mockFamilyList });
      store.dispatch({ type: FoundryActions.LOAD_FOUNDRIES_SUCCESS, payload: mockFoundryList });
      store.dispatch({ type: StyleActions.LOAD_STYLES_SUCCESS, payload: mockStyleList });
      store.dispatch({ type: DesignerActions.LOAD_DESIGNERS_SUCCESS, payload: mockDesignerList });
    });

    it('should populate families with data', () => {
      component.familiesPopulated$.subscribe((styles) => {
        expect(styles).toEqual(familiesPopulated);
      });
    });

    it('should filter families by name', () => {
      const name = 'fam';
      const searchQuery = {
        ...initialFamilyState.search,
        name,
      };
      const testName = new RegExp(name, 'i');
      const expected = namedFamilies.filter((family) => testName.test(family.name));
      store.dispatch({ type: FamilyActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredFamilies$.subscribe((families: Family[]) => {
        expect(families).toEqual(expected);
      });
    });

    it('should filter families by foundries', () => {
      const targets = [2, 3];
      const searchQuery = {
        ...initialFamilyState.search,
        foundry: targets,
      };

      const expected = namedFamilies.filter((family) =>
        family.foundry.some((foundry) => foundry && targets.indexOf(foundry.id) !== -1));
      store.dispatch({ type: FamilyActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredFamilies$.subscribe((families: Family[]) => {
        expect(families).toEqual(expected);
      });
    });
  });
});
