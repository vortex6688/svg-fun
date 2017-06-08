/* tslint:disable:variable-name */
import { License } from '../licenses';

export class Project {
  public id: number;
  public name: string;
  public user: number;
  public domains: string;
  public created: string;
  public source?: string;
  public source_id?: string;
  public licenses: number[] | License[];
  public family_count: number;
  public style_count: number;
}
