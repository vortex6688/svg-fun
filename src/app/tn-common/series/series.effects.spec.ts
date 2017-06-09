import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { SeriesService } from './series.service';
import { SeriesActions } from './series.actions';
import { SeriesEffects } from './series.effects';
import { Series } from './series.model';

describe('SeriesEffects', () => {
  const seriesMock: Series = {
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
    { ...seriesMock, id: 12345 },
    { ...seriesMock, id: 234543123 },
  ];

  let runner: EffectsRunner;
  let seriesEffects: SeriesEffects;
  let seriesActions: SeriesActions;
  let seriesService: SeriesService;

  class MockSeriesService {
    public getAllPages(query: object): Observable<Series[]> {
      return Observable.of(mockSeries);
    }
    public save(series: Series): Observable<Series> {
      return Observable.of(series);
    }
    public delete(series: Series): Observable<Series> {
      return Observable.of(series);
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
    seriesService = TestBed.get(SeriesService);
  });

  describe('loadSeries$', () => {
    it('should return loadSeriesSuccess on load success', () => {
      const expectedResult = seriesActions.loadSeriesSuccess(mockSeries);
      runner.queue(seriesActions.loadSeries());

      let result = null;
      seriesEffects.loadSeries$.subscribe((data) => result = data);
      expect(result).toEqual(expectedResult);
    });

    it('should return loadSeriesFail on load failure', () => {
      const errorValue = 'error';
      spyOn(seriesService, 'getAllPages').and.returnValue(Observable.throw(errorValue));
      runner.queue(seriesActions.loadSeries());
      seriesEffects.loadSeries$.subscribe((result) => {
        expect(result).toEqual(seriesActions.loadSeriesFail(errorValue));
      });
    });
  });

  describe('createSeries$', () => {
    it('should return a createSeriesSuccess, with the family, on success add', () => {
      runner.queue(seriesActions.createSeries(seriesMock));
      seriesEffects.createSeries$.subscribe((result) => {
        expect(result).toEqual(seriesActions.createSeriesSuccess(seriesMock));
      });
    });

    it('should return a createSeriesFail action, on service error', () => {
      spyOn(seriesService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(seriesActions.createSeries(seriesMock));
      seriesEffects.createSeries$.subscribe((result) => {
        expect(result).toEqual(seriesActions.createSeriesFail(seriesMock));
      });
    });
  });

  describe('updateSeries$', () => {
    it('should return a updateSeriesSuccess action, with the family, on success update', () => {
      runner.queue(seriesActions.updateSeries(seriesMock));
      seriesEffects.updateSeries$.subscribe((result) => {
        expect(result).toEqual(seriesActions.updateSeriesSuccess(seriesMock));
      });
    });

    it('should return a updateSeriesFail action, on service error', () => {
      spyOn(seriesService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(seriesActions.updateSeries(seriesMock));
      seriesEffects.updateSeries$.subscribe((result) => {
        expect(result).toEqual(seriesActions.updateSeriesFail(seriesMock));
      });
    });
  });

  describe('removeSeries$', () => {
    it('should return a removeSeriesSuccess action, with the series, on success remove', () => {
      runner.queue(seriesActions.removeSeries(seriesMock));
      seriesEffects.removeSeries$.subscribe((result) => {
        expect(result).toEqual(seriesActions.removeSeriesSuccess(seriesMock));
      });
    });

    it('should return a removeSeriesFail, on service error', () => {
      spyOn(seriesService, 'delete').and.returnValue(Observable.throw('error'));
      runner.queue(seriesActions.removeSeries(seriesMock));
      seriesEffects.removeSeries$.subscribe((result) => {
        expect(result).toEqual(seriesActions.removeSeriesFail(seriesMock));
      });
    });
  });
});
