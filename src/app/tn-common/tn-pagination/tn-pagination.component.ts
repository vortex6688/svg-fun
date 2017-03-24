import { Component,
         EventEmitter,
         Input,
         Output,
         OnChanges,
         ChangeDetectionStrategy,
         SimpleChanges } from '@angular/core';
import { getValueInRange, isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { TnPaginationConfig } from './pagination-config';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

/**
 * A directive that will take care of visualising a pagination bar and enable / disable buttons
 * correctly!
 */
@Component({
  selector: 'tn-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tn-pagination.component.html'
})
export class TnPaginationComponent extends NgbPagination {
  constructor(config: TnPaginationConfig) {
    super(config);
  }
}
