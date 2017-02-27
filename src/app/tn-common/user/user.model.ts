/* tslint:disable:variable-name */
export class User {
  public id: number;
  public email: string;
  public username: string;
  public password?: string;
  public first_name?: string;
  public last_name?: string;
  public address1?: string;
  public address2?: string;
  public state?: string;
  public city?: string;
  public zipcode?: string;
  public country?: string;
  public company?: string;
  public website?: string;
  public phone?: string;
  public vat?: string;
  public is_active: boolean;
  public is_verified: boolean;
  public is_staff: boolean;
  public is_admin: boolean;
  public can_invoice: boolean;
  public tax_exempt: boolean;
  public created_at: string;
  public updated_at: string;
  // email_subscriptions: // Array
  // foundry: // Array
}
