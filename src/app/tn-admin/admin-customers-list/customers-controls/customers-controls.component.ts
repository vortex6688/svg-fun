import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CustomerSearch } from '../../../tn-common/customers';

@Component({
  selector: 'customers-controls',
  templateUrl: './customers-controls.component.html'
})
export class CustomersControlsComponent implements OnInit {
  @Input() public initialQuery;
  @Output() public queryUpdate = new EventEmitter<CustomerSearch>();

  public searchForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.searchForm = this.fb.group({
      name: this.initialQuery.name,
      email: this.initialQuery.email,
      city: this.initialQuery.city,
      country: this.initialQuery.country,
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
   * Clear search and filter form group.
   *
   * @public
   * @memberof CustomerControlsComponent
   */
  public clearFilters() {
    this.searchForm.reset();
  }

}
