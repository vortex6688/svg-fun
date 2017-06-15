import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { StyleSearch } from '../../../tn-common/styles';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'styles-controls',
  templateUrl: './styles-controls.component.html'
})
export class StylesControlsComponent implements OnInit {
  @Input() public initialQuery;
  @Output() public queryUpdate = new EventEmitter<StyleSearch>();

  public visibilityData = [
    { name: 'Inactive', value: 0 },
    { name: 'Staff Only', value: 1 },
    { name: 'With Link', value: 2 },
    { name: 'Everyone', value: 3 },
  ];
  public categoryData = [
    { name: 'Sans', value: 0 },
    { name: 'Serif', value: 1 },
    { name: 'Slab Serif', value: 3 },
    { name: 'Script', value: 5 },
    { name: 'Decorative', value: 6 },
    { name: 'Symbol', value: 2 },
    { name: 'Wacky', value: 4 },
  ];

  public searchForm: FormGroup;
  public filterForm: FormGroup;

  get visibilityControls(): FormArray { return this.filterForm.get('visible') as FormArray; }
  get categoryControls(): FormArray { return this.filterForm.get('categories') as FormArray; }

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit() {
    const visibilityControls = this.visibilityData.map((visible) =>
      new FormControl(this.initialQuery.visible.includes(visible.value)));
    const categoryControls = this.categoryData.map((category) =>
      new FormControl(this.initialQuery.categories.includes(category.value)));

    this.searchForm = this.fb.group({
      name: this.initialQuery.name,
      foundry: this.initialQuery.foundry,
      designer: this.initialQuery.designer,
    });
    this.filterForm = this.fb.group({
      visible: this.fb.array(visibilityControls),
      categories: this.fb.array(categoryControls),
    });

    const searchFormChanges = this.searchForm.valueChanges.startWith(this.searchForm.value);
    const filterFormChanges = this.filterForm.valueChanges
      .startWith(this.filterForm.value)
      .map(({ visible, categories }) => {
        const activeVisibility = visible.reduce((result, item, i) => {
          if (item) { result.push(this.visibilityData[i].value); }
          return result;
        }, []);
        const activeCategories = categories.reduce((result, item, i) => {
          if (item) { result.push(this.categoryData[i].value); }
          return result;
        }, []);

        return {
          visible: activeVisibility,
          categories: activeCategories,
        };
      });

    searchFormChanges.combineLatest(filterFormChanges)
      .debounceTime(500)
      .subscribe(([search, filter]) => {
        this.queryUpdate.emit({
          ...search,
          ...filter,
        });
      });
  }

  /**
   * Clear search and filter form group.
   *
   * @public
   * @memberOf StylesControlsComponent
   */
  public clearFilters() {
    this.searchForm.reset();
    this.filterForm.reset();
  }
}
