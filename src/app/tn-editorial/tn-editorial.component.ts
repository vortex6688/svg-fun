import { Component } from '@angular/core';

@Component({
  selector: 'tn-editorial',
  styleUrls: ['./tn-editorial.component.scss'],
  template: `
    <h2>tn-editorial component</h2>
    <nav>
      <a [routerLink]=" ['./'] " routerLinkActive="active">Index</a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class TnEditorialComponent {}
