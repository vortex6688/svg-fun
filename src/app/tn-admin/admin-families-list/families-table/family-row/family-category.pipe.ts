import { Pipe, PipeTransform } from '@angular/core';

const CATEGORIES = [
  'Sans',       // 0
  'Serif',      // 1
  'Symbol',     // 2
  'Slab Serif', // 3
  'Wacky',      // 4
  'Script',     // 5
  'Decorative', // 6
];
@Pipe({name: 'myFamilyCategory'})
export class FamilyCategoryPipe implements PipeTransform {
  public transform(category: number): string {
    if (-1 < category && category < CATEGORIES.length ) {
      return CATEGORIES[category];
    } else {
      return 'Unknown';
    }
  }
}
