import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-components-dropdown',
  templateUrl: './components-dropdown.component.html',
  styleUrls: ['./components-dropdown.component.scss']
})
export class ComponentsDropdownComponent {

// add some data to test dropdown list items
// TO DO First item in the list should be selected by default and shown in place of
// the button placeholder text, alternatively it can be random item in the list instead of the first one
  public optionList = [
    { name: 'Item 1', value: 5 },
    { name: 'Another Item', value: 2, selected: true },
    { name: 'Some other item', value: 1 }
  ];

  public updateOptions(event) { return null; }
}