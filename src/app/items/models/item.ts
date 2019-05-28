import { ItemFeature } from './item-feature';
import { ItemType } from '../enums/item-type.enum';
import { Model } from '../../core/decorators/model.decorator';
import { ModelProperty, DataValueType, LookupConfig, DropDownConfig } from '../../core/decorators/property.decorator';
import { BaseModel } from '../../core/models/base.model';
import { Contractor } from 'src/app/contractors/models/contractor';

@Model({
  caption: 'items.title',
  name: 'Item',
  collectionName: 'items'
})
export class Item extends BaseModel {

  @ModelProperty({
    caption: 'common.id',
    dataValueType: DataValueType.Text,
  })
  id: string;

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
      refModel: Contractor,
      displayColumns: ['phone', 'email', 'address'],
      columns: ['phone', 'email']
    } as LookupConfig
  })
  contractor: Contractor;

  @ModelProperty({
    caption: 'items.caption.image',
    dataValueType: DataValueType.Image
  })
  imageData?: string;

  @ModelProperty({
    caption: 'items.caption.features',
    dataValueType: DataValueType.Array,
    dataValueTypeConfig: {
      refModel: ItemFeature,
      displayColumns: ['name', 'value'],
      columns: ['name', 'value', 'type']
    } as LookupConfig
  })
  features: Array<ItemFeature>;

}
