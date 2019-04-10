import { OrderStatus } from '../enums/order-status.enum';
import { Customer } from '../../customers/models/customer';
import { Item } from '../../items/models/item';
import { Store } from '../../stores/models/store';

export class Order {
  id: string;
  number: string;
  date: Date;
  customer: Customer;
  item: Item;
  store: Store;
  qty: number;
}
