import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tn-editorial',
  styleUrls: ['./tn-editorial.component.scss'],
  template: `
    <nav>
      <a [routerLink]=" ['./'] " routerLinkActive="active">Index</a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class TnEditorialComponent implements OnInit {
  public ngOnInit() {
    console.log('TnEditorialComponent ngOnInit');
  }
}
