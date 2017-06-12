/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';

import { Style, StyleActions, StyleSearch, initialStyleState } from '../../tn-common/styles';
import { Family, FamilyActions } from '../../tn-common/families';
import { AdminStylesListComponent } from './admin-styles-list.component';
import { TnAdminStoreModule, storeAssets, productionReducer } from '../store';
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

  const mockStyleList: Style[] = [
    { ...mockStyle, id: 2, visible: 3, name: 'Sers' },
    { ...mockStyle, id: 3, visible: 2, name: 'GOT' },
    { ...mockStyle, id: 4, visible: 1, name: 'IASIP' },
    { ...mockStyle, id: 5, visible: 3, name: 'Fernando' },
  ];
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
  const mockFamilyList: Family[] = [
    { ...mockFamily, id: 1, styles: [2, 3], category: [0, 1] },
    { ...mockFamily, id: 2, styles: [4], category: [1, 2, 3] },
    { ...mockFamily, id: 3, styles: [5], category: [3] },
    { ...mockFamily, id: 4, styles: [6], category: [4] },
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
      foundry: 2,
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

    beforeEach(() => {
      store.dispatch({ type: StyleActions.LOAD_STYLES_SUCCESS, payload: mockStyleList });
      store.dispatch({ type: FamilyActions.LOAD_FAMILIES_SUCCESS, payload: mockFamilyList });
    });

    it('should assign matching families to styles', () => {
      component.styleFamilies$.subscribe((styles) => {
        expect(styles).toEqual(styleFamilies);
      });
    });

    it('should filter styles by name', () => {
      const target = styleFamilies[0];
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
      const expected = styleFamilies.filter((style) => visible.indexOf(style.visible) !== -1);
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
      const expected = styleFamilies.filter((style) =>
        style.family.category.some((category) => categories.indexOf(category) !== -1));
      store.dispatch({ type: StyleActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredStyles$.subscribe((styles: Style[]) => {
        expect(styles).toEqual(expected);
      });
    });
  });
});
