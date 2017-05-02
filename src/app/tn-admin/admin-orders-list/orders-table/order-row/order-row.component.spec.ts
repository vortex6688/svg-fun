import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderRowComponent } from './order-row.component';
import { OrderStatusPipe } from './order-status.pipe';
import { BehaviorSubject } from 'rxjs/Rx';

describe('OrderRowComponent', () => {
  let component: OrderRowComponent;
  let fixture: ComponentFixture<OrderRowComponent>;
  let collapseSubject: BehaviorSubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ OrderRowComponent, OrderStatusPipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    collapseSubject = new BehaviorSubject(true);
    fixture = TestBed.createComponent(OrderRowComponent);
    component = fixture.componentInstance;
    component.order = {id: 1};
    component.collapseSubject = collapseSubject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle collapse on collapse events', () => {
    expect(component.isCollapsed).toBeTruthy('Should have been collapsed initially');
    collapseSubject.next(false);
    expect(component.isCollapsed).toBeFalsy('Should have been expanded after event');
  });

  it('should unsubscribe on destroy', () => {
    expect(collapseSubject.observers.length).toEqual(1, 'Should subscribe initially');
    fixture.destroy();
    expect(collapseSubject.observers.length).toEqual(0, 'Should unsubscribe after destruction');
  });

  describe('OrderStatusPipe', () => {
    let pipe: OrderStatusPipe;
    const STATUSES = [
      'Pending',        // 0
      'Partially Paid', // 1
      'Paid in Full',   // 2
      'Cancelled'       // 3
    ];

    beforeEach(() => {
      pipe = new OrderStatusPipe();
    });

    it('should transform a valid order status id to its corresponding label', () => {
      const randomStatusId: number = Math.floor(Math.random() * 4);
      expect(pipe.transform(randomStatusId)).toEqual(STATUSES[randomStatusId]);
    });

    it('should transform an invalid order status id to `Unknown`', () => {
      const outOfRangeStatusId: number = 10;
      expect(pipe.transform(outOfRangeStatusId)).toEqual('Unknown');
    });

  });
});
