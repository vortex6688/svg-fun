import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { FamilySearch } from '../../../tn-common/families';
import { DropdownOption } from '../../../tn-common/dropdown-input/';
import { Foundry } from '../../../tn-common/foundries';

@Component({
  selector: 'families-controls',
  templateUrl: './families-controls.component.html'
})
export class FamiliesControlsComponent implements OnInit, OnChanges {
  @Input() public initialQuery;
  @Input() public foundries: Foundry[];
  @Output() public queryUpdate = new EventEmitter<FamilySearch>();

  public visibilityData = [
    { name: 'Inactive', value: 2 },
    { name: 'Staff Only', value: 0 },
    { name: 'With Link', value: 1 },
    { name: 'Everyone', value: 3 },
  ];

  public categoriesData = [
    { name: 'Sans', value: 2 },
    { name: 'Serif', value: 0 },
    { name: 'Slab Serif', value: 1 },
    { name: 'Script', value: 3 },
    { name: 'Decorative', value: 4 },
    { name: 'Symbol', value: 5 },
    { name: 'Wacky', value: 6 },
  ];

  public searchForm: FormGroup = this.fb.group({});
  public filterForm: FormGroup = this.fb.group({});
  public foundryList: DropdownOption[] = [];

  get visibilityControls(): FormArray { return this.filterForm.get('visibility') as FormArray; }
  get categoryControls(): FormArray { return this.filterForm.get('categories') as FormArray; }

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
    const visibilityControls = this.visibilityData.map((visibility) =>
      new FormControl(this.initialQuery.visibility.includes(visibility.value)));
    const categoryControls = this.categoriesData.map((category) =>
      new FormControl(this.initialQuery.categories.includes(category.value)));

    this.searchForm = this.fb.group({
      name: this.initialQuery.name,
      foundry: this.fb.array(this.initialQuery.foundry),
      designer: this.initialQuery.designer,
    });

    this.filterForm = this.fb.group({
      visibility: this.fb.array(visibilityControls),
      categories: this.fb.array(categoryControls),
    });

    const searchFormChanges = this.searchForm.valueChanges.startWith(this.searchForm.value);
    const filterFormChanges = this.filterForm.valueChanges
      .startWith(this.filterForm.value)
      .map(({visibility, categories}) => {
        const activeVisibility = visibility.reduce((result, item, i) => {
          if (item) { result.push(this.visibilityData[i].value); }
          return result;
        }, []);
        const activeCategories = categories.reduce((result, item, i) => {
          if (item) { result.push(this.categoriesData[i].value); }
          return result;
        }, []);

        return {
          visibility: activeVisibility,
          categories: activeCategories,
        };
      });

    searchFormChanges.combineLatest(filterFormChanges)
      .skip(1)
      .debounceTime(500)
      .subscribe(([search, filter]) => {
        this.queryUpdate.emit({
          ...search,
          ...filter,
        });
      });
  }

  /**
   * Update foundry form with selected foundries
   *
   * @public
   * @param {DropdownOption[]} options
   * @memberof FamiliesControlsComponent
   */
  public updateFoundry(options: DropdownOption[]) {
    const selectedFoundries = options.reduce((result, option) => {
      if (option.selected) {
        result.push(option.value);
      }
      return result;
    }, []);
    this.searchForm.setControl('foundry', this.fb.array(selectedFoundries));
  }

  /**
   * Clear search and filter form group.
   *
   * @public
   * @memberOf FamiliesControlsComponent
   */
  public clearFilters() {
    this.searchForm.reset();
    this.searchForm.setControl('foundry', this.fb.array([]));
    this.foundryList = this.foundryList.map((foundry) => ({ ...foundry, selected: false }));
    this.filterForm.reset();
  }
}
