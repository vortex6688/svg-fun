import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { StyleService } from './style.service';
import { StyleActions } from './style.actions';
import { StyleEffects } from './style.effects';
import { Style } from './style.model';
import { initialStyleState } from './style.state';

describe('StyleEffects', () => {
  const styleMock: Style = {
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
    foundry: 2,
    designer: 3,
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

  const mockStyles = [
    { ...styleMock, id: 12345 },
    { ...styleMock, id: 234543123 },
  ];

  let runner: EffectsRunner;
  let styleEffects: StyleEffects;
  let styleActions: StyleActions;
  let styleService: MockStyleService;

  class MockStyleService {
    public getAllPages(query: object): Observable<Style[]> {
      return Observable.of(mockStyles);
    }
    public save(style: Style): Observable<Style> {
      return Observable.of(style);
    }
    public delete(style: Style): Observable<Style> {
      return Observable.of(style);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      StyleActions,
      StyleEffects,
      {
        provide: StyleService,
        useClass: MockStyleService,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    styleService = TestBed.get(StyleService);
    styleActions = TestBed.get(StyleActions);
    styleEffects = TestBed.get(StyleEffects);
  });

  describe('loadStyles$', () => {
    it('should return loadStylesSuccess on load success', () => {
      const expectedResult = styleActions.loadStylesSuccess(mockStyles);
      runner.queue(styleActions.loadStyles());

      let result = null;
      styleEffects.loadStyles$.subscribe((data) => result = data);
      expect(result).toEqual(expectedResult);
    });

    it('should return loadStylesFail on load failure', () => {
      const errorValue = 'error';
      spyOn(styleService, 'getAllPages').and.returnValue(Observable.throw(errorValue));
      runner.queue(styleActions.loadStyles());
      styleEffects.loadStyles$.subscribe((result) => {
        expect(result).toEqual(styleActions.loadStylesFail(errorValue));
      });
    });
  });

  describe('createStyle$', () => {
    it('should return a createStyleSuccess, with the style, on success add', () => {
      runner.queue(styleActions.createStyle(styleMock));
      styleEffects.createStyle$.subscribe((result) => {
        expect(result).toEqual(styleActions.createStyleSuccess(styleMock));
      });
    });

    it('should return a createStyleFail action, on service error', () => {
      spyOn(styleService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(styleActions.createStyle(styleMock));
      styleEffects.createStyle$.subscribe((result) => {
        expect(result).toEqual(styleActions.createStyleFail(styleMock));
      });
    });
  });

  describe('updateStyle$', () => {
    it('should return a updateStyleSuccess action, with the style, on success update', () => {
      runner.queue(styleActions.updateStyle(styleMock));
      styleEffects.updateStyle$.subscribe((result) => {
        expect(result).toEqual(styleActions.updateStyleSuccess(styleMock));
      });
    });

    it('should return a updateStyleFail action, on service error', () => {
      spyOn(styleService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(styleActions.updateStyle(styleMock));
      styleEffects.updateStyle$.subscribe((result) => {
        expect(result).toEqual(styleActions.updateStyleFail(styleMock));
      });
    });
  });

  describe('removeStyle$', () => {
    it('should return a removeStyleSuccess action, with the style, on success remove', () => {
      runner.queue(styleActions.removeStyle(styleMock));
      styleEffects.removeStyle$.subscribe((result) => {
        expect(result).toEqual(styleActions.removeStyleSuccess(styleMock));
      });
    });

    it('should return a removeStyleFail, on service error', () => {
      spyOn(styleService, 'delete').and.returnValue(Observable.throw('error'));
      runner.queue(styleActions.removeStyle(styleMock));
      styleEffects.removeStyle$.subscribe((result) => {
        expect(result).toEqual(styleActions.removeStyleFail(styleMock));
      });
    });
  });
});
