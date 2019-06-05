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
    caption: 'common.id',
    dataValueType: DataValueType.Text,
  })
  id: string;

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
    caption: 'transactions.caption.status',
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
    dataValueType: DataValueType.Lookup,
    dataValueTypeConfig: {
      refModel: Store
    } as LookupConfig,
    readOnly: true
  })
  from: Store;

  @ModelProperty({
    caption: 'transactions.caption.to',
    dataValueType: DataValueType.Lookup,
    dataValueTypeConfig: {
      refModel: Customer
    } as LookupConfig,
    readOnly: true
  })
  to: Customer;

  @ModelProperty({
    caption: 'transactions.caption.order',
    dataValueType: DataValueType.Text,
    readOnly: true
  })
  orderId: string;

  @ModelProperty({
    caption: 'transactions.caption.order',
    dataValueType: DataValueType.Lookup,
    dataValueTypeConfig: {
      refModel: Order
    } as LookupConfig,
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
    caption: 'transactions.caption.quantity',
    dataValueType: DataValueType.Integer,
    readOnly: true
  })
  qty: number;

}
