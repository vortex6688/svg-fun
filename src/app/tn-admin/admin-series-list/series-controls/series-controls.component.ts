import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SeriesSearch } from '../../../tn-common/series';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'series-controls',
  templateUrl: './series-controls.component.html'
})
export class SeriesControlsComponent implements OnInit {
  @Input() public initialQuery;
  @Output() public queryUpdate = new EventEmitter<SeriesSearch>();

  public searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.searchForm = this.fb.group({
      name: this.initialQuery.name,
      foundry: this.initialQuery.foundry,
    });

    const searchFormChanges = this.searchForm.valueChanges.startWith(this.searchForm.value);

    searchFormChanges
      .debounceTime(500)
      .subscribe((search) => {
        this.queryUpdate.emit(search);
      });
  }

  /**
   * Clear search and filter form group.
   *
   * @public
   * @memberOf SeriesControlsComponent
   */
  public clearFilters() {
    this.searchForm.reset();
  }
}
