import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'family-row',
  templateUrl: './family-row.component.html'
})
export class FamilyRowComponent {
  @Input() public family;

  public isChecked = false;

  public selectFamily() {
    this.isChecked = !this.isChecked;
  }
}
