import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'family-row',
  templateUrl: './family-row.component.html'
})
export class FamilyRowComponent implements OnInit, OnDestroy {
  @Input() public family;
  @Input() public collapseSubject: BehaviorSubject<boolean>;
  public isCollapsed = true;
  private collapseSubscription;

  public ngOnInit() {
    this.collapseSubscription = this.collapseSubject.subscribe((collapse) => {
      this.isCollapsed = collapse;
    });
  }

  public ngOnDestroy() {
    this.collapseSubscription.unsubscribe();
  }
}
