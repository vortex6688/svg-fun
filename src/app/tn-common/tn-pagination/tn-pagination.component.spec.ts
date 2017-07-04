/* tslint:disable:no-unused-variable */
/* tslint:disable:max-classes-per-file */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TnPaginationComponent } from './tn-pagination.component';
import { TnPaginationConfig } from './pagination-config';
import { TnCommonModule } from '../tn-common.module';
import { AuthService } from '../auth';

function createGenericTestComponent<T>(html: string,
                                       type: {new (...args: any[]): T}): ComponentFixture<T> {
    TestBed.overrideComponent(type, {set: {template: html}});
    const fixture = TestBed.createComponent(type);
    fixture.detectChanges();
    return fixture as ComponentFixture<T>;
}

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function expectPages(nativeEl: HTMLElement, pagesDef: string[]): void {
  const pages = nativeEl.querySelectorAll('li');

  expect(pages.length).toEqual(pagesDef.length);
}

function expectSameValues(pagination: TnPaginationComponent, config: TnPaginationConfig) {
  expect(pagination.disabled).toBe(config.disabled);
  expect(pagination.boundaryLinks).toBe(config.boundaryLinks);
  expect(pagination.directionLinks).toBe(config.directionLinks);
  expect(pagination.ellipses).toBe(config.ellipses);
  expect(pagination.maxSize).toBe(config.maxSize);
  expect(pagination.pageSize).toBe(config.pageSize);
  expect(pagination.rotate).toBe(config.rotate);
  expect(pagination.size).toBe(config.size);
}

let queryParams = {};
class MockRouter {
  public navigate = jasmine.createSpy('navigate');
}
class MockActiveRoute {
  public get snapshot() {
    return { queryParams };
  }
}

describe('TnPaginationComponent', () => {
  let component: TnPaginationComponent;
  let fixture: ComponentFixture<TnPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      providers: [
        TnPaginationConfig,
        { provide: Router, useClass: MockRouter, },
        { provide: ActivatedRoute, useClass: MockActiveRoute, },
      ],
      declarations: [ TnPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update page items on changes', () => {
    spyOn(component, 'updatePageItems');
    component.ngOnChanges({});
    expect(component.updatePageItems).toHaveBeenCalled();
  });

  it('should initialize inputs with default values', () => {
    const defaultConfig = new TnPaginationConfig();
    expectSameValues(component, defaultConfig);
  });

  it('should emit page item events', () => {
    component.collectionSize = 6;
    component.pageSize = 4;
    component.page = 1;
    const emitSpy = jasmine.createSpy('emit');
    component.pageItemsChanges.emit = emitSpy;

    // First page
    component.updatePageItems();
    let pageItems = [1, component.pageSize];
    expect(component.pageItems).toEqual(pageItems);
    expect(emitSpy).toHaveBeenCalledWith(pageItems);

    // Same items
    emitSpy.calls.reset();
    component.updatePageItems();
    expect(component.pageItemsChanges.emit).not.toHaveBeenCalled();

    // Last page
    emitSpy.calls.reset();
    component.page = 2;
    component.updatePageItems();
    pageItems = [component.pageSize + 1, component.collectionSize];
    expect(component.pageItems).toEqual(pageItems);
    expect(emitSpy).toHaveBeenCalledWith(pageItems);
  });

  describe('query params', () => {
    let route: MockActiveRoute;
    let router: MockRouter;

    beforeEach(() => {
      route = TestBed.get(ActivatedRoute);
      router = TestBed.get(Router);
    });

    it('should select query param page on init', () => {
      spyOn(component, 'selectPage');
      const page = 5;

      // No query param
      component.ngOnInit();
      expect(component.selectPage).not.toHaveBeenCalled();

      // With param
      queryParams = { page };
      component.ngOnInit();
      expect(component.selectPage).toHaveBeenCalledWith(page);
    });

    it('should update query param on page select', () => {
      const page = 3;
      component.selectPage(page);
      expect(router.navigate).toHaveBeenCalledWith([], { queryParams: { page }});
    });
  });
});

describe('TnPaginationConfig', () => {
  const config = new TnPaginationConfig();
  config.disabled = true;
  config.boundaryLinks = true;
  config.directionLinks = false;

  config.ellipses = false;
  config.maxSize = 42;
  config.pageSize = 7;
  config.rotate = true;
  config.size = 'sm';

  class MockAuthService {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TnCommonModule.forRoot(), RouterTestingModule.withRoutes([])],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: TnPaginationConfig, useValue: config},
      ]
    });
  });

  it('should initialize inputs with provided config as provider', () => {
    const fixture = TestBed.createComponent(TnPaginationComponent);
    fixture.detectChanges();

    const pagination = fixture.componentInstance;
    expectSameValues(pagination, config);
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  public pageSize = 10;
  public collectionSize = 100;
  public page = 1;
  public boundaryLinks = false;
  public boundaryLinksFirst = '««';
  public boundaryLinksLast = '»»';
  public directionLinks = false;
  public directionLinksPrevious = '«';
  public directionLinksNext = '»';
  public size = '';
  public maxSize = 0;
  public ellipses = true;
  public rotate = false;
}
