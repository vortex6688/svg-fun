import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

export interface DropdownOption {
  name: string;
  selected: boolean;
  value?: any;
}

@Component({
  selector: 'dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.scss']
})
export class DropdownInputComponent implements OnChanges {
  @Input() public options: DropdownOption[] = [];
  @Output() public optionsChange = new EventEmitter<DropdownOption[]>();

  public selectionFilter = new FormControl('');
  public options$ = new BehaviorSubject([]);
  public filteredOptions$ = Observable.combineLatest(
    this.selectionFilter.valueChanges.startWith(''),
    this.options$,
    (filter, options) => {
      const filterRegex = new RegExp(filter, 'i');
      return options.filter((option) => filterRegex.test(option.name));
    }
  );

  get selected() {
    return this.options
      .filter((option) => option.selected)
      .map((option) => option.name)
      .join(', ');
  }

  public ngOnChanges(changes) {
    this.options$.next(changes.options ? changes.options.currentValue : []);
  }

  public toggleSelect(option: DropdownOption, $event: MouseEvent) {
    $event.preventDefault();
    option.selected = !option.selected;
    this.optionsChange.emit(this.options);
  }

}
