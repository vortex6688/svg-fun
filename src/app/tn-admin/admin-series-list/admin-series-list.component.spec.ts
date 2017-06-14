/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';

import { Series, SeriesActions, SeriesSearch, initialSeriesState } from '../../tn-common/series';
import { Family, FamilyActions } from '../../tn-common/families';
import { AdminSeriesListComponent } from './admin-series-list.component';
import { TnAdminStoreModule, productionReducer } from '../store';
import { TnCommonModule } from '../../tn-common/';

describe('AdminSeriesListComponent', () => {
  let component: AdminSeriesListComponent;
  let fixture: ComponentFixture<AdminSeriesListComponent>;
  let store: Store<any>;
  const mockSeries: Series = {
    id: 1,
    name: 'Lorem Ipsum',
    slug: 'lorem-ipsum',
    released: '2017-02-01T18:25:11Z',
    family: [
      1,
      2,
    ],
    designers: [
      1
    ],
    visible: true,
    foundry: 1,
    description: 'Lorem ipsum',
    description_link: ['https://store.typenetwork.com'],
    pangram: ['Lorem ipsum'],
    specimen_text: 'Lorem ipsum'
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

  const mockSeriesList: Series[] = [
    { ...mockSeries, id: 2, name: 'Sers', family: [1, 2] },
    { ...mockSeries, id: 3, name: 'GOT', family: [] },
    { ...mockSeries, id: 4, name: 'IASIP', family: [4] },
    { ...mockSeries, id: 5, name: 'Fernando', family: [3] },
  ];
  const mockFamilyList: Family[] = [
    { ...mockFamily, id: 1, style: [2, 3], },
    { ...mockFamily, id: 2, style: [4], },
    { ...mockFamily, id: 3, style: [5], },
    { ...mockFamily, id: 4, style: [6], },
  ];

  class MockSeriesActions {
    public searchQuery = jasmine.createSpy('searchQuery');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        StoreModule.provideStore(productionReducer),
      ],
      declarations: [
        AdminSeriesListComponent,
      ],
      providers: [
        { provide: SeriesActions, useClass: MockSeriesActions },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AdminSeriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call series search action', () => {
    const seriesActions = fixture.debugElement.injector.get(SeriesActions);
    const query = {
      name: 'serie name',
      foundry: 2,
    };
    spyOn(store, 'dispatch');
    component.searchSeries(query);
    expect(seriesActions.searchQuery).toHaveBeenCalledWith(query);
  });

  describe('series combining', () => {
    const seriesFamilies = mockSeriesList.map((series) => {
      const { family, styles } = (series.family as number[]).reduce((result, id) => {
        const seriesFamily = mockFamilyList.find((fam) => fam.id === id);
        if (seriesFamily) {
          result.family.push(seriesFamily);
          result.styles += seriesFamily.style.length;
        }
        return result;
       }, { family: [], styles: 0 });
      return {
        ...series,
        family,
        styles,
      };
    });

    beforeEach(() => {
      store.dispatch({ type: SeriesActions.LOAD_SERIES_SUCCESS, payload: mockSeriesList });
      store.dispatch({ type: FamilyActions.LOAD_FAMILIES_SUCCESS, payload: mockFamilyList });
    });

    it('should assign matching families to series', () => {
      component.seriesFamilies$.subscribe((series) => {
        expect(series).toEqual(seriesFamilies);
      });
    });

    it('should filter series by name', () => {
      const target = seriesFamilies[0];
      const searchQuery = {
        ...initialSeriesState.search,
        name: target.name,
      };
      store.dispatch({ type: SeriesActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredSeries$.subscribe((series: Series[]) => {
        expect(series).toEqual([target]);
      });
    });

  });
});
