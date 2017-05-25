/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';

import { Order, OrderActions } from '../../tn-common/orders';
import { License, LicenseActions } from '../../tn-common/licenses';
import { AdminOrdersListComponent } from './admin-orders-list.component';
import { TnAdminStoreModule } from '../store';

describe('AdminOrdersListComponent', () => {
  let component: AdminOrdersListComponent;
  let fixture: ComponentFixture<AdminOrdersListComponent>;
  let storeSubject: BehaviorSubject<object>;

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
  }

  class MockOrderActions {
    public searchQuery = jasmine.createSpy('searchQuery');
  }

  class MockLicenseActions {
    public searchQuery = jasmine.createSpy('searchQuery');
  }

  beforeEach(async(() => {
    storeSubject = new BehaviorSubject({});
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        AdminOrdersListComponent,
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: OrderActions, useClass: MockOrderActions },
        { provide: LicenseActions, useClass: MockLicenseActions },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call order search action', () => {
    const licenseActions = fixture.debugElement.injector.get(LicenseActions);
    const orderActions = fixture.debugElement.injector.get(OrderActions);
    const query = {
      id: 2,
      from: null,
      to: new Date(),
      customer: 'custom',
      project: 'typenetwork',
      font: 'best font',
      foundry: 'all of dem',
      status: [],
      licenses: [],
    };
    component.searchOrders(query);
    expect(orderActions.searchQuery).toHaveBeenCalledWith(query);
    expect(licenseActions.searchQuery).toHaveBeenCalled();
  });
});
