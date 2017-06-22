/* tslint:disable:variable-name */
/* tslint:disable:max-classes-per-file */
import { Payment } from '../payment/payment.model';
import { License } from '../licenses';
import { Family } from '../families';

class Licensee {
  public first_name: string;
  public last_name: string;
  public address1: string;
  public address2?: string;
  public state?: string;
  public city: string;
  public zipcode: string;
  public country: string;
  public company?: string;
  public vat?: string;
}

export class Order {
  public id?: number;
  public user: number;
  public subtotal: number;
  public tax: number;
  public total: number;
  public status: number;
  public statusName?: string;
  public created: string;
  public licensee: Licensee;
  public licenses?: License[];
  public payments: Payment[];
  public order_token: string;
  public coupon?: string;
  public coupon_discount?: number;
  public upgrade_price_adjustment: number;
  public families?: number[] | Family[];
  public new_customer?: boolean;
  public new_customer_name?: string;
}
