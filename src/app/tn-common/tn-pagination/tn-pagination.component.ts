import { Component,
         EventEmitter,
         Input,
         Output,
         OnInit,
         OnChanges,
         ChangeDetectionStrategy,
         SimpleChanges } from '@angular/core';
import { getValueInRange, isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { TnPaginationConfig } from './pagination-config';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * A directive that will take care of visualising a pagination bar and enable / disable buttons
 * correctly!
 */
@Component({
  selector: 'tn-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tn-pagination.component.html'
})
export class TnPaginationComponent extends NgbPagination implements OnInit, OnChanges {
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

  public pageItems: number[] = [];
  @Output() public pageItemsChanges = new EventEmitter<number[]>();

  constructor(config: TnPaginationConfig, private route: ActivatedRoute,  private router: Router) {
    super(config);
  }

  public hasPrevious(): boolean {
    return super.hasPrevious();
  }

  public hasNext(): boolean {
    return super.hasNext();
  }

  public selectPage(pageNumber: number): void {
    this.router.navigate([], {
      queryParams: { page: pageNumber }
    });
    super.selectPage(pageNumber);
    this.updatePageItems();
  }

  public ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams && queryParams.page) {
      this.selectPage(queryParams.page);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    this.updatePageItems();
  }

  public updatePageItems() {
    const firstItem = (this.page - 1) * this.pageSize;
    const lastItem = Math.min((firstItem + this.pageSize), this.collectionSize);
    if (this.pageItems[0] !== firstItem || this.pageItems[1] !== lastItem) {
      this.pageItems = [firstItem, lastItem];
      this.pageItemsChanges.emit(this.pageItems);
    }
  }
}
