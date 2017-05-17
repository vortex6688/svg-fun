/* tslint:disable:variable-name */
export class Family {
  public id?: number;
  public name: string;
  public slug: string;
  public description: string;
  public descripion_link: [{
    text: string;
    url: string;
  }];
  public more: string;
  public category: number[];
  public mood: number[];
  public designer: number[];
  public foundry: number[];
  public posture: number[];
  public recommended_function: number[];
  public recommended_size: number[];
  public width: number[];
  public weight: number[];
  public tn_width: number[];
  public tn_weight: number[];
  public released: string;
  public style: number[];
  public default_style: number;
  public link_only_styles; // TODO
  public canonical: number;
  public canonical_series: number;
  public series: number[];
  public visible: number;
}
