import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseComponent } from '../../collapse';
import { OrdersCollapseComponent } from './orders-collapse.component';

describe('OrdersCollapseComponent', () => {
  let component: OrdersCollapseComponent;
  let fixture: ComponentFixture<OrdersCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ CollapseComponent, OrdersCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
