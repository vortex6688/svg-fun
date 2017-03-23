/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';
import { TnPaginationComponent } from './tn-pagination.component';
import { TnPaginationConfig } from './pagination-config';
import { TnCommonModule } from '../tn-common.module';

function createGenericTestComponent<T>
  (html: string, type: {new (...args: any[]): T}): ComponentFixture<T> {
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

describe('TnPaginationComponent', () => {
  let pagination: TnPaginationComponent;
  let fixture: ComponentFixture<TnPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule, RouterTestingModule.withRoutes([])],
      providers:    [ TnPaginationConfig ],
      declarations: [ TnPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnPaginationComponent);
    pagination = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(pagination).toBeTruthy();
  });
});

describe('TnPaginationComponent', () => {
  describe('business logic', () => {

    let pagination: TnPaginationComponent;

    beforeEach(() => { pagination = new TnPaginationComponent(new TnPaginationConfig()); });

    it('should initialize inputs with default values', () => {
      const defaultConfig = new TnPaginationConfig();
      expectSameValues(pagination, defaultConfig);
    });

    it('should calculate and update no of pages (default page size)', () => {
      pagination.collectionSize = 100;
      pagination.ngOnChanges(null);
      expect(pagination.pages.length).toEqual(10);

      pagination.collectionSize = 200;
      pagination.ngOnChanges(null);
      expect(pagination.pages.length).toEqual(20);
    });

    it('should calculate and update no of pages (custom page size)', () => {
      pagination.collectionSize = 100;
      pagination.pageSize = 20;
      pagination.ngOnChanges(null);
      expect(pagination.pages.length).toEqual(5);

      pagination.collectionSize = 200;
      pagination.ngOnChanges(null);
      expect(pagination.pages.length).toEqual(10);

      pagination.pageSize = 10;
      pagination.ngOnChanges(null);
      expect(pagination.pages.length).toEqual(20);
    });

    it('should allow setting a page within a valid range (default page size)', () => {
      pagination.collectionSize = 100;
      pagination.page = 2;
      pagination.ngOnChanges(null);
      expect(pagination.page).toEqual(2);
    });

    it('should auto-correct page no if outside of valid range (default page size)', () => {
      pagination.collectionSize = 100;
      pagination.page = 100;
      pagination.ngOnChanges(null);
      expect(pagination.page).toEqual(10);

      pagination.page = -100;
      pagination.ngOnChanges(null);
      expect(pagination.page).toEqual(1);

      pagination.page = 5;
      pagination.collectionSize = 10;
      pagination.ngOnChanges(null);
      expect(pagination.page).toEqual(1);
    });

    it('should allow setting a page within a valid range (custom page size)', () => {
      pagination.collectionSize = 100;
      pagination.pageSize = 20;
      pagination.page = 2;
      pagination.ngOnChanges(null);
      expect(pagination.page).toEqual(2);
    });
  });
});

describe('Custom config as provider', () => {
  let config = new TnPaginationConfig();
  config.disabled = true;
  config.boundaryLinks = true;
  config.boundaryLinksFirst = 'first';
  config.boundaryLinksLast = 'last';
  config.directionLinks = false;
  config.directionLinksPrevious = 'previous';
  config.directionLinksNext = 'next';
  config.ellipses = false;
  config.maxSize = 42;
  config.pageSize = 7;
  config.rotate = true;
  config.size = 'sm';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TnCommonModule.forRoot()],
      providers: [{provide: TnPaginationConfig, useValue: config}]
    });
  });

  it('should initialize inputs with provided config as provider', () => {
    const fixture = TestBed.createComponent(TnPaginationComponent);
    fixture.detectChanges();

    let pagination = fixture.componentInstance;
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
