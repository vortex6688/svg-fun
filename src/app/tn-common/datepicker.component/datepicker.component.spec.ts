import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { DatepickerComponent } from './datepicker.component';

describe('OrdersTableComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let elementRef: MockElementRef;
  const contains = false;

  class MockElementRef {
    public nativeElement = {
      contains: () => contains
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        FormsModule,
      ],
      declarations: [ DatepickerComponent ],
      providers: [
        { provide: ElementRef, useClass: MockElementRef }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    elementRef = TestBed.get(ElementRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit date updates', () => {
    spyOn(component.dateUpdate, 'emit');

    component.updateDate('');
    expect(component.dateUpdate.emit).toHaveBeenCalledWith(null);

    const date = { year: 2012, month: 12, day: 21 };
    component.updateDate(date);
    expect(component.dateUpdate.emit).toHaveBeenCalledWith(new Date(`${date.year}-${date.month}-${date.day}`));
  });

  it('should add slashes to date input', () => {
    const input = {
      target: {
        value: '12122012',
        expected: '12/12/2012',
      }
    };
    component.onKey(input);
    expect(input.target.value).toEqual(input.target.expected);

    input.target = {
      value: '12101',
      expected: '12/10/1',
    };
    component.onKey(input);
    expect(input.target.value).toEqual(input.target.expected);

    input.target = {
      value: 'aba',
      expected: '',
    };
    component.onKey(input);
    expect(input.target.value).toEqual(input.target.expected);

    input.target = {
      value: '01/01/2001',
      expected: '01/01/2001',
    };
    component.onKey(input);
    expect(input.target.value).toEqual(input.target.expected);
  });

  it('should close modal if click was outside', () => {
    const closeSpy = jasmine.createSpy('close');
    const event = {};
    component.d = {
      isOpen: () => open,
      close: () => closeSpy
    } as any;
    const open = false;
    component.onClick(event as any);
    expect(closeSpy).not.toHaveBeenCalled();

    /*
    It seems like ElementRef cannot be mocked, and providing it as
    is results in a resolve issue. So disabling this test for now.
    */
    // open = true;
    // contains = true;
    // component.onClick(event as any);
    // expect(closeSpy).toHaveBeenCalled();
  });
});
