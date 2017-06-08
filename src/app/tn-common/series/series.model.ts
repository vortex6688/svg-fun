/* tslint:disable:variable-name */

import { Family } from '../families/';

export class Series {
  public id?: number;
  public name: string;
  public slug: string;
  public released: string;
  // public family: Family[];
  public family: number[] | Family[];
  // public designers: Designer[];
  public designers: number[];
  // public foundry: Foundry[];
  public foundry?: number;
  public description?: string;
  public description_link: string[];
  public pangram?: string[];
  // public pangram?: Pangram[];
  public specimen_text?: string;
  public visible?: boolean;
}
