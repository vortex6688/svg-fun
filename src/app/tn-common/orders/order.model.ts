/* tslint:disable:variable-name */
/* tslint:disable:max-classes-per-file */
import { Payments } from '../payment/payment.model';
import { License } from '../licenses';

export class BaseOrder {
  public id?: number;
  public user: number;
  public subtotal: number;
  public tax: number;
  public total: number;
  public status: number;
  public created: string;
  public licensee_first_name: string;
  public licensee_last_name: string;
  public licensee_street1: string;
  public licensee_street2?: string;
  public licensee_state?: string;
  public licensee_city: string;
  public licensee_zipcode: string;
  public licensee_country: string;
  public licensee_company?: string;
  public licensee_vat: string;
  public payments: Payments[];
  public order_token: string;
  public coupon?: string;
  public coupon_discount?: number;
  public upgrade_price_adjustment: number;
}

export class Order extends BaseOrder {
  public licenses?: number;
}

export class OrderFull extends BaseOrder {
  public licenses: License[];
}
