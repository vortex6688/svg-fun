/* tslint:disable:variable-name */
export class Project {
  public id: number;
  public name: string;
  public user: number;
  public domains: string;
  public created: string;
  public source?: string;
  public source_id?: string;
  public licenses: number[];
  public family_count: number;
  public style_count: number;
}
