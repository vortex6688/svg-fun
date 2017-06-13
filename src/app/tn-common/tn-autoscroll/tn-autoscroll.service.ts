import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

/**
 * TypeNetwork Autoscroll Service.
 *
 * This service will autoscroll pages to the selected fragment.
 *
 * @export
 * @class TnAutoscrollService
 */
@Injectable()
export class TnAutoscrollService  {

  public static factory(route: ActivatedRoute, doc: any) {
    return new TnAutoscrollService(route, doc);
  }

  public static provider() {
    return {
      provide: TnAutoscrollService,
      deps: [ ActivatedRoute, DOCUMENT ],
      useFactory: TnAutoscrollService.factory
    };
  }

  /**
   * Creates an instance of TnAutoscrollService.
   *
   * @memberOf TnAutoscrollService
   */
  constructor(route: ActivatedRoute, doc: any) {
    route.fragment.subscribe((fragment) => {
      if (!fragment) {
        return;
      }
      const element = doc.querySelector(`#${fragment}`);
      if ( element ) {
        element.scrollIntoView({behavior: 'smooth', block: 'end'});
      }
    });
  }
}
