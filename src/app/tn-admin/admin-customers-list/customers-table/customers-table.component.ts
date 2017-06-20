import { Component, Input } from '@angular/core';

@Component({
  selector: 'customers-table',
  templateUrl: './customers-table.component.html'
})
export class CustomersTableComponent {
  public pageSize: number = 25;
  public pageItems: number[] = [];

/*
  @Input() public series: Customers[] = [];
  public sortKey = '-name';

  public updatePageItems($event) {
    this.pageItems = $event;
  }

  public sortBy(key) {
    const sortSide = this.sortKey.endsWith(key) && this.sortKey.startsWith('-') ? '+' : '-';
    this.sortKey = sortSide + key;
  }
*/
}
