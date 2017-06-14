import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'series-row',
  templateUrl: './series-row.component.html'
})
export class SeriesRowComponent {
  @Input() public series;

  public isChecked = false;

  public selectSeries() {
    this.isChecked = !this.isChecked;
  }
}
