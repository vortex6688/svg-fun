import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { getUser } from '../store/reducers';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent implements OnInit {

  constructor(private store: Store<any>, private router: Router) {}

  public ngOnInit() {
    this.store.select(getUser)
      .filter((user) => !!user && !!user.token)
      .subscribe((user) => this.router.navigate(['admin/orders']));
  }

}
