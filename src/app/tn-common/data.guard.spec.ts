/* tslint:disable:max-classes-per-file */
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Observable, Subject } from 'rxjs/Rx';

import { DataGuard } from './data.guard';
import { OrderActions } from './orders';
import { LicenseActions } from './licenses';
import { FamilyActions } from './families';
import { StyleActions } from './styles';
import { SeriesActions } from './series';
import { ProjectActions } from './projects';
import { FoundryActions } from './foundries';
import { DesignerActions } from './designers';

describe('DataGuard', () => {
  let dataGuard: DataGuard;
  let router: MockRouter;
  let store: MockStore;
  let actionSubject: Subject<any>;

  class MockRouter {
    public navigate = jasmine.createSpy('navigate').and.callThrough();
  }

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
  }

  class MockActions {
    public ofType = () => actionSubject;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DataGuard,
        OrderActions,
        LicenseActions,
        FamilyActions,
        StyleActions,
        SeriesActions,
        ProjectActions,
        FoundryActions,
        DesignerActions,
        { provide: Router, useClass: MockRouter },
        { provide: Store, useClass: MockStore },
        { provide: Actions, useClass: MockActions },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    actionSubject = new Subject();
    dataGuard = TestBed.get(DataGuard);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
  });

  it('should return false on non existant target', () => {
    const state = { url: 'fake/url' };
    expect(dataGuard.canActivate({} as any, state as any)).toBeFalsy('Expected false on fake path.');
  });

  it('should dispatch target action', () => {
    const url = Object.keys(dataGuard.targetPaths)[0];
    const targetPath = dataGuard.targetPaths[url];
    dataGuard.canActivate({} as any, { url } as any);
    expect(store.dispatch).toHaveBeenCalledWith(targetPath.action());
  });

  describe('Load success', () => {
    let url;
    let targetPath;
    beforeEach(() => {
      url = Object.keys(dataGuard.targetPaths)[0];
      targetPath = dataGuard.targetPaths[url];
    });

    it('should return true', () => {
      dataGuard.canActivate({} as any, { url } as any).subscribe((result) => {
        expect(result).toBeTruthy();
      });
      actionSubject.next({ type: targetPath.success });
    });

    it('should call subActions', () => {
      dataGuard.canActivate({} as any, { url } as any).subscribe((result) => {
        expect(store.dispatch).toHaveBeenCalledTimes(targetPath.subActions.length + 1);
      });
      actionSubject.next({ type: targetPath.success });
    });

  });

  describe('Load fail', () => {
    let url;
    let targetPath;
    beforeEach(() => {
      url = Object.keys(dataGuard.targetPaths)[0];
      targetPath = dataGuard.targetPaths[url];
    });

    it('should return false', () => {
      dataGuard.canActivate({} as any, { url } as any).subscribe((result) => {
        expect(result).toBeFalsy();
      });
      actionSubject.next({ type: targetPath.fail });
    });

    it('should not load subactions', () => {
      dataGuard.canActivate({} as any, { url } as any).subscribe((result) => {
        expect(store.dispatch).toHaveBeenCalledTimes(1);
      });
    });

  });
});
