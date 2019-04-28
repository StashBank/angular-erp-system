import { OrderStatus } from '../enums/order-status.enum';
import { Customer } from '../../customers/models/customer';
import { Item } from '../../items/models/item';
import { Store } from '../../stores/models/store';
import { OrderType } from '../enums/order-type.enum';
import { Model } from '../../core/decorators/model.decorator';
import { BaseModel } from '../../core/models/base.model';
import { ModelProperty } from '../../core/decorators/property.decorator';

@Model({
  name: 'orders'
})
export class Order extends BaseModel {
  @ModelProperty()
  number: string;
  @ModelProperty()
  type: OrderType;
  @ModelProperty()
  status: OrderStatus;
  @ModelProperty()
  date: Date;
  @ModelProperty()
  customer: Customer;
  @ModelProperty()
  item: Item;
  @ModelProperty()
  store: Store;
  @ModelProperty()
  qty: number;
}
