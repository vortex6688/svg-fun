import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DropdownInputComponent } from './dropdown-input.component';

describe('DropdownInputComponent', () => {
  const mockMouseEvent = { preventDefault: () => null };
  let component: DropdownInputComponent;
  let fixture: ComponentFixture<DropdownInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), FormsModule ],
      declarations: [ DropdownInputComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownInputComponent);
    component = fixture.componentInstance;
    component.options = [{
      name: 'test',
      selected: false,
    }, {
      name: 'selected',
      selected: true,
    }, {
      name: 'special',
      selected: true,
    }];
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
});
