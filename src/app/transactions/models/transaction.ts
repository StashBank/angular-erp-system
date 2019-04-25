import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { Store } from '../../stores/models/store';
import { Customer } from '../../customers/models/customer';
import { Order } from '../../orders/models/order';
import { Model } from 'src/app/core/decorators/model.decorator';
import { BaseModel } from 'src/app/core/models/base.model';
import { ModelProperty } from 'src/app/core/decorators/property.decorator';

@Model({
  name: 'transactions'
})
export class Transaction extends BaseModel {
  @ModelProperty()
  type: TransactionType;
  @ModelProperty()
  status: TransactionStatus;
  @ModelProperty()
  from: Store;
  @ModelProperty()
  to: Store | Customer;
  @ModelProperty()
  order: Order;
  @ModelProperty()
  date: Date;
  @ModelProperty()
  qty: number;
}
