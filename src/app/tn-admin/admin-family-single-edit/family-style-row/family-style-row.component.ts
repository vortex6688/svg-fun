import { Component, Input } from '@angular/core';
import { Style } from '../../../tn-common/styles';

@Component({
  selector: 'family-style-row',
  templateUrl: './family-style-row.component.html',
  styleUrls: ['./family-style-row.component.scss']
})
export class FamilyStyleRowComponent {
  @Input() public style: Style;
}
