import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OrderSearch } from '../../../tn-common/orders';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'orders-controls',
  templateUrl: './orders-controls.component.html',
  styleUrls: ['./orders-controls.component.scss']
})
export class OrdersControlsComponent implements OnInit {
  @Input() public initialQuery;
  @Output() public queryUpdate = new EventEmitter<OrderSearch>();

  public statusData = [
    { name: 'Completed', value: 2 },
    { name: 'Pending', value: 0 },
    { name: 'Partially Paid', value: 1 },
    { name: 'Cancelled', value: 3 },
    { name: 'Approved, Unpaid', value: 4 },
  ];
  public searchForm: FormGroup;
  public filterForm: FormGroup;

  get statusControls(): FormArray { return this.filterForm.get('status') as FormArray; }

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit() {
    const statusControls = this.statusData.map((status) =>
      new FormControl(this.initialQuery.status.includes(status.value)));

    this.searchForm = this.fb.group({
      id: this.initialQuery.id,
      from: this.initialQuery.from,
      to: this.initialQuery.to,
      customer: this.initialQuery.customer,
      project: this.initialQuery.project,
      font: this.initialQuery.font,
      foundry: this.initialQuery.foundry,
    });

    this.filterForm = this.fb.group({
      status: this.fb.array(statusControls),
      licenses: this.fb.array([]),
    });

    const searchFormChanges = this.searchForm.valueChanges.startWith(this.searchForm.value);
    const filterFormChanges = this.filterForm.valueChanges
      .startWith(this.filterForm.value)
      .map(({ status, licenses}) => {
        const activeStatus = status.reduce((result, item, i) => {
          if (item) { result.push(this.statusData[i].value); }
          return result;
        }, []);

        return {
          status: activeStatus,
          licenses,
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
   * Clear search form group.
   *
   * @public
   * @memberOf OrdersControlsComponent
   */
  public clearSearch() {
    this.searchForm.reset();
  }

  /**
   * Clear filter form group.
   *
   * @public
   * @memberOf OrdersControlsComponent
   */
  public clearFilters() {
    this.filterForm.reset();
  }

  /**
   * Update search form with date of type.
   *
   * @public
   * @type {Date} event
   * @type {string} type - target form control
   * @memberOf OrdersControlsComponent
   */
  public updateDate(event, type) {
    this.searchForm.controls[type].setValue(event);
  }

}
