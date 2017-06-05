import { Pipe, PipeTransform } from '@angular/core';

const VISIBLE_STATES = [
  'Inactive',    // 0
  'Staff only',  // 1
  'With link',   // 2
  'Everyone',    // 3
];
@Pipe({name: 'myFamilyVisibility'})
export class FamilyVisibilityPipe implements PipeTransform {
  public transform(visibility: number): string {
    if (-1 < visibility && visibility < VISIBLE_STATES.length ) {
      return VISIBLE_STATES[visibility];
    } else {
      return 'Unknown';
    }
  }
}
