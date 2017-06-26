import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Family, FamilyActions, FamilySearch } from '../../tn-common/families';
import { Foundry } from '../../tn-common/foundries';
import { Designer } from '../../tn-common/designers';
import { License } from '../../tn-common/licenses';
import { Style } from '../../tn-common/styles';
import {
  getAllFamilies,
  getFamilySearchQuery,
  getStyleEntities,
  getFoundryEntities,
  getAllFoundries,
  getDesignerEntities,
  getAllDesigners
} from '../store/reducers';

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
   *  Foundry entity collection for combination.
   *
   * @type {Observable<FoundryState.entities}
   * @memberof AdminFamiliesListComponent
   */
  public foundryEntities$ = this.store.select(getFoundryEntities);

  /**
   *  Style entity collection for combination.
   *
   * @type {Observable<StyleState.entities}
   * @memberof AdminFamiliesListComponent
   */
  public styleEntities$ = this.store.select(getStyleEntities);

  /**
   *  Family collection with populated data.
   *  Foundry collection list for selection.
   *
   * @type {Observable<Foundry[]}
   * @memberof AdminFamiliesListComponent
   */
  public foundries$ = this.store.select(getAllFoundries);

  /**
   *  Designer entity collection for combination.
   *
   * @type {Observable<DesignerState.entities}
   * @memberof AdminFamiliesListComponent
   */
  public designerEntities$ = this.store.select(getDesignerEntities);

  /**
   *  Designer collection list for selection.
   *
   * @type {Observable<Designer[]}
   * @memberof AdminFamiliesListComponent
   */
  public designers$ = this.store.select(getAllDesigners);

  /**
   *  Family collection with populated data.
   * @type {Observable<Family[]>}
   * @memberof AdminFamiliesListComponent
   */
  public familiesPopulated$ = Observable.combineLatest(
     this.families$,
     this.foundryEntities$,
     this.styleEntities$,
     this.designerEntities$,
     (families, foundries, styles, designers) => families.map((family) => ({
       ...family,
       foundry: (family.foundry as number[]).map((id) => foundries[id]),
       style: (family.style as number[]).map((id) => styles[id]),
       designer: (family.designer as number[]).map((id) => designers[id]),
     })));

  /**
   * Family collection for display, filtered against search query.
   *
   * @type {Observable<Family[]>}
   * @memberof AdminFamiliesListComponent
   */
  public filteredFamilies$ = Observable.combineLatest(
    this.familiesPopulated$,
    this.familyQuery$,
    (families: Family[], familyQuery: FamilySearch) => families.filter((family) => {
      if (familyQuery.name) {
        const testName = new RegExp(familyQuery.name, 'i');
        const hasName = testName.test(family.name);
        if (!hasName) { return false; }
      }
      if (familyQuery.foundry.length) {
        const hasFoundry = (family.foundry as Foundry[]).some((foundry) =>
          foundry && familyQuery.foundry.indexOf(foundry.id) !== -1);
        if (!hasFoundry) { return false; }
      }
      if (familyQuery.designer.length) {
        const hasDesigner = (family.designer as Designer[]).some((designer) =>
          designer && familyQuery.designer.indexOf(designer.id) !== -1);
        if (!hasDesigner) { return false; }
      }
      return true;
    }).map((family) => ({
      ...family,
       categoryName: family.category.map((category) => CATEGORIES[category]).sort(),
       min_size: Math.min(...family.recommended_size),
       max_size: Math.max(...family.recommended_size),
       moodName: family.mood.map((mood) => MOODS[mood]).sort(),
       visibleName: VISIBLE_STATES[family.visible],
    })));

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
