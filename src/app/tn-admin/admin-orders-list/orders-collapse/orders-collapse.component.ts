import { Component } from '@angular/core';
import { CollapseComponent } from '../../collapse';

@Component({
  selector: 'app-orders-collapse',
  templateUrl: './orders-collapse.component.html',
  styleUrls: ['./orders-collapse.component.scss']
})
export class OrdersCollapseComponent {

  /*
   * Test harcoded data, this should be gathered using a service
   */
  public orders = [
    { id: 1, number: 2367, customer: 'Longname, Person', amount: '237.00', date: '10/20/2016',
      status: 'pending', families: ['fam 1', 'fam2'], licenseTypes: ['Desktop', 'Web'],
      totalStyles: 12, returning: 'New customer' },
    { id: 2, number: 2368, customer: 'Shortname, Person', amount: '119.00', date: '04/10/2016',
      status: 'pending', families: ['fam 1', 'fam 5'], licenseTypes: ['Desktop', 'Mobile'],
      totalStyles: 4, returning: 'Returning' },
  ];

}
