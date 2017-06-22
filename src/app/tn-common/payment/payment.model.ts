/* tslint:disable:max-classes-per-file */
/* tslint:disable:variable-name */

class Billing {
  public name: string;
  public address1: string;
  public address2?: string;
  public state?: string;
  public city: string;
  public zipcode: string;
  public country: string;
  public company?: string;
}

export class Payment {
  public id?: number;
  public order: number;
  public amount: number;
  public provider: number;
  public provider_data?: string;
  public status: number;
  public billing: Billing;
}
