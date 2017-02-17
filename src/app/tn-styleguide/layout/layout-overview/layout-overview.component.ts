import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-overview',
  templateUrl: './layout-overview.component.html',
  styleUrls: ['./layout-overview.component.css']
})
export class LayoutOverviewComponent implements OnInit {

  public ngOnInit() {
    console.log('LayoutOverviewComponent ngOnInit');
  }
}
