import { Pipe, PipeTransform } from '@angular/core';

/*
  * Example use
  * Basic Array of single type: *ngFor="let todo of todoService.todos | orderBy : ['-']"
  * Multidimensional sort on single column: *ngFor="let todo of todoService.todos | orderBy : ['-status']
  * Multidimensional sort on multiple columns: *ngFor="let todo of todoService.todos | orderBy : ['status', '-title']
 */

@Pipe({
  name: 'orderBy',
  pure: false,
})
export class OrderByPipe implements PipeTransform {
  /**
   * Compares two given values and returns -1, 0 or 1 \
   * @static
   * @param {any} a
   * @param {any} b
   * @returns {number}
   */
  private static _orderByComparator(a: any, b: any): number {
    if ((isNaN(+(a)) || !isFinite(a)) || (isNaN(+(b)) || !isFinite(b))) {
      // Isn't a number so lowercase the string to properly compare
      if (a.toLowerCase() < b.toLowerCase()) { return -1; }
      if (a.toLowerCase() > b.toLowerCase()) { return 1; }
    } else {
      // Parse strings as num bers to compare properly
      if (+(a) < +(b)) { return -1; }
      if (+(a) > +(b)) { return 1; }
    }

    return 0;
  }

  /**
   * Takes an input, config array and returns the input sorted by config keys
   * Config keys can + and - prefixes to indicate ascending, descending sort order
   * @public
   * @param {any[]} input - array that should be sorted
   * @param {string[]} config - array of keys to sort input array by
   * @returns {any[]}
   */
  public transform(input: any[], config: string[] = ['+']): any[] {
    if (config.length === 1) {
      const propertyToCheck: string = config[0];
      const desc = propertyToCheck.substr(0, 1) === '-';

      // Basic array
      if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
        return !desc ? input.sort() : input.sort().reverse();
      } else {
        const property: string = propertyToCheck.substr(0, 1) === '+' ||
          propertyToCheck.substr(0, 1) === '-'
            ? propertyToCheck.substr(1)
            : propertyToCheck;

        return input.sort((a: any, b: any) => (!desc
            ? OrderByPipe._orderByComparator(a[property], b[property])
            : -OrderByPipe._orderByComparator(a[property], b[property])
          ));
      }
    } else {
      // Loop over property of the array in order and sort
      return input.sort((a: any, b: any) => {
        for (const key of config) {
          const desc = key.substr(0, 1) === '-';
          const property = key.substr(0, 1) === '+' || key.substr(0, 1) === '-'
            ? key.substr(1)
            : key;

          const comparison = !desc
            ? OrderByPipe._orderByComparator(a[property], b[property])
            : -OrderByPipe._orderByComparator(a[property], b[property]);

          // Don't return 0 yet in case of needing to sort by next property
          if (comparison !== 0) { return comparison; }
        }
        return 0; // equal each other
      });
    }
  }
}
