import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tn-admin-foundry',
  templateUrl: './tn-foundry.component.html',
  styleUrls: ['./tn-foundry.component.scss']
})
export class TnFoundryComponent implements OnInit {

  constructor() {
    console.log('hello `Foundry` component');
  }

  public ngOnInit() {
    console.log('hello ngOnInit `Foundry` component');
  }

}
