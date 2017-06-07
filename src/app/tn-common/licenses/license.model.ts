/* tslint:disable:variable-name */
import { Style } from '../styles';

export class License {
  public id?: number;
  public order: number;
  public price: string;
  public price_paid?: string;
  public qty: number;
  public style: number | Style;
  public active: boolean;
  public license_type: string;
  public years?: number;
  public start?: string;
  public end?: string;
  public self_hosted?: boolean;
}
