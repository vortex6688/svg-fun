import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { StyleSearch } from '../../../tn-common/styles';
import { Observable } from 'rxjs/Observable';
import { DropdownOption } from '../../../tn-common/dropdown-input/';
import { Foundry } from '../../../tn-common/foundries';
import { Designer } from '../../../tn-common/designers';

@Component({
  selector: 'styles-controls',
  templateUrl: './styles-controls.component.html'
})
export class StylesControlsComponent implements OnInit, OnChanges {
  @Input() public initialQuery;
  @Input() public foundries: Foundry[];
  @Input() public designers: Designer[];
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

  public searchForm: FormGroup = this.fb.group({});
  public filterForm: FormGroup = this.fb.group({});
  public foundryList: DropdownOption[] = [];
  public designerList: DropdownOption[] = [];

  get visibilityControls(): FormArray { return this.filterForm.get('visible') as FormArray; }
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
    if (changes.designers) {
      this.designerList = this.designers.map((designer) => ({
        name: designer.name,
        value: designer.id,
        selected: !!this.initialQuery ? this.initialQuery.designer.indexOf(designer.id) !== -1 : false })) || [];
    }
  }

  public ngOnInit() {
    const visibilityControls = this.visibilityData.map((visible) =>
      new FormControl(this.initialQuery.visible.includes(visible.value)));
    const categoryControls = this.categoryData.map((category) =>
      new FormControl(this.initialQuery.categories.includes(category.value)));

    this.searchForm = this.fb.group({
      name: this.initialQuery.name,
      foundry: this.fb.array(this.initialQuery.foundry),
      designer: this.fb.array(this.initialQuery.designer),
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
   * Update specified form field with selected items
   *
   * @public
   * @param {DropdownOption[]} options
   * @param {string} item
   * @memberof StylesControlsComponent
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
   * @memberOf StylesControlsComponent
   */
  public clearFilters() {
    this.searchForm.reset();
    this.searchForm.setControl('foundry', this.fb.array([]));
    this.searchForm.setControl('designer', this.fb.array([]));
    this.foundryList = this.foundryList.map((foundry) => ({ ...foundry, selected: false }));
    this.designerList = this.designerList.map((designer) => ({ ...designer, selected: false }));
    this.filterForm.reset();
  }
}