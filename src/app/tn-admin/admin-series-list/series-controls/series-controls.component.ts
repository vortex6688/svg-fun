import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { SeriesSearch } from '../../../tn-common/series';
import { DropdownOption } from '../../../tn-common/dropdown-input/';
import { Foundry } from '../../../tn-common/foundries';

@Component({
  selector: 'series-controls',
  templateUrl: './series-controls.component.html'
})
export class SeriesControlsComponent implements OnInit, OnChanges {
  @Input() public initialQuery;
  @Input() public foundries: Foundry[];
  @Output() public queryUpdate = new EventEmitter<SeriesSearch>();

  public searchForm: FormGroup = this.fb.group({});
  public foundryList: DropdownOption[] = [];

  constructor(private fb: FormBuilder) {
  }

  public ngOnChanges(changes) {
    if (changes.foundries) {
      this.foundryList = this.foundries.map((foundry) => ({
        name: foundry.name,
        value: foundry.id,
        selected: !!this.initialQuery ? this.initialQuery.foundry.indexOf(foundry.id) !== -1 : false})) || [];
    }
  }

  public ngOnInit() {
    this.searchForm = this.fb.group({
      name: this.initialQuery.name,
      foundry: this.fb.array(this.initialQuery.foundry),
    });

    const searchFormChanges = this.searchForm.valueChanges.startWith(this.searchForm.value);

    searchFormChanges
      .skip(1)
      .debounceTime(500)
      .subscribe((search) => {
        this.queryUpdate.emit(search);
      });
  }

  /**
   * Update specified form with selected items
   *
   * @public
   * @param {DropdownOption[]} options
   * @param {string} item
   * @memberof SeriesControlsComponent
   */
  public updateList(options: DropdownOption[], item: string) {
    const selectedItems = options.reduce((result, option) => {
      if (option.selected) {
        result.push(option.value);
      }
      return result;
    }, []);
    this.searchForm.setControl(item, this.fb.array(selectedItems));
  }

  /**
   * Clear search and filter form group.
   *
   * @public
   * @memberof SeriesControlsComponent
   */
  public clearFilters() {
    this.searchForm.reset();
    this.searchForm.setControl('foundry', this.fb.array([]));
    this.foundryList = this.foundryList.map((foundry) => ({ ...foundry, selected: false }));
  }
}
