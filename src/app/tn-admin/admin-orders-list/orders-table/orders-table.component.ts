import { Component, Input } from '@angular/core';

@Component({
  selector: 'orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent {
  @Input() public orders;
}
