import { Component, Input } from '@angular/core';

import { Family } from '../../../tn-common/families/';

@Component({
  selector: 'families-table',
  templateUrl: './families-table.component.html'
})
export class FamiliesTableComponent {
  public page: number;

  @Input() public families: Family[] = [];
  public sortKey = '-name';

  public sortBy(key) {
    const sortSide = this.sortKey.endsWith(key) && this.sortKey.startsWith('-') ? '+' : '-';
    this.sortKey = sortSide + key;
  }
}
