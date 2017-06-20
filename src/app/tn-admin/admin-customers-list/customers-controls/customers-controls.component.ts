import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'customers-controls',
  templateUrl: './customers-controls.component.html'
})
export class CustomersControlsComponent {
  public isCollapsed = true;
}
