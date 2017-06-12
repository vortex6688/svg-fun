import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'style-row',
  templateUrl: './style-row.component.html'
})
export class StyleRowComponent implements OnInit, OnDestroy {
  @Input() public style;
  @Input() public collapseSubject: BehaviorSubject<boolean>;
  public isCollapsed = true;
  public isChecked = false;
  private collapseSubscription;

  public ngOnInit() {
    this.collapseSubscription = this.collapseSubject.subscribe((collapse) => {
      this.isCollapsed = collapse;
    });
  }

  public ngOnDestroy() {
    this.collapseSubscription.unsubscribe();
  }

  public selectStyle() {
    this.isChecked = !this.isChecked;
  }
}
