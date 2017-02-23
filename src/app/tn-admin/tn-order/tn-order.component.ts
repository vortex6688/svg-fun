import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tn-admin-order',
  templateUrl: './tn-order.component.html',
  styleUrls: ['./tn-order.component.scss']
})
export class TnOrderComponent implements OnInit {

  constructor() {
    console.log('hello `Order` component');
  }

  public ngOnInit() {
    console.log('hello ngOnInit `Order` component');
  }

}
