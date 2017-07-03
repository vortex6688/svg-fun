import { User } from '../user';
import { Order } from '../Orders';

export class Customer extends User {
  public orders?: Order[];
  public totalSpent?: number;
}
