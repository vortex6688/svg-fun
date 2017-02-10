import { Component } from '@angular/core';
@Component({
  selector: 'tn-common-example',
  styleUrls: [ './example.component.scss' ],
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  public title = 'Some Great Games';
  public games = [
      `Fallout 4`,
      `Kira☆Kira (キラ☆キラ)`,
      'Undertale',
      'XCOM: Enemy Unknown',
  ].sort();
};
