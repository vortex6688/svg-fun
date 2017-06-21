import { Component, Input, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Family } from '../../../tn-common/families/';
import { AdminFamilyBatchEditComponent } from '../../admin-family-batch-edit';

@Component({
  selector: 'families-table',
  templateUrl: './families-table.component.html'
})
export class FamiliesTableComponent {
  @Input() public family;
  @Input() public families: Family[] = [];

  public pageSize: number = 25;
  public pageItems: number[] = [];

  constructor(private modalService: NgbModal) {}

  public sortKey = '-name';

  public updatePageItems($event) {
    this.pageItems = $event;
  }

  public sortBy(key) {
    const sortSide = this.sortKey.endsWith(key) && this.sortKey.startsWith('-') ? '+' : '-';
    this.sortKey = sortSide + key;
  }

  public openFamilyBatchEdit() {
    const familyBatchModal = this.modalService.open(AdminFamilyBatchEditComponent, { windowClass: 'full-size'});
    familyBatchModal.componentInstance.family = this.family;
  }
}
