import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tn-foundry',
  templateUrl: './tn-foundry.component.html',
  styleUrls: ['./tn-foundry.component.css']
})
export class TnFoundryComponent implements OnInit {

  constructor() {
    console.log('hello `Foundry` component');
  }

  public ngOnInit() {
    console.log('hello ngOnInit `Foundry` component');
  }

}
