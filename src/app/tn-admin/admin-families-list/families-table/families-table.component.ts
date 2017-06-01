import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Family } from '../../../tn-common/families/';

@Component({
  selector: 'families-table',
  templateUrl: './families-table.component.html'
})
export class FamiliesTableComponent {
  public page: number;

  @Input() public families: Family[] = [];
  public sortKey = '-created';
  public collapseState$ = new BehaviorSubject(true);

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
