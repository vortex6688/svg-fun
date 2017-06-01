import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'families-controls',
  templateUrl: './families-controls.component.html'
})
export class FamiliesControlsComponent implements OnInit {
  @Input() public initialQuery;

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

  public searchForm: FormGroup;
  public filterForm: FormGroup;

  get visibilityControls(): FormArray { return this.filterForm.get('visibility') as FormArray; }
  get categoryControls(): FormArray { return this.filterForm.get('categories') as FormArray; }

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit() {
    const visibilityControls = this.visibilityData.map((visibility) =>
      new FormControl(this.initialQuery.visibility.includes(visibility.value)));
    const categoryControls = this.categoriesData.map((category) =>
      new FormControl(this.initialQuery.categories.includes(category.value)));

    this.searchForm = this.fb.group({
      name: this.initialQuery.name,
      foundry: this.initialQuery.foundry,
      designer: this.initialQuery.designer,
    });

    this.filterForm = this.fb.group({
      visibility: this.fb.array(visibilityControls),
      categories: this.fb.array(categoryControls),
    });
  }

  /**
   * Clear search form group.
   *
   * @public
   * @memberOf FamiliesControlsComponent
   */
  public clearSearch() {
    this.searchForm.reset();
  }

  /**
   * Clear filter form group.
   *
   * @public
   * @memberOf FamiliesControlsComponent
   */
  public clearFilters() {
    this.filterForm.reset();
  }
}
