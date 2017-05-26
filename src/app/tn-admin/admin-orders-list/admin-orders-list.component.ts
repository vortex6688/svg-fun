import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Order, OrderActions, OrderSearch } from '../../tn-common/orders';
import { License } from '../../tn-common/licenses';
import { Style } from '../../tn-common/styles';
import { Family, FamilyState } from '../../tn-common/families';
import { Project, ProjectActions } from '../../tn-common/projects';
import { getAllOrders,
  getOrderSearchQuery,
  getAllLicenses,
  getAllStyles,
  getFamilyEntities,
  getAllProjects,
} from '../store/reducers';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.scss']
})
export class AdminOrdersListComponent {
  /**
   *  Orders collection for combination.
   *
   * @type {Observable<Order[]>}
   * @memberof AdminOrdersListComponent
   */
  public orders$ = this.store.select(getAllOrders);

  /**
   * Order search query to filter orders against.
   *
   * @type {Observable<OrderSearch>}
   * @memberof AdminOrdersListComponent
   */
  public orderQuery$ = this.store.select(getOrderSearchQuery);

  /**
   *  Licenses collection for combination.
   *
   * @type {Observable<License[]>}
   * @memberof AdminOrdersListComponent
   */
  public licenses$ = this.store.select(getAllLicenses);

  /**
   *  Style collection for combination.
   *
   * @type {Observable<Style[]>}
   * @memberof AdminOrdersListComponent
   */
  public styles$ = this.store.select(getAllStyles);

  /**
   *  Projects collection for combination.
   *
   * @type {Observable<Project[]>}
   * @memberof AdminOrdersListComponent
   */
  public projects$ = this.store.select(getAllProjects);

  /**
   *  Family entity collection for combination.
   *
   * @type {Observable<FamilyState.entities}
   * @memberof AdminOrdersListComponent
   */
  public familyEntities$ = this.store.select(getFamilyEntities);

  /**
   *  Style collection with populated family data.
   *
   * @type {Observable<Style[]>}
   * @memberof AdminOrdersListComponent
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
   *  License collection with populated style data.
   *
   * @type {Observable<License[]>}
   * @memberof AdminOrdersListComponent
   */
  public licensesStyles$ = Observable.combineLatest(
     this.licenses$,
     this.styleFamilies$,
     (licenses, styles) => licenses.map((license) => ({
       ...license,
       style: styles.find((style) => style.id === license.style),
     }))
   );

  /**
   *  Orders collections with populated license data.
   *
   * @type {Observable<Order[]>}
   * @memberof AdminOrdersListComponent
   */
  public ordersLicenses$ = Observable.combineLatest(
    this.orders$,
    this.licensesStyles$,
    (orders: Order[], licenses: License[]) => orders.map((order) => ({
      ...order,
      licenses: licenses.filter((license) => license.order === order.id),
    })));

  /**
   *  Orders collections with populated license data and project data.
   *
   * @type {Observable<Order[]>}
   * @memberof AdminOrdersListComponent
   */
  public ordersLicensesProjects$ = Observable.combineLatest(
    this.ordersLicenses$,
    this.projects$,
    (orders: Order[], projects: Project[]): Order[] => orders.map((order) => ({
      ...order,
      projects: projects.filter((project) => project.user === order.user),
    })));

  /**
   *  Orders collection for display, filtered against search query.
   *
   * @type {Observable<Order[]>}
   * @memberof AdminOrdersListComponent
   */
  public filteredOrdersLicenses$ = Observable.combineLatest(
    this.ordersLicenses$,
    this.orderQuery$,
    (orders, orderQuery: OrderSearch) => orders.filter((order) => {
      if (orderQuery.id && order.id !== +orderQuery.id) {
        return false;
      }
      if (orderQuery.status.length && orderQuery.status.indexOf(order.status) === -1) {
        return false;
      }
      if (orderQuery.from && new Date(order.created) < orderQuery.from) {
        return false;
      }
      if (orderQuery.to && new Date(order.created) > orderQuery.to) {
        return false;
      }
      if (orderQuery.font) {
        const testName = new RegExp(orderQuery.font, 'i');
        const hasName = order.licenses.some((license) => testName.test((license.style as Style).name));
        if (!hasName) { return false; }
      }
      return !orderQuery.licenses.length || orderQuery.licenses.some((licenseType) =>
        Object.entries(licenseType).every(([key, value]) =>
          order.licenses.some((license) => license[key] === value)));
    }));

  constructor(private store: Store<any>, private orderActions: OrderActions) {}

  /**
   * Fetch the server and get all the orders with the provided query
   *
   * @public
   * @type {OrderSearch} query
   * @memberof AdminOrdersListComponent
   */
  public searchOrders(query: OrderSearch) {
    this.store.dispatch(this.orderActions.searchQuery(query));
  }
}
