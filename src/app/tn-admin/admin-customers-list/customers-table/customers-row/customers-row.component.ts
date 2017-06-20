import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'customers-row',
  templateUrl: './customers-row.component.html'
})
export class CustomersRowComponent {
  public isCollapsed = true;
  public order;
}
