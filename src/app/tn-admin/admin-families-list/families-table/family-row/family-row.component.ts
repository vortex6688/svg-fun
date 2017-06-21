import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminFamilySingleEditComponent } from '../../../admin-family-single-edit';

@Component({
  selector: 'family-row',
  templateUrl: './family-row.component.html'
})
export class FamilyRowComponent {
  @Input() public family;

  public isChecked = false;

  constructor(private modalService: NgbModal) {}

  public selectFamily() {
    this.isChecked = !this.isChecked;
  }

  public openFamilyDetails() {
    const familyModal = this.modalService.open(AdminFamilySingleEditComponent, { windowClass: 'full-size'});
    familyModal.componentInstance.family = this.family;
  }
}
