import { Component, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-components-modal',
  templateUrl: './components-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./components-modal.component.scss']
})
export class ComponentsModalComponent {
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content);
  }

  open(contentScroll) {
    this.modalService.open(contentScroll);
  }

  open(contentGrid) {
    this.modalService.open(contentGrid);
  }
}
