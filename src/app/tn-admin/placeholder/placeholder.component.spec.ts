/* tslint:disable:max-classes-per-file */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthActions, ANONYMOUS_AUTHORIZATION as ANONYMOUS } from '../../tn-common/auth';

import { PlaceholderComponent } from './placeholder.component';

fdescribe('PlaceholderComponent', () => {
  let component: PlaceholderComponent;
  let fixture: ComponentFixture<PlaceholderComponent>;
  let storeSubject: BehaviorSubject<object>;
  let router: MockRouter;

  class MockRouter {
    public navigate = jasmine.createSpy('navigate').and.callThrough();
  }

  class MockStore {
    public select = () => storeSubject;
  }

  beforeEach(async(() => {
    storeSubject = new BehaviorSubject(ANONYMOUS);
    TestBed.configureTestingModule({
      declarations: [ PlaceholderComponent ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: Store, useClass: MockStore },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on user data', () => {
    // Initial
    expect(router.navigate).not.toHaveBeenCalled();

    // No token
    storeSubject.next({});
    expect(router.navigate).not.toHaveBeenCalled();

    // Legit
    storeSubject.next({ token: 'tokenString' });
    expect(router.navigate).toHaveBeenCalled();
  });
});
