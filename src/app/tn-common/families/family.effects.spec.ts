import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { FamilyService } from './family.service';
import { FamilyActions } from './family.actions';
import { FamilyEffects } from './family.effects';
import { Family } from './family.model';
import { initialFamilyState } from './family.state';

describe('FamilyEffects', () => {
  const familyMock: Family = {
    id: 123,
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
    style: [ 23, 24 ],
    default_style: 111,
    link_only_styles: [ 25, 26 ],
    canonical: 234,
    canonical_series: 234,
    series: [ 27, 28 ],
    visible: 2,
  };

  const mockFamilies = [
    { ...familyMock, id: 12345 },
    { ...familyMock, id: 234543123 },
  ];
  let runner: EffectsRunner;
  let familyEffects: FamilyEffects;
  let familyActions: FamilyActions;
  let familyService: MockFamilyService;

  class MockFamilyService {
    public getAllPages(query: object): Observable<Family[]> {
      return Observable.of(mockFamilies);
    }
    public save(family: Family): Observable<Family> {
      return Observable.of(family);
    }
    public delete(family: Family): Observable<Family> {
      return Observable.of(family);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      FamilyActions,
      FamilyEffects,
      {
        provide: FamilyService,
        useClass: MockFamilyService,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    familyActions = TestBed.get(FamilyActions);
    familyEffects = TestBed.get(FamilyEffects);
    familyService = TestBed.get(FamilyService);
  });

  describe('loadFamilies$', () => {
    it('should return loadFamiliesSuccess on load success', () => {
      const expectedResult = familyActions.loadFamiliesSuccess(mockFamilies);
      runner.queue(familyActions.loadFamilies());

      let result = null;
      familyEffects.loadFamilies$.subscribe((data) => result = data);
      expect(result).toEqual(expectedResult);
    });

    it('should return loadFamiliesFail on load failure', () => {
      const errorValue = 'error';
      spyOn(familyService, 'getAllPages').and.returnValue(Observable.throw(errorValue));
      runner.queue(familyActions.loadFamilies());
      familyEffects.loadFamilies$.subscribe((result) => {
        expect(result).toEqual(familyActions.loadFamiliesFail(errorValue));
      });
    });
  });

  describe('createFamily$', () => {
    it('should return a createFamilySuccess, with the family, on success add', () => {
      runner.queue(familyActions.createFamily(familyMock));
      familyEffects.createFamily$.subscribe((result) => {
        expect(result).toEqual(familyActions.createFamilySuccess(familyMock));
      });
    });

    it('should return a createFamilyFail action, on service error', () => {
      spyOn(familyService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(familyActions.createFamily(familyMock));
      familyEffects.createFamily$.subscribe((result) => {
        expect(result).toEqual(familyActions.createFamilyFail(familyMock));
      });
    });
  });

  describe('updateFamily$', () => {
    it('should return a updateFamilySuccess action, with the family, on success update', () => {
      runner.queue(familyActions.updateFamily(familyMock));
      familyEffects.updateFamily$.subscribe((result) => {
        expect(result).toEqual(familyActions.updateFamilySuccess(familyMock));
      });
    });

    it('should return a updateFamilyFail action, on service error', () => {
      spyOn(familyService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(familyActions.updateFamily(familyMock));
      familyEffects.updateFamily$.subscribe((result) => {
        expect(result).toEqual(familyActions.updateFamilyFail(familyMock));
      });
    });
  });

  describe('removeFamily$', () => {
    it('should return a removeFamilySuccess action, with the family, on success remove', () => {
      runner.queue(familyActions.removeFamily(familyMock));
      familyEffects.removeFamily$.subscribe((result) => {
        expect(result).toEqual(familyActions.removeFamilySuccess(familyMock));
      });
    });

    it('should return a removeFamilyFail, on service error', () => {
      spyOn(familyService, 'delete').and.returnValue(Observable.throw('error'));
      runner.queue(familyActions.removeFamily(familyMock));
      familyEffects.removeFamily$.subscribe((result) => {
        expect(result).toEqual(familyActions.removeFamilyFail(familyMock));
      });
    });
  });
});
