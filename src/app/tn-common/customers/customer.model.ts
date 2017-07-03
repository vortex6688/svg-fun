import { User } from '../user';
import { Order } from '../orders';

export class Customer extends User {
  public orders?: Order[];
  public totalSpent?: number;
}
