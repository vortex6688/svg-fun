import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tn-order',
  templateUrl: './tn-order.component.html',
  styleUrls: ['./tn-order.component.css']
})
export class TnOrderComponent implements OnInit {

  constructor() {
    console.log('hello `Order` component');
  }

  public ngOnInit() {
    console.log('hello ngOnInit `Order` component');
  }

}
