import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Style } from '../../../tn-common/styles/';

@Component({
  selector: 'styles-table',
  templateUrl: './styles-table.component.html'
})
export class StylesTableComponent {
  public pageSize: number = 25;
  public pageItems: number[] = [];

  @Input() public styles: Style[] = [];
  public sortKey = '-name';
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
