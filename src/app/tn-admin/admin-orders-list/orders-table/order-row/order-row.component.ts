import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminOrderEditComponent } from '../../../admin-order-edit';

@Component({
  selector: 'order-row',
  templateUrl: './order-row.component.html',
  styleUrls: ['./order-row.component.scss']
})
export class OrderRowComponent implements OnInit, OnDestroy {
  @Input() public order;
  @Input() public collapseSubject: BehaviorSubject<boolean>;
  public isCollapsed = true;
  private collapseSubscription;

  constructor(private modalService: NgbModal) {}

  get families() {
    if (!this.order || !this.order.licenses) {
      return [];
    }
    return this.order.licenses.reduce((result, license) => {
      const family = license.style && license.style.family ? license.style.family.name : null;
      if (family && result.indexOf(family) === -1) {
        result.push(family);
      }
      return result;
    }, []);
  }

  public ngOnInit() {
    this.collapseSubscription = this.collapseSubject.subscribe((collapse) => {
      this.isCollapsed = collapse;
    });
  }

  public ngOnDestroy() {
    this.collapseSubscription.unsubscribe();
  }

  public openOrderDetails() {
    const orderModal = this.modalService.open(AdminOrderEditComponent, { windowClass: 'full-size'});
  }
}
