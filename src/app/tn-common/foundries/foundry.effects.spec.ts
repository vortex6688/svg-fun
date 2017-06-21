import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { FoundryService } from './foundry.service';
import { FoundryActions } from './foundry.actions';
import { FoundryEffects } from './foundry.effects';
import { Foundry } from './foundry.model';
import { initialFoundryState } from './foundry.state';

describe('FoundryEffects', () => {
  const foundryMock: Foundry = {
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

  const mockFoundries = [
    { ...foundryMock, id: 12345 },
    { ...foundryMock, id: 234543123 },
  ];

  let runner: EffectsRunner;
  let foundryEffects: FoundryEffects;
  let foundryActions: FoundryActions;
  let foundryService: MockFoundryService;

  class MockFoundryService {
    public getAllPages(query: object): Observable<Foundry[]> {
      return Observable.of(mockFoundries);
    }
    public save(foundry: Foundry): Observable<Foundry> {
      return Observable.of(foundry);
    }
    public delete(foundry: Foundry): Observable<Foundry> {
      return Observable.of(foundry);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      FoundryActions,
      FoundryEffects,
      {
        provide: FoundryService,
        useClass: MockFoundryService,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    foundryService = TestBed.get(FoundryService);
    foundryActions = TestBed.get(FoundryActions);
    foundryEffects = TestBed.get(FoundryEffects);
  });

  describe('loadFoundries$', () => {
    it('should return loadFoundriesSuccess on load success', () => {
      const expectedResult = foundryActions.loadFoundriesSuccess(mockFoundries);
      runner.queue(foundryActions.loadFoundries());

      let result = null;
      foundryEffects.loadFoundries$.subscribe((data) => result = data);
      expect(result).toEqual(expectedResult);
    });

    it('should return loadFoundriesFail on load failure', () => {
      const errorValue = 'error';
      spyOn(foundryService, 'getAllPages').and.returnValue(Observable.throw(errorValue));
      runner.queue(foundryActions.loadFoundries());
      foundryEffects.loadFoundries$.subscribe((result) => {
        expect(result).toEqual(foundryActions.loadFoundriesFail(errorValue));
      });
    });
  });

  describe('createFoundry$', () => {
    it('should return a createFoundrySuccess, with the foundry, on success add', () => {
      runner.queue(foundryActions.createFoundry(foundryMock));
      foundryEffects.createFoundry$.subscribe((result) => {
        expect(result).toEqual(foundryActions.createFoundrySuccess(foundryMock));
      });
    });

    it('should return a createFoundryFail action, on service error', () => {
      spyOn(foundryService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(foundryActions.createFoundry(foundryMock));
      foundryEffects.createFoundry$.subscribe((result) => {
        expect(result).toEqual(foundryActions.createFoundryFail(foundryMock));
      });
    });
  });

  describe('updateFoundry$', () => {
    it('should return a updateFoundrySuccess action, with the foundry, on success update', () => {
      runner.queue(foundryActions.updateFoundry(foundryMock));
      foundryEffects.updateFoundry$.subscribe((result) => {
        expect(result).toEqual(foundryActions.updateFoundrySuccess(foundryMock));
      });
    });

    it('should return a updateFoundryFail action, on service error', () => {
      spyOn(foundryService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(foundryActions.updateFoundry(foundryMock));
      foundryEffects.updateFoundry$.subscribe((result) => {
        expect(result).toEqual(foundryActions.updateFoundryFail(foundryMock));
      });
    });
  });

  describe('removeFoundry$', () => {
    it('should return a removeFoundrySuccess action, with the foundry, on success remove', () => {
      runner.queue(foundryActions.removeFoundry(foundryMock));
      foundryEffects.removeFoundry$.subscribe((result) => {
        expect(result).toEqual(foundryActions.removeFoundrySuccess(foundryMock));
      });
    });

    it('should return a removeFoundryFail, on service error', () => {
      spyOn(foundryService, 'delete').and.returnValue(Observable.throw('error'));
      runner.queue(foundryActions.removeFoundry(foundryMock));
      foundryEffects.removeFoundry$.subscribe((result) => {
        expect(result).toEqual(foundryActions.removeFoundryFail(foundryMock));
      });
    });
  });
});
