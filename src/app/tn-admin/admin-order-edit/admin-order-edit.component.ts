import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-order-edit',
  templateUrl: './admin-order-edit.component.html',
  styleUrls: ['./admin-order-edit.component.scss'],
})
export class AdminOrderEditComponent {
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}
}
