import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { LicenseService } from './license.service';
import { LicenseActions } from './license.actions';
import { LicenseEffects } from './license.effects';
import { License } from './license.model';
import { initialLicenseState } from './license.state';

describe('LicenseEffects', () => {
  const licenseMock: License = {
    id: 123,
    order: 1,
    price: "22.0000",
    price_paid: "22.0000",
    qty: 2,
    start: null,
    end: null,
    style: 286,
    years: null,
    active: true,
    license_type: "app"
  };

  const mockLicenses = [
    { ...licenseMock, id: 12345 },
    { ...licenseMock, id: 234543123 },
  ];

  let runner: EffectsRunner;
  let licenseEffects: LicenseEffects;
  let licenseActions: LicenseActions;

  class MockLicenseService {
    public find(query: object): Observable<License[]> {
      return Observable.of(mockLicenses);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      LicenseActions,
      LicenseEffects,
      {
        provide: LicenseService,
        useClass: MockLicenseService,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    licenseActions = TestBed.get(LicenseActions);
    licenseEffects = TestBed.get(LicenseEffects);
  });

  it('should return a search complete action with results', () => {
    const expectedResult = licenseActions.searchComplete(mockLicenses);
    runner.queue(licenseActions.searchQuery({}));

    let result = null;
    licenseEffects.search$.subscribe((data) => result = data);
    expect(result).toEqual(expectedResult);
  });

});
