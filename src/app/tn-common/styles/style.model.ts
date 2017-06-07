/* tslint:disable:variable-name */

import { Family } from '../families';

export class Style {
  public id?: number;
  public name: string;
  public style_name: string;
  public family: number | Family;
  public base_price: string;
  public pangram?: number;
  public specimen_text?: string;
  public character_set?: string;
  public support?: object;
  public default_style: boolean;
  public foundry: number;
  public designer: number;
  public posture: number;
  public sku?: string;
  public visible: number;
  public optical: number;
  public grade?: number;
  public weight: number;
  public width: number;
  public tn_size: number[];
  public tn_weight?: number;
  public tn_width?: number;
  public released: string;
  public min_recommended_size?: number;
  public max_recommended_size?: number;
  public matching_italic?: number;
  public matching_bold?: number;
  public matching_bold_italic?: number;
  public isRE?: boolean;
  public notes?: string;
  public recommended_function: number[];
  public recommended_size: number[];
}
