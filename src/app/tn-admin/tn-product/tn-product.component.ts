import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tn-product',
  templateUrl: './tn-product.component.html',
  styleUrls: ['./tn-product.component.scss']
})
export class TnProductComponent implements OnInit {

  constructor() {
    console.log('hello `Product` component');
  }

  public ngOnInit() {
    console.log('hello ngOnInit `Product` component');
  }

}
