import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Family } from '../../tn-common/families';

@Component({
  selector: 'app-admin-family-batch-edit',
  templateUrl: './admin-family-batch-edit.component.html',
  styleUrls: ['./admin-family-batch-edit.component.scss'],
})
export class AdminFamilyBatchEditComponent {
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  public tags = [
    'High Contrast', 'Flared', 'Inline', 'Rectangular', 'Realist',
    'Cartoon', 'Bouncy', 'Flat Brush', 'Calligraphic', 'Connected',
    'Sharp', 'Experimental', 'Inscriptional', 'Initials', 'Ball Terminals',
    'Pothooks', 'Roundhandle'
  ];
}
