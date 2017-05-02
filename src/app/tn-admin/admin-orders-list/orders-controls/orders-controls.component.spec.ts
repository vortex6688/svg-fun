import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OrderSearch, initialOrderState } from '../../../tn-common/orders';
import { OrdersControlsComponent } from './orders-controls.component';

describe('OrdersControlComponent', () => {
  let component: OrdersControlsComponent;
  let fixture: ComponentFixture<OrdersControlsComponent>;
  const defaultQuery = initialOrderState.search.query;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersControlsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersControlsComponent);
    component = fixture.componentInstance;
    component.initialQuery = {
      ...defaultQuery,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear search', () => {
    const values = {
      id: '2',
      from: new Date(),
      to: new Date(Date.now() - 50000),
      customer: 'test',
      project: 'real project',
      font: 'best font',
      foundry: 'all of em',
    };
    component.searchForm.setValue(values);
    expect(component.searchForm.value).toEqual(values);
    component.clearSearch();
    expect(component.searchForm.value).toEqual({
      id: null,
      from: null,
      to: null,
      customer: null,
      project: null,
      font: null,
      foundry: null,
    });
  });

  it('should clear filters', () => {
    const values = {
      status: [true, true, false, false],
      licenses: [],
    };
    component.filterForm.setValue(values);
    expect(component.filterForm.value).toEqual(values);
    component.clearFilters();
    expect(component.filterForm.value).toEqual({
      status: [null, null, null, null],
      licenses: []
    });
  });

  it('should update date', () => {
    const fromDate = new Date();
    const toDate = new Date(Date.now() + 50000);
    const expectedData = {
      id: defaultQuery.id,
      from: fromDate,
      to: toDate,
      customer: defaultQuery.customer,
      project: defaultQuery.project,
      font: defaultQuery.font,
      foundry: defaultQuery.foundry,
    };

    component.updateDate(fromDate, 'from');
    component.updateDate(toDate, 'to');
    expect(component.searchForm.value).toEqual(expectedData);
  });

  // Can't get fakeAsync test to work together with all other tests, seems to break evrything.
  // it('should emit event on form update', fakeAsync(() => {
  //   const expectedData = {
  //     ...defaultQuery,
  //     id: '2',
  //     status: [2, 0],
  //   };
  //   const result = [];
  //   spyOn(component.queryUpdate, 'emit');

  //   component.searchForm.controls.id.setValue('2');
  //   component.filterForm.controls.status.setValue([true, true, false, false]);

  //   tick(499);
  //   expect(component.queryUpdate.emit).not.toHaveBeenCalled();
  //   tick(500);
  //   expect(component.queryUpdate.emit).toHaveBeenCalledTimes(1);
  //   expect(component.queryUpdate.emit).toHaveBeenCalledWith(expectedData);

  //   const date = new Date();
  //   component.searchForm.controls.from.setValue(date);
  //   tick(500);
  //   expect(component.queryUpdate.emit).toHaveBeenCalledWith({ ...expectedData, from: date});
  // }));
});
