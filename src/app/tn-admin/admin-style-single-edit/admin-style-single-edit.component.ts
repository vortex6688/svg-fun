import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-style-single-edit',
  templateUrl: './admin-style-single-edit.component.html'
})
export class AdminStyleSingleEditComponent {

  public tags = [
    'High Contrast', 'Flared', 'Inline', 'Rectangular', 'Realist',
    'Cartoon', 'Bouncy', 'Flat Brush', 'Calligraphic', 'Connected',
    'Sharp', 'Experimental', 'Inscriptional', 'Initials', 'Ball Terminals',
    'Pothooks', 'Roundhandle'
  ];

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}
}
