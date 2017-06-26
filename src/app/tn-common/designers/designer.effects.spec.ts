import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { DesignerService } from './designer.service';
import { DesignerActions } from './designer.actions';
import { DesignerEffects } from './designer.effects';
import { Designer } from './designer.model';
import { initialDesignerState } from './designer.state';

describe('DesignerEffects', () => {
  const designerMock: Designer = {
    id: 1,
    name: 'mega designer',
    slug: 'mega-designer',
    description: 'loves design',
    birth_date: '1999/11/30',
    death_date: '1999/12/30',
    foundry: [2],
    title: [1],
  };
  const mockDesigners = [
    { ...designerMock, id: 12345 },
    { ...designerMock, id: 234543123 },
  ];

  let runner: EffectsRunner;
  let designerEffects: DesignerEffects;
  let designerActions: DesignerActions;
  let designerService: MockDesignerService;

  class MockDesignerService {
    public getAllPages(query: object): Observable<Designer[]> {
      return Observable.of(mockDesigners);
    }
    public save(designer: Designer): Observable<Designer> {
      return Observable.of(designer);
    }
    public delete(designer: Designer): Observable<Designer> {
      return Observable.of(designer);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      DesignerActions,
      DesignerEffects,
      {
        provide: DesignerService,
        useClass: MockDesignerService,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    designerService = TestBed.get(DesignerService);
    designerActions = TestBed.get(DesignerActions);
    designerEffects = TestBed.get(DesignerEffects);
  });

  describe('loadDesigners$', () => {
    it('should return loadDesignersSuccess on load success', () => {
      const expectedResult = designerActions.loadDesignersSuccess(mockDesigners);
      runner.queue(designerActions.loadDesigners());

      let result = null;
      designerEffects.loadDesigners$.subscribe((data) => result = data);
      expect(result).toEqual(expectedResult);
    });

    it('should return loadDesignersFail on load failure', () => {
      const errorValue = 'error';
      spyOn(designerService, 'getAllPages').and.returnValue(Observable.throw(errorValue));
      runner.queue(designerActions.loadDesigners());
      designerEffects.loadDesigners$.subscribe((result) => {
        expect(result).toEqual(designerActions.loadDesignersFail(errorValue));
      });
    });
  });

  describe('createDesigner$', () => {
    it('should return a createDesignerSuccess, with the designer, on success add', () => {
      runner.queue(designerActions.createDesigner(designerMock));
      designerEffects.createDesigner$.subscribe((result) => {
        expect(result).toEqual(designerActions.createDesignerSuccess(designerMock));
      });
    });

    it('should return a createDesignerFail action, on service error', () => {
      spyOn(designerService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(designerActions.createDesigner(designerMock));
      designerEffects.createDesigner$.subscribe((result) => {
        expect(result).toEqual(designerActions.createDesignerFail(designerMock));
      });
    });
  });

  describe('updateDesigner$', () => {
    it('should return a updateDesignerSuccess action, with the designer, on success update', () => {
      runner.queue(designerActions.updateDesigner(designerMock));
      designerEffects.updateDesigner$.subscribe((result) => {
        expect(result).toEqual(designerActions.updateDesignerSuccess(designerMock));
      });
    });

    it('should return a updateDesignerFail action, on service error', () => {
      spyOn(designerService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(designerActions.updateDesigner(designerMock));
      designerEffects.updateDesigner$.subscribe((result) => {
        expect(result).toEqual(designerActions.updateDesignerFail(designerMock));
      });
    });
  });

  describe('removeDesigner$', () => {
    it('should return a removeDesignerSuccess action, with the designer, on success remove', () => {
      runner.queue(designerActions.removeDesigner(designerMock));
      designerEffects.removeDesigner$.subscribe((result) => {
        expect(result).toEqual(designerActions.removeDesignerSuccess(designerMock));
      });
    });

    it('should return a removeDesignerFail, on service error', () => {
      spyOn(designerService, 'delete').and.returnValue(Observable.throw('error'));
      runner.queue(designerActions.removeDesigner(designerMock));
      designerEffects.removeDesigner$.subscribe((result) => {
        expect(result).toEqual(designerActions.removeDesignerFail(designerMock));
      });
    });
  });
});
