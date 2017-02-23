import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tn-admin-user',
  templateUrl: './tn-user.component.html',
  styleUrls: ['./tn-user.component.scss']
})
export class TnUserComponent implements OnInit {

  constructor() {
    console.log('hello `User` component');
  }

  public ngOnInit() {
    console.log('hello ngOnInit `User` component');
  }

}
