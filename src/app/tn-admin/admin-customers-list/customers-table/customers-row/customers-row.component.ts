import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Customer } from '../../../../tn-common/customers/';
import { AdminCustomerSingleEditComponent } from '../../../admin-customer-single-edit';

@Component({
  selector: 'customers-row',
  templateUrl: './customers-row.component.html',
  styleUrls: ['./customers-row.component.scss']
})
export class CustomersRowComponent implements OnInit, OnDestroy {
  @Input() public customer: Customer;
  @Input() public collapseSubject: BehaviorSubject<boolean>;
  public isCollapsed = true;
  private collapseSubscription;

  public ngOnInit() {
    this.collapseSubscription = this.collapseSubject.subscribe((collapse) => {
      this.isCollapsed = collapse;
    });
  public ngOnDestroy() {
    this.collapseSubscription.unsubscribe();
  }
  }
}


