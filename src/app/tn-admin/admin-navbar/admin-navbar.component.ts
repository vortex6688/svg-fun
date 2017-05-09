// angular imports
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// vendor imports
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/filter';

// local imports
import { Authorization, AuthActions,
         ANONYMOUS_AUTHORIZATION as ANONYMOUS } from '../../tn-common/auth';
import { LoginComponent } from '../login';
import { getUser } from '../store/reducers';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
   public root: string = '/admin';
   public currentUrl: string = '';
   public isLayout: boolean = false;
   public isNavbarCollapsed: boolean = true;
   public ANONYMOUS = ANONYMOUS;
   public user: Authorization;

   constructor(private router: Router,
               private modalService: NgbModal,
               private store: Store<any>,
               private authActions: AuthActions) {
    this.store.select(getUser).subscribe((user) => this.user = user);
  }

   public ngOnInit() {
     // track current url so menu can open and close as needed.
     this.router.events
       .filter((event) => event instanceof NavigationEnd)
       .subscribe((val: NavigationEnd) => {
         this.currentUrl = val.urlAfterRedirects.replace(this.root, '');
         this.isLayout = (this.currentUrl.indexOf('layout') !== -1);
      });
   }

  public login() {
    this.modalService.open(LoginComponent, { windowClass: 'modal-login' });
  }

  public logout() {
    this.store.dispatch(this.authActions.logout());
  }
}
