import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { Store } from '../../stores/models/store';
import { Customer } from '../../customers/models/customer';
import { Order } from '../../orders/models/order';

export class Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  from: Store;
  to: Store | Customer;
  order: Order;
  date: Date;
  qty: number;
}
