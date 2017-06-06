/* tslint:disable:max-classes-per-file */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StoreModule, Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Order, OrderActions, OrderSearch, initialOrderState } from '../../tn-common/orders';
import { License, LicenseActions } from '../../tn-common/licenses';
import { Style, StyleActions } from '../../tn-common/styles';
import { Family, FamilyActions } from '../../tn-common/families';
import { Project, ProjectActions } from '../../tn-common/projects';
import { AdminOrdersListComponent } from './admin-orders-list.component';
import { TnAdminStoreModule, storeAssets, productionReducer } from '../store';
import { TnCommonModule } from '../../tn-common/';

describe('AdminOrdersListComponent', () => {
  let component: AdminOrdersListComponent;
  let fixture: ComponentFixture<AdminOrdersListComponent>;
  let store: Store<any>;
  const orderDate = Date.now();
  const mockOrder: Order = {
    id: 1,
    user: 1,
    subtotal: 10,
    tax: 0.5,
    total: 10.5,
    status: 1,
    licensee_first_name: 'John',
    licensee_last_name: 'Doe',
    licensee_company: 'John Doe INC',
    licensee_street1: '123 Unnamed Road',
    created: '2028-06-08T18:16:50Z',
    licensee_city: 'Wonderland',
    licensee_zipcode: '33333',
    licensee_country: 'United States',
    licensee_vat: 'SuperVAT',
    payments: [
        {
            order: 128,
            amount: 34.60,
            provider: 0,
            status: 1,
            provider_data: '{ \"source\": {\"brand\": \"Visa\"} }',
            name: 'John Doe',
            street1: '1234 Hollywood',
            street2: '9876',
            state: 'Florida',
            city: 'Hollywood',
            zipcode: '11221',
            country: 'United States',
            company: 'John Doe INC',
            created: '2016-05-25T21:14:40.609000Z'
        }
    ],
    order_token: 'AnOrderToken',
    upgrade_price_adjustment: 0,
    coupon: null
  };
  const mockLicense: License = {
    id: 123,
    order: 1,
    price: '22.0000',
    price_paid: '22.0000',
    qty: 2,
    start: null,
    end: null,
    style: 286,
    years: 1,
    active: true,
    license_type: 'app',
    self_hosted: false
  };
  const mockStyle: Style = {
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
  const mockFamily: Family = {
    id: 1,
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
    style: [],
    default_style: 111,
    link_only_styles: [ 25, 26 ],
    canonical: 234,
    canonical_series: 234,
    series: [ 27, 28 ],
    visible: 2,
  };
  const mockProject: Project = {
    id: 123,
    name: 'Project 1',
    user: 1,
    domains: '["project1.com"]',
    created: '2017-03-05T18:16:50Z',
    licenses: [mockLicense],
    family_count: 1,
    style_count: 1,
  };
  const mockStyleList: Style[] = [
    { ...mockStyle, id: 2, family: 1, name: 'Non existant' },
    { ...mockStyle, id: 3, family: 1, name: 'Style light' },
    { ...mockStyle, id: 4, family: 2, name: 'Placeholder' },
    { ...mockStyle, id: 5, family: 3, name: 'Stylish' },
    { ...mockStyle, id: 6, family: 4, name: 'Stylish' },
  ];
  const mockFamilyList: Family[] = [
    { ...mockFamily, id: 1, styles: [2, 3], },
    { ...mockFamily, id: 2, styles: [4], },
    { ...mockFamily, id: 3, styles: [5], },
    { ...mockFamily, id: 4, styles: [6], },
  ];
  const mockOrderList: Order[] = [
    { ...mockOrder, id: 11, status: 1, created: new Date(orderDate).toString() },
    { ... mockOrder, id: 1, status: 2, created: new Date(orderDate - 5000).toString() },
    { ... mockOrder, id: 2, status: 0, created: new Date(orderDate).toString() },
    { ... mockOrder, id: 23456, status: 2, created: new Date(orderDate + 5000).toString() },
  ];
  const mockLicenseList: License[] = [
    { ...mockLicense, id: 1, order: 1, style: 2, license_type: 'app' },
    { ...mockLicense, id: 2, order: 1, style: 3, license_type: 'epub' },
    { ...mockLicense, id: 3, order: 2, style: 4, license_type: 'web' },
    { ...mockLicense, id: 4, order: 11, style: 5, license_type: 'web', self_hosted: true },
  ];
  const mockProjectList: Project[] = [
    { ...mockProject, id: 2, name: 'p1', licenses: [mockLicenseList[3]]},
    { ...mockProject, id: 3, name: 'p2', licenses: [mockLicenseList[2]], domains: '["p2.com"]'},
    { ...mockProject, id: 4, name: 'p3', licenses: [mockLicenseList[1]] },
  ];

  class MockOrderActions {
    public searchQuery = jasmine.createSpy('searchQuery');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        StoreModule.provideStore(productionReducer),
      ],
      declarations: [
        AdminOrdersListComponent,
      ],
      providers: [
        { provide: NgbModal },
        { provide: OrderActions, useClass: MockOrderActions },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AdminOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call order search action', () => {
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
    spyOn(store, 'dispatch');
    component.searchOrders(query);
    expect(orderActions.searchQuery).toHaveBeenCalledWith(query);
  });

  describe('order combining', () => {
    const styleFamilies = mockStyleList.map((style) => ({
      ...style,
      family: mockFamilyList.find((family) => family.id === style.family),
    }));
    const licensesStyles = mockLicenseList.map((license) => ({
      ...license,
      style: styleFamilies.find((style) => style.id === license.style),
    }));
    const licensedOrders = mockOrderList.map((order) => ({
      ...order,
      licenses: licensesStyles.filter((license) => license.order === order.id),
    }));
    const licensesOrdersProjects = licensedOrders.map((order) => ({
      ...order,
      projects: mockProjectList.filter((project) =>
                                       project.licenses.some((projectLicense) =>
                                                              order.licenses.map((license) => license.id)
                                                              .indexOf(projectLicense.id) !== -1)),
    }));

    beforeEach(() => {
      store.dispatch({ type: OrderActions.ADD_ORDERS, payload: mockOrderList });
      store.dispatch({ type: LicenseActions.ADD_LICENSES, payload: mockLicenseList });
      store.dispatch({ type: FamilyActions.ADD_FAMILIES, payload: mockFamilyList });
      store.dispatch({ type: StyleActions.ADD_STYLES, payload: mockStyleList });
      store.dispatch({ type: ProjectActions.ADD_PROJECTS, payload: mockProjectList });
    });

    it('should assign matching families to styles', () => {
      component.styleFamilies$.subscribe((styles) => {
        expect(styles).toEqual(styleFamilies);
      });
    });

    it('should assign matching styles to licenses', () => {
      component.licensesStyles$.subscribe((licenses) => {
        expect(licenses).toEqual(licensesStyles);
      });
    });

    it('should assign matching licenses to orders', () => {
      component.ordersLicenses$.subscribe((orders) => {
        expect(orders).toEqual(licensedOrders);
      });
    });

    it('should filter orders by id', () => {
      const target = licensesOrdersProjects[0];
      const searchQuery = {
        ...initialOrderState.search,
        id: target.id,
      };
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders: Order[]) => {
        expect(orders).toEqual([target]);
      });
    });

    it('should filter orders by status', () => {
      const status = [1, 2];
      const searchQuery = {
        ...initialOrderState.search,
        status,
      };
      const expected = licensesOrdersProjects.filter((order) => status.indexOf(order.status) !== -1);
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders: Order[]) => {
        expect(orders).toEqual(expected);
      });
    });

    it('should filter orders by date range', () => {
      const from = new Date(orderDate - 4000);
      const to = new Date(orderDate + 4000);
      const searchQuery = {
        ...initialOrderState.search,
        from,
        to,
      };
      const expected = licensesOrdersProjects.filter((order) =>
        new Date(order.created) >= from &&
        new Date(order.created) <= to
      );
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders: Order[]) => {
        expect(orders).toEqual(expected);
      });
    });

    it('should filter orders by font name', () => {
      const font = 'style';
      const searchQuery = {
        ...initialOrderState.search,
        font,
      };
      const expected = licensesOrdersProjects.filter((order) =>
        order.licenses.some((license) => new RegExp(font, 'i').test(license.style.name)));
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders: Order[]) => {
        expect(orders).toEqual(expected);
      });
    });

    it('should filter orders by licenses', () => {
      const licenses = [
        { license_type: 'app' },
        { license_type: 'web', self_hosted: true },
      ];
      const to = new Date(orderDate + 4000);
      const searchQuery = {
        ...initialOrderState.search,
        licenses,
      };
      const expected = licensesOrdersProjects.filter((order) => licenses.some((licenseType) =>
        Object.entries(licenseType).every(([key, value]) =>
          order.licenses.some((license) => license[key] === value))));
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders: Order[]) => {
        expect(orders).toEqual(expected);
      });
    });

    it('should filter orders by project name', () => {
      const target = licensesOrdersProjects[0];
      const searchQuery = {
        ...initialOrderState.search,
        project: 'p1',
      };
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders) => {
        expect(orders).toEqual([target]);
      });
    });

    it('should filter orders by project domain', () => {
      const target = licensesOrdersProjects[2];
      const searchQuery = {
        ...initialOrderState.search,
        project: 'p2.com',
      };
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders) => {
        expect(orders).toEqual([target]);
      });
    });

  });
});
