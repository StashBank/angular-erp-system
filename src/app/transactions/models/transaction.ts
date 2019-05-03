import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { Store } from '../../stores/models/store';
import { Customer } from '../../customers/models/customer';
import { Order } from '../../orders/models/order';
import { Model } from '../../core/decorators/model.decorator';
import { BaseModel } from '../../core/models/base.model';
import { ModelProperty, DataValueType, DropDownConfig, LookupConfig } from '../../core/decorators/property.decorator';

@Model({
  caption: 'transactions.title',
  name: 'Transaction',
  collectionName: 'transactions'
})
export class Transaction extends BaseModel {

  @ModelProperty({
    caption: 'transactions.caption.type',
    dataValueType: DataValueType.DropDown,
    dataValueTypeConfig: {
      refModel: TransactionType
    } as DropDownConfig,
    readOnly: true
  })
  type: TransactionType;

  @ModelProperty({
    caption: 'transactions.caption.type',
    dataValueType: DataValueType.DropDown,
    dataValueTypeConfig: {
      refModel: TransactionType
    } as DropDownConfig,
    readOnly: true,
    defaultValue: TransactionStatus.New
  })
  status: TransactionStatus;

  @ModelProperty({
    caption: 'transactions.caption.from',
    dataValueType: DataValueType.Custom,
    readOnly: true
  })
  from: Store;

  @ModelProperty({
    caption: 'transactions.caption.to',
    dataValueType: DataValueType.Custom,
    readOnly: true
  })
  to: Store | Customer;

  @ModelProperty({
    caption: 'transactions.caption.order',
    dataValueType: DataValueType.Custom,
    readOnly: true
  })
  order: Order;

  @ModelProperty({
    caption: 'transactions.caption.date',
    dataValueType: DataValueType.Date,
    readOnly: true
  })
  date: Date;

  @ModelProperty({
    caption: 'transactions.caption.date',
    dataValueType: DataValueType.Integer,
    readOnly: true
  })
  qty: number;

}
