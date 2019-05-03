import { ItemFeature } from './item-feature';
import { ItemType } from '../enums/item-type.enum';
import { Customer } from '../../customers/models/customer';
import { Model } from '../../core/decorators/model.decorator';
import { ModelProperty, DataValueType, LookupConfig, DropDownConfig } from '../../core/decorators/property.decorator';
import { BaseModel } from '../../core/models/base.model';
import { Validators } from '@angular/forms';
import { CustomerType } from 'src/app/customers/enums/customer-type.enum';

@Model({
  caption: 'items.title',
  name: 'Item',
  collectionName: 'items'
})
export class Item extends BaseModel {

  @ModelProperty({
    caption: 'items.caption.name',
    dataValueType: DataValueType.Text,
    required: true
  })
  name: string;

  @ModelProperty({
    caption: 'items.caption.code',
    dataValueType: DataValueType.Text
  })
  code?: string;

  @ModelProperty({
    caption: 'items.caption.bar-code',
    dataValueType: DataValueType.Text
  })
  barCode?: string;

  @ModelProperty({
    caption: 'items.caption.type',
    dataValueType: DataValueType.DropDown,
    dataValueTypeConfig: {
      refModel: ItemType
    } as DropDownConfig,
    required: true
  })
  type: ItemType;

  @ModelProperty({
    caption: 'items.caption.description',
    dataValueType: DataValueType.Text
  })
  description?: string;

  @ModelProperty({
    caption: 'items.caption.price',
    dataValueType: DataValueType.Money,
    required: true
  })
  price: number;

  @ModelProperty({
    caption: 'items.caption.contractor',
    dataValueType: DataValueType.Lookup,
    dataValueTypeConfig: {
      refModel: Customer,
      displayColumns: ['code', 'phone', 'email'],
      columns: ['code', 'phone', 'email'],
      filters: [['type', '===', CustomerType.Company]]
    } as LookupConfig
  })
  contractor: Customer;

  @ModelProperty({
    caption: 'customers.caption.image',
    dataValueType: DataValueType.Image
  })
  imageData?: string;

  @ModelProperty({
    caption: 'customers.caption.features',
    dataValueType: DataValueType.Array
  })
  features: Array<ItemFeature>;

}
