import { Injectable } from '@angular/core';
import { DOCUMENT, Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

/**
 * TypeNetwork Title Service.
 *
 * This extensions of the Title service adds a Router Event Observer that updates the document
 * title based on the data.title property of the route.
 *
 * @export
 * @class TnTitleService
 * @extends Title
 */
@Injectable()
export class TnTitleService extends Title {

  public static factory(_doc: any, router: Router, activatedRoute: ActivatedRoute) {
    return new TnTitleService(_doc, router, activatedRoute);
  }

  public static provider() {
    return {
      provide: TnTitleService,
      deps: [ DOCUMENT, Router, ActivatedRoute ],
      useFactory: TnTitleService.factory
    };
  }

  /**
   * Creates an instance of TnTitleService.
   *
   * @memberOf TnTitleService
   */
  constructor(_doc: any, router: Router, activatedRoute: ActivatedRoute) {
    super(_doc);

    router.events
      // listen only to NavigationEnd events
      .filter((event) => event instanceof NavigationEnd)
      // replace the event with the activated route.
      .map((event) => activatedRoute)
      // filter down to primary outlet routes.
      .filter((route) => route.outlet === 'primary')
      // find the leaf route.
      .map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
      // resolve and flatten route.data observable
      .mergeMap((route) => route.data)
      // set the title if present.
      .subscribe((data) => data['title'] && this.setTitle(data['title']));
  }
}
