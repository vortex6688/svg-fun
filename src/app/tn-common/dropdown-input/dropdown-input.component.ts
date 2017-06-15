import { Component, Input, Output, EventEmitter } from '@angular/core';

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
export class DropdownInputComponent {
  @Input() public options: DropdownOption[];
  @Output() public optionsChange = new EventEmitter<DropdownOption[]>();

  get selected() {
    return this.options
      .filter((option) => option.selected)
      .map((option) => option.name)
      .join(', ');
  }

  public toggleSelect(option: DropdownOption, $event: MouseEvent) {
    $event.preventDefault();
    option.selected = !option.selected;
    this.optionsChange.emit(this.options);
  }

}
