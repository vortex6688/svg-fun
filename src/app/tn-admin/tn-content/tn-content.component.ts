import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tn-content',
  templateUrl: './tn-content.component.html',
  styleUrls: ['./tn-content.component.css']
})
export class TnContentComponent implements OnInit {

  constructor() {
    console.log('hello `Content` component');
  }

  public ngOnInit() {
    console.log('hello ngOnInit `Content` component');
  }

}
