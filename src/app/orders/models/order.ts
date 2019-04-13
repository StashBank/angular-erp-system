import { OrderStatus } from '../enums/order-status.enum';
import { Customer } from '../../customers/models/customer';
import { Item } from '../../items/models/item';
import { Store } from '../../stores/models/store';
import { OrderType } from '../enums/order-type.enum';

export class Order {
  id: string;
  number: string;
  type: OrderType;
  date: Date;
  customer: Customer;
  item: Item;
  store: Store;
  qty: number;
}
