import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Family, FamilyActions, FamilySearch } from '../../tn-common/families';
import { License } from '../../tn-common/licenses';
import { Style } from '../../tn-common/styles';
import { getAllFamilies, getFamilySearchQuery, getAllStyles } from '../store/reducers';

const CATEGORIES = [
  'Sans',       // 0
  'Serif',      // 1
  'Symbol',     // 2
  'Slab Serif', // 3
  'Wacky',      // 4
  'Script',     // 5
  'Decorative', // 6
];
const MOODS = [
  'Rustic',        // 0
  'Sturdy',        // 1
  'Mechanical',    // 2
  'Industrial',    // 3
  'Informal',      // 4
  'Contemporary',  // 5
  'High-tech',     // 6
  'Futuristic',    // 7
  'Lively',        // 8
  'Delicate',      // 9
  'Classical',     // 10
  'Formal',        // 11
  'Cute',          // 12
  'Fun',           // 13
  'Technical',     // 14
  'Retro',         // 15
  'Friendly',      // 16
  'Digital',       // 17
];
const VISIBLE_STATES = [
  'Inactive',    // 0
  'Staff only',  // 1
  'With link',   // 2
  'Everyone',    // 3
];

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

  /**
   *  Family collection with populated foundries data. @todo add actual foundry
   *
   * @type {Observable<Family[]>}
   * @memberof AdminOrdersListComponent
   */
  public familyFoundries$ = Observable.combineLatest(
     this.families$,
     this.families$, // @todo change this to combine with the actual foundry
     (families: Family[], foundries) => families.map((family) => ({
       ...family,
       categoryName: family.category.map((category) => CATEGORIES[category]).sort(),
       min_size: Math.min(...family.recommended_size),
       max_size: Math.max(...family.recommended_size),
       moodName: family.mood.map((mood) => MOODS[mood]).sort(),
       visibleName: VISIBLE_STATES[family.visible],
     }))
   );

  /**
   *  Orders collection for display, filtered against search query.
   *
   * @type {Observable<Order[]>}
   * @memberof AdminOrdersListComponent
   */
  public filteredFamilies$ = Observable.combineLatest(
    this.familyFoundries$,
    this.familyQuery$,
    (families: Family[], familyQuery: FamilySearch) => families.filter((family) => {
      if (familyQuery.name) {
        const testName = new RegExp(familyQuery.name, 'i');
        const hasName = testName.test(family.name);
        if (!hasName) { return false; }
      }
      return this.families$;
    }));

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
