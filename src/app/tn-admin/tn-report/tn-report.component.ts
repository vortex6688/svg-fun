import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tn-admin-report',
  templateUrl: './tn-report.component.html',
  styleUrls: ['./tn-report.component.scss']
})
export class TnReportComponent implements OnInit {

  constructor() {
    console.log('hello `Report` component');
  }

  public ngOnInit() {
    console.log('hello ngOnInit `Report` component');
  }

}
