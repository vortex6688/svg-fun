import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Order } from '../../../tn-common/orders/';

@Component({
  selector: 'orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent {
  public pageSize: number = 25;
  public pageItems: number[] = [];

  @Input() public orders: Order[] = [];
  public sortKey = '-created';
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
