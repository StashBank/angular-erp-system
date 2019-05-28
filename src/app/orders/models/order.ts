import { OrderStatus } from '../enums/order-status.enum';
import { Customer } from '../../customers/models/customer';
import { Item } from '../../items/models/item';
import { Store } from '../../stores/models/store';
import { OrderType } from '../enums/order-type.enum';
import { Model } from '../../core/decorators/model.decorator';
import { BaseModel } from '../../core/models/base.model';
import { ModelProperty, DataValueType, DropDownConfig, LookupConfig } from '../../core/decorators/property.decorator';
import { Validators } from '@angular/forms';
import { OrderFeature } from './order-feature';
import { ModelMethod, ModelMethodType, ModelMethodAction } from 'src/app/core/decorators/method.decorator';
import { OrderViewModelService } from '../services/order-view-model.service';

@Model({
  caption: 'orders.title',
  name: 'Order',
  collectionName: 'orders'
})
export class Order extends BaseModel {

  @ModelProperty({
    caption: 'common.id',
    dataValueType: DataValueType.Text,
  })
  id: string;

  @ModelProperty({
    caption: 'orders.caption.number',
    dataValueType: DataValueType.Text,
    readOnly: true,
    defaultValue: () => new Date().valueOf()
  })
  number: string;

  @ModelProperty({
    caption: 'orders.caption.type',
    dataValueType: DataValueType.DropDown,
    dataValueTypeConfig: {
      refModel: OrderType
    } as DropDownConfig,
    required: true
  })
  type: OrderType;

  @ModelProperty({
    caption: 'orders.caption.status',
    dataValueType: DataValueType.DropDown,
    dataValueTypeConfig: {
      refModel: OrderStatus
    } as DropDownConfig,
    readOnly: true,
    defaultValue: OrderStatus.New
  })
  status: OrderStatus;

  // TODO: Add validator - More then today
  @ModelProperty({
    caption: 'orders.caption.date',
    dataValueType: DataValueType.Date,
    required: true,
    defaultValue: () => new Date()
  })
  date: Date;

  @ModelProperty({
    caption: 'orders.caption.customer',
    dataValueType: DataValueType.Lookup,
    dataValueTypeConfig: {
      refModel: Customer,
      displayColumns: ['name', 'phone', 'email'],
      columns: ['name', 'phone', 'email'],
    } as LookupConfig
  })
  customer: Customer;

  @ModelProperty({
    caption: 'orders.caption.item',
    dataValueType: DataValueType.Lookup,
    dataValueTypeConfig: {
      refModel: Item,
      displayColumns: ['code', 'barCode', 'price'],
      columns: ['code', 'barCode', 'price'],
    } as LookupConfig
  })
  item: Item;

  @ModelProperty({
    caption: 'orders.caption.store',
    dataValueType: DataValueType.Lookup,
    dataValueTypeConfig: {
      refModel: Store,
      displayColumns: ['code', 'phone', 'email', 'address'],
      columns: ['code', 'phone'],
    } as LookupConfig
  })
  store: Store;

  @ModelProperty({
    caption: 'orders.caption.quantity',
    dataValueType: DataValueType.Integer,
    required: true,
    validators: [Validators.min(0)]
  })
  qty: number;

  @ModelProperty({
    caption: 'order.caption.features',
    dataValueType: DataValueType.Array,
    dataValueTypeConfig: {
      refModel: OrderFeature,
      displayColumns: ['name', 'value'],
      columns: ['name', 'value', 'type']
    } as LookupConfig
  })
  features: Array<OrderFeature>;

  @ModelProperty({
    caption: 'order.caption.transaction',
    dataValueType: DataValueType.Custom,
    readOnly: true
  })
  transactionId: string;

}
