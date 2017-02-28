import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'styleguide',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './style.scss'  ],
  templateUrl: './styleguide.component.html'
})
export class StyleguideComponent implements OnInit {
  public root: string = '/styleguide';
  public currentUrl: string = '';
  public isLayout: Boolean = false;
  public isNavbarCollapsed: Boolean = true;

  constructor(private router: Router) {}

  public ngOnInit() {
    // track current url so menu can open and close as needed.
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((val: NavigationEnd) => {
        this.currentUrl = val.urlAfterRedirects.replace(this.root, '');
        this.isLayout = (this.currentUrl.indexOf('layout') !== -1);
    });
  }
}
