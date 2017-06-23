import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Series, SeriesActions, SeriesSearch } from '../../tn-common/series';
import { License } from '../../tn-common/licenses';
import { Foundry } from '../../tn-common/foundries';
import {
  getAllSeries,
  getSeriesSearchQuery,
  getFamilyEntities,
  getFoundryEntities,
  getAllFoundries,
} from '../store/reducers';

@Component({
  selector: 'admin-series-list',
  templateUrl: './admin-series-list.component.html',
  styleUrls: ['./admin-series-list.component.scss']
})
export class AdminSeriesListComponent {
  /**
   *  Series collection for combination.
   *
   * @type {Observable<Series[]>}
   * @memberof AdminSeriesListComponent
   */
  public series$ = this.store.select(getAllSeries);

  /**
   * Series search query to filter series against.
   *
   * @type {Observable<SeriesSearch>}
   * @memberof AdminSeriesListComponent
   */
  public seriesQuery$ = this.store.select(getSeriesSearchQuery);

  /**
   *  Family entity collection for combination.
   *
   * @type {Observable<FamilyState.entities}
   * @memberof AdminSeriesListComponent
   */
  public familyEntities$ = this.store.select(getFamilyEntities);

  /**
   *  Foundry collection list for selection.
   *
   * @type {Observable<Foundry[]}
   * @memberof AdminFamiliesListComponent
   */
  public foundries$ = this.store.select(getAllFoundries);

  /**
   *  Foundry entity collection for combination.
   *
   * @type {Observable<FoundryState.entities}
   * @memberof AdmineriesListComponent
   */
  public foundryEntities$ = this.store.select(getFoundryEntities);

  /**
   *  Series collection with populated foundry data.
   * @type {Observable<Family[]>}
   * @memberof AdminFamiliesListComponent
   */
  public seriesFoundries$ = Observable.combineLatest(
     this.series$,
     this.foundryEntities$,
     (series: Series[], foundries) => series.map((item) => ({
       ...item,
       foundry: foundries[item.foundry as number],
     })));

  /**
   *  Series collection with populated family data.
   *
   * @type {Observable<Series[]>}
   * @memberof AdminSeriesListComponent
   */
  public seriesFamilies$ = Observable.combineLatest(
    this.seriesFoundries$,
    this.familyEntities$,
    (series, families) => series.map((item) => {
      const { family, styles } = (item.family as number[]).reduce((result, id) => {
        const seriesFamily = families[id];
        if (seriesFamily) {
          result.family.push(seriesFamily);
          result.styles += seriesFamily.style.length;
        }
        return result;
      }, { family: [], styles: 0 });

      return {
        ...item,
        family,
        styles,
      };
    })
  );

  /**
   *  Series collection for display, filtered against search query.
   *
   * @type {Observable<Series[]>}
   * @memberof AdminSeriesListComponent
   */
  public filteredSeries$ = Observable.combineLatest(
    this.seriesFamilies$,
    this.seriesQuery$,
    (series, seriesQuery: SeriesSearch) => series.filter((item) => {
      if (seriesQuery.name) {
        const testName = new RegExp(seriesQuery.name, 'i');
        const hasName = testName.test(item.name);
        if (!hasName) { return false; }
      }
      if (seriesQuery.foundry.length) {
        if (!item.foundry || seriesQuery.foundry.indexOf(item.foundry.id) === -1) { return false; }
      }
      return true;
    }));

  constructor(private store: Store<any>, private seriesActions: SeriesActions) {}

  /**
   * Fetch the server and get all the series with the provided query
   *
   * @public
   * @type {SeriesSearch} query
   * @memberof AdminSeriesListComponent
   */
  public searchSeries(query: SeriesSearch) {
    this.store.dispatch(this.seriesActions.searchQuery(query));
  }
}
