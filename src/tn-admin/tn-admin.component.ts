/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './tn-admin.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'tn-admin',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './tn-admin.component.scss'
  ],
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
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */