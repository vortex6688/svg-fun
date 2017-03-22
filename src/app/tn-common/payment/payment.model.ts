/* tslint:disable:variable-name */

export class Payments {
  public order: number;
  public amount: number;
  public provider: number;
  public provider_data?: string;
  public status: number;
  public name: string;
  public street1: string;
  public street2?: string;
  public state?: string;
  public city: string;
  public zipcode: string;
  public country: string;
  public company?: string;
  public created: string;
}
