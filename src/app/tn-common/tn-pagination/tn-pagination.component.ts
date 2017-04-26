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
export class TnPaginationComponent extends NgbPagination implements OnChanges {
  // TODO: Proxy properties to parent class. Codelyzer doesn't pick up the inherited properties.
  public pageCount: number;
  public pages: number[];
  public disabled: boolean;
  public boundaryLinks: boolean;
  public directionLinks: boolean;
  public ellipses: boolean;
  public rotate: boolean;
  public collectionSize: number;
  public maxSize: number;
  public page: number;
  public pageSize: number;
  public pageChange: EventEmitter<number>;
  public size: 'sm' | 'lg';

  constructor(config: TnPaginationConfig) {
    super(config);
  }

  public hasPrevious(): boolean {
    return super.hasPrevious();
  }

  public hasNext(): boolean {
    return super.hasNext();
  }

  public selectPage(pageNumber: number): void {
    return super.selectPage(pageNumber);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    return super.ngOnChanges(changes);
  }
}
