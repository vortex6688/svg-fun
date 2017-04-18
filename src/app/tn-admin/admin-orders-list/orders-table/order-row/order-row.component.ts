import { Component, Input } from '@angular/core';

@Component({
  selector: 'order-row',
  templateUrl: './order-row.component.html'
})
export class OrderRowComponent {
  @Input() public order;
  public isCollapsed = true;
}
