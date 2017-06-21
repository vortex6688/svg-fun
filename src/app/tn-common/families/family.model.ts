/* tslint:disable:variable-name */
import { Style } from '../styles';
import { Foundry } from '../foundries';

export class Family {
  public id?: number;
  public name: string;
  public slug: string;
  public visible: number;
  public visibleName?: string;
  public description?: string;
  public descripion_link: [{
    text: string;
    url: string;
  }];
  public more?: string;
  public foundry: number[] | Foundry[];
  public designer: number[];
  public released: string;
  public category: number[];
  public categoryName?: string[];
  public canonical: number;
  public pangram?: number[];
  public specimen_text?: string;
  public canonical_series?: number;
  public character_set?: string;
  public notes?: string;
  public mood: number[];
  public moodName?: string[];
  public posture: number[];
  public recommended_function: number[];
  public recommended_size: number[];
  public min_size?: number;
  public max_size?: number;
  public width: number[];
  public weight: number[];
  public tn_width: number[];
  public tn_weight: number[];
  public style: number[] | Style[];
  public default_style: number;
  public link_only_styles;
  public series: number[];
}
