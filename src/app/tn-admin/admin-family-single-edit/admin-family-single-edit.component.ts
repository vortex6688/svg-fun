import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Family } from '../../tn-common/families';

@Component({
  selector: 'app-admin-family-single-edit',
  templateUrl: './admin-family-single-edit.component.html',
  styleUrls: ['./admin-family-single-edit.component.scss'],
})
export class AdminFamilySingleEditComponent {
  @Input() public family: Family;

  public sortKey = '-released';

  public tags = [
    'High Contrast', 'Flared', 'Inline', 'Rectangular', 'Realist',
    'Cartoon', 'Bouncy', 'Flat Brush', 'Calligraphic', 'Connected',
    'Sharp', 'Experimental', 'Inscriptional', 'Initials', 'Ball Terminals',
    'Pothooks', 'Roundhandle'
  ];

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  public sortBy(key) {
    const sortSide = this.sortKey.endsWith(key) && this.sortKey.startsWith('-') ? '+' : '-';
    this.sortKey = sortSide + key;
  }
}
