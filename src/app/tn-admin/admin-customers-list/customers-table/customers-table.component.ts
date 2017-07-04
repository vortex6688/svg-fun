import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Customer } from '../../../tn-common/customers';

@Component({
  selector: 'customers-table',
  templateUrl: './customers-table.component.html'
})
export class CustomersTableComponent {
  @Input() public customers: Customer[] = [];
  public pageSize: number = 25;
  public pageItems: number[] = [];

  public sortKey = '-created_at';
  public collapseState$ = new BehaviorSubject(true);

  public updatePageItems($event) {
    this.pageItems = $event;
  }

  public sortBy(key) {
    const sortSide = this.sortKey.endsWith(key) && this.sortKey.startsWith('-') ? '+' : '-';
    this.sortKey = sortSide + key;
  }

  public expandAll() {
    this.collapseState$.next(false);
  }

  public collapseAll() {
    this.collapseState$.next(true);
  }
}
