import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tn-admin',
  styleUrls: [ './tn-admin.component.scss' ],
  template: '<router-outlet></router-outlet>'
})
export class TnAdminComponent implements OnInit {
  public ngOnInit() {
    console.log('TnAdminComponent.ngOnInit');
  }
}
