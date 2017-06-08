import { Component, Input } from '@angular/core';

import { Family } from '../../../tn-common/families/';

@Component({
  selector: 'families-table',
  templateUrl: './families-table.component.html'
})
export class FamiliesTableComponent {
  public pageSize: number = 25;
  public pageItems: number[] = [];

  @Input() public families: Family[] = [];
  public sortKey = '-name';

  public updatePageItems($event) {
    this.pageItems = $event;
  }

  public sortBy(key) {
    const sortSide = this.sortKey.endsWith(key) && this.sortKey.startsWith('-') ? '+' : '-';
    this.sortKey = sortSide + key;
  }
}
