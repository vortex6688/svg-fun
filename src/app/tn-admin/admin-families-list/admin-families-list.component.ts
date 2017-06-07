import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Family, FamilyActions, FamilySearch } from '../../tn-common/families';
import { License } from '../../tn-common/licenses';
import { getAllFamilies, getFamilySearchQuery } from '../store/reducers';

@Component({
  selector: 'admin-families-list',
  templateUrl: './admin-families-list.component.html',
  styleUrls: ['./admin-families-list.component.scss']
})
export class AdminFamiliesListComponent {
  /**
   *  Families collection for combination.
   *
   * @type {Observable<Family[]>}
   * @memberof AdminFamiliesListComponent
   */
  public families$ = this.store.select(getAllFamilies);

  /**
   * Family search query to filter families against.
   *
   * @type {Observable<FamilySearch>}
   * @memberof AdminFamiliesListComponent
   */
  public familyQuery$ = this.store.select(getFamilySearchQuery);

  constructor(private store: Store<any>, private familyActions: FamilyActions) {}

  /**
   * Fetch the server and get all the families with the provided query
   *
   * @public
   * @type {FamilySearch} query
   * @memberof AdminFamiliesListComponent
   */
  public searchFamilies(query: FamilySearch) {
    this.store.dispatch(this.familyActions.searchQuery(query));
  }
}
