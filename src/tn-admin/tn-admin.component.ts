import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tn-admin',
  styleUrls: [ './tn-admin.component.scss' ],
  template: `
    <nav>
      <a [routerLink]=" ['./'] " routerLinkActive="active">Index</a>
      <a [routerLink]=" ['./styleguide'] " routerLinkActive="active">styleguide</a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class TnAdminComponent implements OnInit {
  public ngOnInit() {
    console.log('TnAdminComponent.ngOnInit');
  }
}
