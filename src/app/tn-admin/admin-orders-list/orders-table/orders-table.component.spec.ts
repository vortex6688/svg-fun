import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderRowComponent, OrderStatusPipe } from './order-row';
import { OrdersTableComponent } from './orders-table.component';
import { OrderByPipe } from '../../../tn-common/pipes/';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OrdersTableComponent', () => {
  let component: OrdersTableComponent;
  let fixture: ComponentFixture<OrdersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ OrderRowComponent, OrdersTableComponent, OrderStatusPipe, OrderByPipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct sort key', () => {
    const testKey = 'key';
    const nextKey = 'key2';
    component.sortBy(testKey);
    expect(component.sortKey).toEqual(`-${testKey}`, 'Expected descending key');
    component.sortBy(testKey);
    expect(component.sortKey).toEqual(`+${testKey}`, 'Expected ascending key');
    component.sortBy(nextKey);
    expect(component.sortKey).toEqual(`-${nextKey}`, 'Expected next key');
  });
});
