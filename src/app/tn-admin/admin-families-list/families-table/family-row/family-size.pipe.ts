import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'myFamilySize'})
export class FamilySizePipe implements PipeTransform {
  public transform(sizes: number[], getMax: boolean): number {
    if (getMax) {
      return Math.max(...sizes);
    } else {
      return Math.min(...sizes);
    }
  }
}
