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
import { Foundry, FoundryActions } from '../../tn-common/foundries';
import { Designer, DesignerActions } from '../../tn-common/designers';
import { AdminOrdersListComponent } from './admin-orders-list.component';
import { TnAdminStoreModule, productionReducer } from '../store';
import { TnCommonModule } from '../../tn-common/';

describe('AdminOrdersListComponent', () => {
  let component: AdminOrdersListComponent;
  let fixture: ComponentFixture<AdminOrdersListComponent>;
  let store: Store<any>;
  const orderDate = Date.now();
  const STATUSES = [
    'Pending',          // 0
    'Partially Paid',   // 1
    'Paid in Full',     // 2
    'Cancelled',        // 3
    'Approved, Unpaid', // 4
  ];
  const CUSTOMERSTATUS = [
    'Returning customer', // 0
    'New customer',       // 1
  ];

  const mockOrder: Order = {
    id: 1,
    user: 1,
    subtotal: 10,
    tax: 0.5,
    total: 10.5,
    status: 1,
    licensee: {
      first_name: 'John',
      last_name: 'Doe',
      company: 'John Doe INC',
      address1: '123 Unnamed Road',
      city: 'Wonderland',
      zipcode: '33333',
      country: 'United States',
      vat: 'SuperVAT',
    },
    created: '2028-06-08T18:16:50Z',
    payments: [
        {
            order: 128,
            amount: 34.60,
            provider: 0,
            status: 1,
            provider_data: '{ \"source\": {\"brand\": \"Visa\"} }',
            billing: {
              name: 'John Doe',
              address1: '1234 Hollywood',
              address2: '9876',
              state: 'Florida',
              city: 'Hollywood',
              zipcode: '11221',
              country: 'United States',
              company: 'John Doe INC',
            },
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
    foundry: [2],
    designer: [3],
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
    licenses: [1],
    family_count: 1,
    style_count: 1,
  };
  const mockFoundry: Foundry = {
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
  const mockDesigner: Designer = {
    id: 1,
    name: 'mega designer',
    slug: 'mega-designer',
    description: 'loves design',
    birth_date: '1999/11/30',
    death_date: '1999/12/30',
    foundry: [2],
    title: [1],
  };

  const mockStyleList: Style[] = [
    { ...mockStyle, id: 2, family: 1, foundry: [1], name: 'Non existant' },
    { ...mockStyle, id: 3, family: 1, foundry: [2, 3], name: 'Style light' },
    { ...mockStyle, id: 4, family: 2, foundry: [2], name: 'Placeholder' },
    { ...mockStyle, id: 5, family: 3, foundry: [4], name: 'Stylish' },
    { ...mockStyle, id: 6, family: 4, foundry: [5], name: 'Stylish' },
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
    { ...mockProject, id: 2, name: 'p1', licenses: [4]},
    { ...mockProject, id: 3, name: 'p2', licenses: [3], domains: '["p2.com"]'},
    { ...mockProject, id: 4, name: 'p3', licenses: [1]},
  ];
  const mockFoundryList: Foundry[] = [
    { ...mockFoundry, id: 2, name: 'foundr' },
    { ...mockFoundry, id: 3, name: 'supa' },
    { ...mockFoundry, id: 4, name: 'dupa' },
  ];
  const mockDesignerList: Designer[] = [
    { ...mockDesigner, id: 2, name: 'foundr' },
    { ...mockDesigner, id: 3, name: 'supa' },
    { ...mockDesigner, id: 4, name: 'dupa' },
  ];

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function getLicenseTypeName(licenseType: string, selfHosted: boolean) {
    if (licenseType === 'web' && selfHosted) {
      return 'Web (self-hosted)';
    } else if (licenseType === 'web' && !selfHosted) {
      return 'Web (hosted)';
    } else if (licenseType === 'epub') {
      return 'E-publication';
    } else if (licenseType === 'app') {
      return 'Application';
    } else {
      return this.capitalizeFirstLetter(licenseType);
    }
  }

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
      foundry: [2],
      designer: [3],
      status: [],
      licenses: [],
    };
    spyOn(store, 'dispatch');
    component.searchOrders(query);
    expect(orderActions.searchQuery).toHaveBeenCalledWith(query);
  });

  describe('order combining', () => {
    const stylesPopulated = mockStyleList.map((style) => ({
      ...style,
      family: mockFamilyList.find((family) => family.id === style.family),
      foundry: (style.foundry as number[]).map((id) =>
        mockFoundryList.find((foundry) => foundry.id === id)),
      designer: (style.designer as number[]).map((id) =>
        mockDesignerList.find((designer) => designer.id === id)),
    }));
    const licensesStyles = mockLicenseList.map((license) => ({
      ...license,
      license_type_name: getLicenseTypeName(license.license_type, license.self_hosted),
      style: stylesPopulated.find((style) => style.id === license.style),
    }));
    const licensedOrders = mockOrderList.map((order) => ({
      ...order,
      statusName: STATUSES[order.status],
      licenses: licensesStyles.filter((license) => license.order === order.id),
      new_customer_name: CUSTOMERSTATUS[+order.new_customer],
    }));
    const licensesOrdersProjects = licensedOrders.map((order) => ({
      ...order,
      projects: mockProjectList.filter((project) => order.licenses.some(({ id }) =>
        (project.licenses as number[]).indexOf(id) !== -1)),
    }));

    beforeEach(() => {
      store.dispatch({ type: OrderActions.LOAD_ORDERS_SUCCESS, payload: mockOrderList });
      store.dispatch({ type: LicenseActions.LOAD_LICENSES_SUCCESS, payload: mockLicenseList });
      store.dispatch({ type: FamilyActions.LOAD_FAMILIES_SUCCESS, payload: mockFamilyList });
      store.dispatch({ type: StyleActions.LOAD_STYLES_SUCCESS, payload: mockStyleList });
      store.dispatch({ type: ProjectActions.LOAD_PROJECTS_SUCCESS, payload: mockProjectList });
      store.dispatch({ type: FoundryActions.LOAD_FOUNDRIES_SUCCESS, payload: mockFoundryList });
      store.dispatch({ type: DesignerActions.LOAD_DESIGNERS_SUCCESS, payload: mockDesignerList });
    });

    it('should populate style data', () => {
      component.stylesPopulated$.subscribe((styles) => {
        expect(styles).toEqual(stylesPopulated);
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

    it('should filter orders by foundries', () => {
      const targets = [2, 3];
      const searchQuery = {
        ...initialOrderState.search,
        foundry: targets,
      };

      const expected = licensesOrdersProjects.filter((order) => order.licenses.some((license) =>
        license.style.foundry.some((foundry) => foundry && targets.indexOf(foundry.id) !== -1)));
      store.dispatch({ type: OrderActions.SEARCH_QUERY, payload: searchQuery });
      component.filteredOrdersLicenses$.subscribe((orders: Order[]) => {
        expect(orders).toEqual(expected);
      });
    });
  });
});
