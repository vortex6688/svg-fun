/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';

import { Family, FamilyActions, FamilySearch, initialFamilyState } from '../../tn-common/families';
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
  const mockFamilyList: Family[] = [
    { ...mockFamily, name: 'fake', id: 1, styles: [2, 3], },
    { ...mockFamily, name: 'famo', id: 2, styles: [4], },
    { ...mockFamily, name: 'la famillia', id: 3, styles: [5], },
    { ...mockFamily, name: 'special', id: 4, styles: [6], },
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
      foundry: 2,
      designer: 4,
      visibility: [1, 2],
      categories: [1],
    };
    spyOn(store, 'dispatch');
    component.searchFamilies(query);
    expect(orderActions.searchQuery).toHaveBeenCalledWith(query);
  });
  describe('family combining', () => {

    beforeEach(() => {
      store.dispatch({ type: FamilyActions.ADD_FAMILIES, payload: mockFamilyList });
    });

    it('should filter families by name', () => {
      const name = 'fam';
      const searchQuery = {
        ...initialFamilyState.search,
        name,
      };
      const testName = new RegExp(name, 'i');
      const expected = mockFamilyList.filter((family) => testName.test(family.name));
      store.dispatch({ type: FamilyActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredFamilies$.subscribe((families: Family[]) => {
        expect(families).toEqual(expected);
      });
  });

});
