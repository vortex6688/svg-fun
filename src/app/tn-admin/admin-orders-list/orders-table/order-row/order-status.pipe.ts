import { Pipe, PipeTransform } from '@angular/core';

const STATUSES = [
  'Pending',          // 0
  'Partially Paid',   // 1
  'Paid in Full',     // 2
  'Cancelled',        // 3
  'Approved, Unpaid', // 4
];
@Pipe({name: 'myOrderStatus'})
export class OrderStatusPipe implements PipeTransform {
  public transform(statusId: number): string {
    if (-1 < statusId && statusId < STATUSES.length ) {
      return STATUSES[statusId];
    } else {
      return 'Unknown';
    }
  }
}
