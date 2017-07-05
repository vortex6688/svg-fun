import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DropdownInputComponent } from './dropdown-input.component';

describe('DropdownInputComponent', () => {
  const mockMouseEvent = { preventDefault: () => null };
  let component: DropdownInputComponent;
  let fixture: ComponentFixture<DropdownInputComponent>;
  const optionList = [{
    name: 'test',
    selected: false,
  }, {
    name: 'selected',
    selected: true,
  }, {
    name: 'special',
    selected: true,
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), FormsModule, ReactiveFormsModule  ],
      declarations: [ DropdownInputComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownInputComponent);
    component = fixture.componentInstance;
    component.options = [...optionList];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all selected options', () => {
    const getExpected = (options) => options.filter((option) =>
      option.selected).map((option) => option.name).join(', ');
    expect(component.selected).toEqual(getExpected(component.options));
    component.options[1].selected = false;
    expect(component.selected).toEqual(getExpected(component.options));
  });

  it('should toggle selected state', () => {
    const targetIndex = 1;
    const emitSpy = jasmine.createSpy('emit');
    const expected = component.options.map((option, i) => ({
      ...option,
      selected: i === targetIndex ? !option.selected : option.selected,
    }));
    component.optionsChange.emit = emitSpy;
    component.toggleSelect(component.options[targetIndex], mockMouseEvent as MouseEvent);
    expect(component.options).toEqual(expected);
    expect(component.optionsChange.emit).toHaveBeenCalledWith(component.options);
  });

  it('should update option subject onChanges', () => {
    const expected = [
      ...optionList,
      { name: 'super', selected: true, value: 'yes' }
    ];
    component.options = expected;
    component.ngOnChanges({
      options: {
        currentValue: expected,
      }
    });
    component.options$.subscribe((options) => expect(options).toEqual(expected));
  });

  describe('filtering', () => {
    const getExpected = (list, filter) => {
      const filterRegex = new RegExp(filter, 'i');
      return list.filter((item) => filterRegex.test(item));
    };
    it('should have all elements initially', () => {
      component.filteredOptions$.skip(1).subscribe((options) => expect(options).toEqual(component.options));

    });
    it('should return filter matching items', () => {
      const filter = 'e';
      const expected = getExpected(optionList, filter);
      component.selectionFilter.setValue(filter);
      component.filteredOptions$.skip(1).subscribe((options) => expect(options).toEqual(expected));
    });

    it('should return empty list on no matches', () => {
      const filter = 'fake name no match';
      const expected = getExpected(optionList, filter);
      component.selectionFilter.setValue(filter);
      component.filteredOptions$.skip(1).subscribe((options) => expect(options).toEqual(expected));
    });
  });
});
