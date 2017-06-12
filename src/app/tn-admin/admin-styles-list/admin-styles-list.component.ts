import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Style, StyleActions, StyleSearch } from '../../tn-common/styles';
import { Family, FamilyState } from '../../tn-common/families';
import {
  getAllStyles,
  getStyleSearchQuery,
  getFamilyEntities,
} from '../store/reducers';

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
   *  Styles collection for display, filtered against search query.
   *
   * @type {Observable<Styles[]>}
   * @memberof AdminStylesListComponent
   */
  public filteredStyles$ = Observable.combineLatest(
    this.styleFamilies$,
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
    }));

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
