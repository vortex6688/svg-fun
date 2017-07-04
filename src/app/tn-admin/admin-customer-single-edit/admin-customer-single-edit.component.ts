import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/Rx';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Order } from '../../tn-common/orders';

@Component({
  selector: 'app-admin-customer-single-edit',
  templateUrl: './admin-customer-single-edit.component.html'
})
export class AdminCustomerSingleEditComponent {
  @Input() public orders: Order[] = [];

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

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
