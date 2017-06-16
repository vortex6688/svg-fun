import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Style, StyleActions, StyleSearch } from '../../tn-common/styles';
import { Family, FamilyState } from '../../tn-common/families';
import {
  getAllStyles,
  getStyleSearchQuery,
  getFamilyEntities,
  getFoundryEntities,
} from '../store/reducers';

const OPTICAL = {
  100: 'Micro',
  200: 'Agate',
  250: 'RE',
  300: 'Caption',
  400: 'Text',
  500: 'Multipurpose',
  600: 'Deck',
  690: 'Headline',
  700: 'Display',
  750: 'Titling',
  800: 'Banner',
  900: 'Big',
};
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
const WEIGHTS = {
  900: 'Ultra Black',
  850: 'Extra Black',
  800: 'Black',
  750: 'Extra Bold',
  700: 'Bold',
  600: 'Semi Bold',
  500: 'Medium',
  450: 'Standard',
  400: 'Regular',
  390: 'Book',
  350: 'Semi Light',
  300: 'Light',
  200: 'Extra Light',
  150: 'Thin',
  100: 'Hairline',
};
const WIDTHS = {
  100: 'Skyline',
  140: 'Extra Compressed',
  200: 'Compressed',
  300: 'Extra Condensed',
  400: 'Condensed',
  440: 'Narrow',
  500: 'Normal',
  600: 'Wide',
  700: 'Extended',
  800: 'Extra Extended',
  900: 'Ultra Extended',
};
const POSTURES = [
  'Roman',  // 0
  'Italic', // 1
];
const VISIBLE_STATES = [
  'Inactive',    // 0
  'Staff only',  // 1
  'With link',   // 2
  'Everyone',    // 3
];
@Component({
  selector: 'admin-styles-list',
  templateUrl: './admin-styles-list.component.html',
  styleUrls: ['./admin-styles-list.component.scss']
})
export class AdminStylesListComponent {
  /**
   *  Styles collection for combination.
   *
   * @type {Observable<Styles[]>}
   * @memberof AdminStylesListComponent
   */
  public styles$ = this.store.select(getAllStyles);

  /**
   * Styles search query to filter styles against.
   *
   * @type {Observable<StylesSearch>}
   * @memberof AdminStylesListComponent
   */
  public stylesQuery$ = this.store.select(getStyleSearchQuery);

  /**
   *  Family entity collection for combination.
   *
   * @type {Observable<FamilyState.entities}
   * @memberof AdminStylesListComponent
   */
  public familyEntities$ = this.store.select(getFamilyEntities);

  /**
   *  Family entity collection for combination.
   *
   * @type {Observable<FoundryState.entities}
   * @memberof AdminStylesListComponent
   */
  public foundryEntities$ = this.store.select(getFoundryEntities);

  /**
   *  Style collection with populated family data.
   *
   * @type {Observable<Style[]>}
   * @memberof AdminStylesListComponent
   */
  public styleFamilies$ = Observable.combineLatest(
     this.styles$,
     this.familyEntities$,
     (styles, families) => styles.map((style) => ({
       ...style,
       family: families[style.family as number],
     }))
   );

  /**
   *  Style collection with populated foundry data.
   *
   * @type {Observable<Style[]>}
   * @memberof AdminStylesListComponent
   */
  public styleFamiliesFoundries$ = Observable.combineLatest(
     this.styleFamilies$,
     this.foundryEntities$,
     (styles, foundries) => styles.map((style) => ({
       ...style,
       foundry: (style.foundry as number[]).map((id) => foundries[id]),
     }))
   );

  /**
   *  Styles collection for display, filtered against search query.
   *
   * @type {Observable<Styles[]>}
   * @memberof AdminStylesListComponent
   */
  public filteredStyles$ = Observable.combineLatest(
    this.styleFamiliesFoundries$,
    this.stylesQuery$,
    (styles, stylesQuery: StyleSearch) => styles.filter((style) => {
      if (stylesQuery.name) {
        const testName = new RegExp(stylesQuery.name, 'i');
        const hasName = testName.test(style.name);
        if (!hasName) { return false; }
      }
      if (stylesQuery.visible.length && stylesQuery.visible.indexOf(style.visible) === -1) {
        return false;
      }
      if (stylesQuery.categories.length) {
        const hasFamily = stylesQuery.categories.some((category) =>
          (style.family as Family).category.indexOf(category) !== -1);
        if (!hasFamily) { return false; }
      }

      return true;
    }).map((style) => ({
      ...style,
      visibleName: VISIBLE_STATES[style.visible],
      opticalName: OPTICAL[style.optical],
      postureName: POSTURES[style.posture],
      widthName: WIDTHS[style.width],
      weightName: WEIGHTS[style.weight],
    })));

  constructor(private store: Store<any>, private stylesActions: StyleActions) {}

  /**
   * Fetch the server and get all the styles with the provided query
   *
   * @public
   * @type {StylesSearch} query
   * @memberof AdminStylesListComponent
   */
  public searchStyles(query: StyleSearch) {
    this.store.dispatch(this.stylesActions.searchQuery(query));
  }
}
