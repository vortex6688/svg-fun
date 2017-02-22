import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tn-admin-content',
  templateUrl: './tn-content.component.html',
  styleUrls: ['./tn-content.component.scss']
})
export class TnContentComponent implements OnInit {

  constructor() {
    console.log('hello `Content` component');
  }

  public ngOnInit() {
    console.log('hello ngOnInit `Content` component');
  }

}
