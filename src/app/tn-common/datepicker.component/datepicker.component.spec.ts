import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { DatepickerComponent } from './datepicker.component';

describe('OrdersTableComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        FormsModule,
      ],
      declarations: [ DatepickerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit date updates', () => {
    spyOn(component.dateUpdate, 'emit');

    component.updateDate('');
    expect(component.dateUpdate.emit).not.toHaveBeenCalled();

    const date = { year: 2012, month: 12, day: 21 };
    component.updateDate(date);
    expect(component.dateUpdate.emit).toHaveBeenCalledWith(new Date(`${date.year}-${date.month}-${date.day}`));
  });
});
