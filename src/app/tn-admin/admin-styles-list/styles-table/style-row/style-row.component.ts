import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminStyleSingleEditComponent } from '../../../admin-style-single-edit';

@Component({
  selector: 'style-row',
  templateUrl: './style-row.component.html',
  styleUrls: ['./style-row.component.scss']
})
export class StyleRowComponent implements OnInit, OnDestroy {
  @Input() public style;
  @Input() public collapseSubject: BehaviorSubject<boolean>;
  public isCollapsed = true;
  public isChecked = false;
  private collapseSubscription;

  constructor(private modalService: NgbModal) {}

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

  public openStyleSingleEdit() {
    const styleModal = this.modalService.open(AdminStyleSingleEditComponent, { windowClass: 'full-size'});
    styleModal.componentInstance.style = this.style;
  }
}
