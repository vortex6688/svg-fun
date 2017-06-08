import { Component, Input } from '@angular/core';

import { Series } from '../../../tn-common/series/';

@Component({
  selector: 'series-table',
  templateUrl: './series-table.component.html'
})
export class SeriesTableComponent {
  public pageSize: number = 25;
  public pageItems: number[] = [];

  @Input() public series: Series[] = [];
  public sortKey = '-name';

  public updatePageItems($event) {
    this.pageItems = $event;
  }

  public sortBy(key) {
    const sortSide = this.sortKey.endsWith(key) && this.sortKey.startsWith('-') ? '+' : '-';
    this.sortKey = sortSide + key;
  }
}
