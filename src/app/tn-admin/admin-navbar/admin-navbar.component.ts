import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/filter';

import { AuthService } from '../../tn-common/auth';
import { LoginComponent } from '../login';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
   public root: string = '/admin';
   public currentUrl: string = '';
   public isLayout: Boolean = false;
   public isNavbarCollapsed: Boolean = true;

   constructor(private router: Router,
               private modalService: NgbModal,
               private authService: AuthService) {}

   public ngOnInit() {
     // track current url so menu can open and close as needed.
     this.router.events
       .filter((event) => event instanceof NavigationEnd)
       .subscribe((val: NavigationEnd) => {
         this.currentUrl = val.urlAfterRedirects.replace(this.root, '');
         this.isLayout = (this.currentUrl.indexOf('layout') !== -1);
      });
   }

  public openLoginModal() {
    let user = this.authService.user$.getValue();
    if (user.username === 'anonymous@user.com') {
      this.modalService.open(LoginComponent);
    }
  }

}
