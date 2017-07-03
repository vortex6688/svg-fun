import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CustomerSearch } from '../../../tn-common/customers';
import { DropdownOption } from '../../../tn-common/dropdown-input/';

@Component({
  selector: 'customers-controls',
  templateUrl: './customers-controls.component.html'
})
export class CustomersControlsComponent implements OnInit, OnChanges {
  @Input() public initialQuery;
  @Input() public locations: { city: string[], country: string[] };
  @Output() public queryUpdate = new EventEmitter<CustomerSearch>();

  public searchForm: FormGroup = this.fb.group({});
  public cityList: DropdownOption[] = [];
  public countryList: DropdownOption[] = [];

  constructor(private fb: FormBuilder) {}

  public ngOnChanges(changes) {
    if (changes.locations) {
      this.cityList = this.locations && this.locations.city ? this.locations.city.map((city) => ({
        name: city,
        selected: !!this.initialQuery ? this.initialQuery.city.indexOf(city) !== -1 : false,
      })) : [];
      this.countryList = this.locations && this.locations.country ? this.locations.country.map((country) => ({
        name: country,
        selected: !!this.initialQuery ? this.initialQuery.country.indexOf(country) !== -1 : false
      })) : [];
    }
  }

  public ngOnInit() {
    this.searchForm = this.fb.group({
      name: this.initialQuery.name,
      email: this.initialQuery.email,
      city: this.fb.array(this.initialQuery.city),
      country: this.fb.array(this.initialQuery.country),
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
   * Update specified form field with selected items
   *
   * @public
   * @param {DropdownOption[]} options
   * @param {string} item
   * @memberof OrdersControlsComponent
   */
  public updateList(options: DropdownOption[], item: string) {
    const selectedItems = options.reduce((result, option) => {
      if (option.selected) {
        result.push(option.name);
      }
      return result;
    }, []);
    this.searchForm.setControl(item, this.fb.array(selectedItems));
  }

  /**
   * Clear search and filter form group.
   *
   * @public
   * @memberof CustomerControlsComponent
   */
  public clearFilters() {
    this.searchForm.reset();
    this.searchForm.setControl('city', this.fb.array([]));
    this.searchForm.setControl('country', this.fb.array([]));
    this.cityList = this.cityList.map((city) => ({ ...city, selected: false }));
    this.countryList = this.countryList.map((country) => ({ ...country, selected: false }));
  }

}
