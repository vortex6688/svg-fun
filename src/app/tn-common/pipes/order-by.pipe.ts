import { Pipe, PipeTransform } from '@angular/core';

/**
 * OrderBy pipe able to sort on given array of properties
 * Supports nested objects and nested arrays of objects
 *
 * Example use
 * Basic Array of single type: *ngFor="let todo of todoService.todos | orderBy : ['-']"
 * Multidimensional sort on single column: *ngFor="let todo of todoService.todos | orderBy : ['-status']
 * Multidimensional sort on multiple columns: *ngFor="let todo of todoService.todos | orderBy : ['status', '-title']
 * Nested object sort: *ngFor="let todo of todoService.todos | orderBy : ['status.name']
 */

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  /**
   * Compares two given values and returns -1, 0 or 1
   * @static
   * @param {any} a
   * @param {any} b
   * @returns {number}
   */
  private static _orderByComparator(a: any, b: any): number {
    if (typeof a === 'undefined' || typeof b === 'undefined') { return 0; }
    if ((isNaN(+(a)) || !isFinite(a)) || (isNaN(+(b)) || !isFinite(b))) {
      // Check if it's an array
      if (Object.prototype.toString.call(a) === '[object Array]') {
        // Let the empty array be first
        if (a.length === 0) {
          return -1;
        } else if (b.length === 0) {
          return 1;
        }
        const min = Math.min(a.length, b.length);
        let partialResult = 0;
        for (let i = 0; i < min; i++) {
          partialResult = this._orderByComparator(a[i], b[i]);
          if (partialResult === 0) {
            continue;
          } else {
            return partialResult;
          }
        }
        // They have the same elements, so let the shortest array be first
        if (a.length > b.length) {
          return 1;
        } else {
          return -1;
        }
      // Isn't a number so lowercase the string to properly compare
      } else if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      } else if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }
    } else {
      // Parse strings as numbers to compare properly
      if (+(a) < +(b)) { return -1; }
      if (+(a) > +(b)) { return 1; }
    }

    return 0;
  }

  /**
   * Maps array to a given property
   *
   * @static
   * @param {any[]} object
   * @param {string[]} property
   * @returns {any[]}
   */
  private static _extractArray(object: any[], property: string[]) {
    if (property.length > 1) {
      return object.map((item) => OrderByPipe._deepProperty(item, property.join('.')));
    }
    return object.map((item) => item[property[0]]);
  }

  /**
   * Goes through nested properties if needed
   *
   * @static
   * @param {any} object
   * @param {string} property
   * @returns {any}
   */
  private static _deepProperty(object: any, property: string) {
    const keys = property.split('.');
    if (keys.length === 1) {
      return object[property];
    }

    let target = object;
    while (keys.length) {
      const key = keys.shift();
      if (target && typeof target[key] !== 'undefined') {
        target = target[key];
        if (Array.isArray(target) && keys.length > 0) {
          return OrderByPipe._extractArray(target, keys);
        }
        continue;
      }
      return undefined;
    }
    return target;
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
            ? OrderByPipe._orderByComparator(
                OrderByPipe._deepProperty(a, property),
                OrderByPipe._deepProperty(b, property)
              )
            : -OrderByPipe._orderByComparator(
              OrderByPipe._deepProperty(a, property),
              OrderByPipe._deepProperty(b, property)
            )
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
            ? OrderByPipe._orderByComparator(
              OrderByPipe._deepProperty(a, property),
              OrderByPipe._deepProperty(b, property)
            )
            : -OrderByPipe._orderByComparator(
              OrderByPipe._deepProperty(a, property),
              OrderByPipe._deepProperty(b, property)
            );

          // Don't return 0 yet in case of needing to sort by next property
          if (comparison !== 0) { return comparison; }
        }
        return 0; // equal each other
      });
    }
  }
}
