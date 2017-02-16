import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'tn-navbar',
  templateUrl: './tn-navbar.component.html',
  styleUrls: ['./tn-navbar.component.scss']
})
export class TnNavbarComponent implements OnInit {
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
