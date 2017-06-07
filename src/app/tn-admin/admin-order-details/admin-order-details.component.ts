import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.scss'],
})
export class AdminOrderDetailsComponent {
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}
}
