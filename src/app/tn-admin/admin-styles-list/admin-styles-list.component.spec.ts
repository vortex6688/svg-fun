/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';

import { Style, StyleActions, StyleSearch, initialStyleState } from '../../tn-common/styles';
import { Family, FamilyActions } from '../../tn-common/families';
import { Foundry, FoundryActions } from '../../tn-common/foundries';
import { AdminStylesListComponent } from './admin-styles-list.component';
import { TnAdminStoreModule, productionReducer } from '../store';
import { TnCommonModule } from '../../tn-common/';

describe('AdminStylesListComponent', () => {
  let component: AdminStylesListComponent;
  let fixture: ComponentFixture<AdminStylesListComponent>;
  let store: Store<any>;
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

  const mockStyleList: Style[] = [
    { ...mockStyle, id: 2, visible: 3, name: 'Sers', foundry: [2] },
    { ...mockStyle, id: 3, visible: 2, name: 'GOT', foundry: [3, 5] },
    { ...mockStyle, id: 4, visible: 1, name: 'IASIP', foundry: [4] },
    { ...mockStyle, id: 5, visible: 3, name: 'Fernando', foundry: [2, 4] },
  ];
  const mockFamilyList: Family[] = [
    { ...mockFamily, id: 1, styles: [2, 3], category: [0, 1] },
    { ...mockFamily, id: 2, styles: [4], category: [1, 2, 3] },
    { ...mockFamily, id: 3, styles: [5], category: [3] },
    { ...mockFamily, id: 4, styles: [6], category: [4] },
  ];
  const mockFoundryList: Foundry[] = [
    { ...mockFoundry, id: 2, name: 'foundr' },
    { ...mockFoundry, id: 3, name: 'supa' },
    { ...mockFoundry, id: 4, name: 'dupa' },
  ];
  const OPTICAL = {
    100: 'Micro',
    200: 'Agate',
    250: 'RE',
    300: 'Caption',
    400: 'Text',
    500: 'Multipurpose',
    600: 'Deck',
    690: 'Headline',
    700: 'Display',
    750: 'Titling',
    800: 'Banner',
    900: 'Big',
  };
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
  const WEIGHTS = {
    900: 'Ultra Black',
    850: 'Extra Black',
    800: 'Black',
    750: 'Extra Bold',
    700: 'Bold',
    600: 'Semi Bold',
    500: 'Medium',
    450: 'Standard',
    400: 'Regular',
    390: 'Book',
    350: 'Semi Light',
    300: 'Light',
    200: 'Extra Light',
    150: 'Thin',
    100: 'Hairline',
  };
  const WIDTHS = {
    100: 'Skyline',
    140: 'Extra Compressed',
    200: 'Compressed',
    300: 'Extra Condensed',
    400: 'Condensed',
    440: 'Narrow',
    500: 'Normal',
    600: 'Wide',
    700: 'Extended',
    800: 'Extra Extended',
    900: 'Ultra Extended',
  };
  const POSTURES = [
    'Roman',  // 0
    'Italic', // 1
  ];
  const VISIBLE_STATES = [
    'Inactive',    // 0
    'Staff only',  // 1
    'With link',   // 2
    'Everyone',    // 3
  ];

  class MockStyleActions {
    public searchQuery = jasmine.createSpy('searchQuery');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        StoreModule.provideStore(productionReducer),
      ],
      declarations: [
        AdminStylesListComponent,
      ],
      providers: [
        { provide: StyleActions, useClass: MockStyleActions },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AdminStylesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call styles search action', () => {
    const stylesActions = fixture.debugElement.injector.get(StyleActions);
    const query = {
      name: 'serie name',
      foundry: [2],
      designer: 1,
      visible: [1],
      categories: [],
    };
    spyOn(store, 'dispatch');
    component.searchStyles(query);
    expect(stylesActions.searchQuery).toHaveBeenCalledWith(query);
  });

  describe('styles combining', () => {
    const styleFamilies = mockStyleList.map((style) => ({
      ...style,
      family: mockFamilyList.find((family) => family.id === style.family),
    }));
    const styleFamiliesFoundries = styleFamilies.map((style) => ({
      ...style,
      foundry: (style.foundry as number[]).map((id) => mockFoundryList.find((foundry) => foundry.id === id))
    }));
    const namedStyles = styleFamiliesFoundries.map((style) => ({
      ...style,
      visibleName: VISIBLE_STATES[style.visible],
      opticalName: OPTICAL[style.optical],
      postureName: POSTURES[style.posture],
      widthName: WIDTHS[style.width],
      weightName: WEIGHTS[style.weight],
    }));

    beforeEach(() => {
      store.dispatch({ type: StyleActions.LOAD_STYLES_SUCCESS, payload: mockStyleList });
      store.dispatch({ type: FamilyActions.LOAD_FAMILIES_SUCCESS, payload: mockFamilyList });
      store.dispatch({ type: FoundryActions.LOAD_FOUNDRIES_SUCCESS, payload: mockFoundryList });
    });

    it('should assign matching families to styles', () => {
      component.styleFamilies$.subscribe((styles) => {
        expect(styles).toEqual(styleFamilies);
      });
    });

    it('should assign matching foundries to styles', () => {
      component.styleFamiliesFoundries$.subscribe((styles) => {
        expect(styles).toEqual(styleFamiliesFoundries);
      });
    });

    it('should filter styles by name', () => {
      const target = namedStyles[0];
      const searchQuery = {
        ...initialStyleState.search,
        name: target.name,
      };
      store.dispatch({ type: StyleActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredStyles$.subscribe((styles: Style[]) => {
        expect(styles).toEqual([target]);
      });
    });

    it('should filter styles by visibility', () => {
      const visible = [1, 3];
      const searchQuery = {
        ...initialStyleState.search,
        visible,
      };
      const expected = namedStyles.filter((style) => visible.indexOf(style.visible) !== -1);
      store.dispatch({ type: StyleActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredStyles$.subscribe((styles: Style[]) => {
        expect(styles).toEqual(expected);
      });
    });

    it('should filter styles by foundries', () => {
      const targets = [1, 3];
      const searchQuery = {
        ...initialStyleState.search,
        foundry: targets,
      };
      const expected = namedStyles.filter((style) =>
        style.foundry.some((foundry) => foundry && targets.indexOf(foundry.id) !== -1));
      store.dispatch({ type: StyleActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredStyles$.subscribe((styles: Style[]) => {
        expect(styles).toEqual(expected);
      });
    });

    it('should filter styles by categories', () => {
      const categories = [1, 3];
      const searchQuery = {
        ...initialStyleState.search,
        categories,
      };
      const expected = namedStyles.filter((style) =>
        style.family.category.some((category) => categories.indexOf(category) !== -1));
      store.dispatch({ type: StyleActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredStyles$.subscribe((styles: Style[]) => {
        expect(styles).toEqual(expected);
      });
    });
  });
});
