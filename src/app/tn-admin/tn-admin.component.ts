import { Component, OnInit } from '@angular/core';

/**
 * TN Component that will contain all submodules related
 * to Admin application
 */
@Component({
  selector: 'tn-admin',
  styleUrls: [ './tn-admin.component.scss' ],
  templateUrl: './tn-admin.component.html'
})
export class TnAdminComponent implements OnInit {
  public ngOnInit() {
    console.log('TnAdminComponent.ngOnInit');
  }
}
