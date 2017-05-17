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
    price: '22.0000',
    price_paid: '22.0000',
    qty: 2,
    start: null,
    end: null,
    style: 286,
    years: null,
    active: true,
    license_type: 'app'
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
    public save(license: License): Observable<License> {
      return Observable.of(license);
    }
    public delete(license: License): Observable<License> {
      return Observable.of(license);
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
    const expectedResult = licenseActions.addLicenses(mockLicenses);
    runner.queue(licenseActions.searchQuery({}));

    let result = null;
    licenseEffects.loadData$.subscribe((data) => result = data);
    expect(result).toEqual(expectedResult);
  });

  it('should return a collection.AddLicenseSuccess, with the license, on success add', () => {
    runner.queue(licenseActions.createLicense(licenseMock));
    licenseEffects.addLicense$.subscribe((result) => {
      expect(result).toEqual(licenseActions.createLicenseSuccess(licenseMock));
    });
  });

  it('should return a collection.UpdateLicenseSuccess, with the license, on success update', () => {
    runner.queue(licenseActions.updateLicense(licenseMock));
    licenseEffects.updateLicense$.subscribe((result) => {
      expect(result).toEqual(licenseActions.updateLicenseSuccess(licenseMock));
    });
  });

  it('should return a collection.RemoveLicenseSuccess, with the license, on success remove', () => {
    runner.queue(licenseActions.removeLicense(licenseMock));
    licenseEffects.removeLicense$.subscribe((result) => {
      expect(result).toEqual(licenseActions.removeLicenseSuccess(licenseMock));
    });
  });

});
