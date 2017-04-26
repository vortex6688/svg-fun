import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderRowComponent } from './order-row.component';
import { OrderStatusPipe } from './order-status.pipe';

describe('OrderRowComponent', () => {
  let component: OrderRowComponent;
  let fixture: ComponentFixture<OrderRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ OrderRowComponent, OrderStatusPipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRowComponent);
    component = fixture.componentInstance;
    component.order = {id: 1};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
