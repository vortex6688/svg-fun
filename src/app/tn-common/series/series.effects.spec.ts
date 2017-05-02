import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { SeriesService } from './series.service';
import { SeriesActions } from './series.actions';
import { SeriesEffects } from './series.effects';
import { Series } from './series.model';

describe('SeriesEffects', () => {
  const SeriesMock: Series = {
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
    foundry: 1,
    description: 'Lorem ipsum',
    description_link: ['https://store.typenetwork.com']
  };
  const mockSeries = [
    { ...SeriesMock, id: 12345 },
    { ...SeriesMock, id: 234543123 },
  ];

  let runner: EffectsRunner;
  let seriesEffects: SeriesEffects;
  let seriesActions: SeriesActions;

  class MockSeriesService {
    public find(query: object): Observable<Series[]> {
      return Observable.of(mockSeries);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      SeriesActions,
      SeriesEffects,
      {
        provide: SeriesService,
        useClass: MockSeriesService,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    seriesActions = TestBed.get(SeriesActions);
    seriesEffects = TestBed.get(SeriesEffects);
  });

  describe('search$', () => {
    it('should return a search complete action with results', () => {
      const expectedResult = seriesActions.searchComplete(mockSeries);
      runner.queue(seriesActions.searchQuery({}));

      let result = null;
      seriesEffects.search$.subscribe((data) => result = data);
      expect(result).toEqual(expectedResult);
    });
  });
});
