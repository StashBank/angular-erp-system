import { ItemFeature } from './item-feature';
import { ItemType } from '../enums/item-type.enum';
import { Customer } from '../../customers/models/customer';
import { Model } from '../../core/decorators/model.decorator';
import { ModelProperty, DataValueType, LookupConfig } from '../../core/decorators/property.decorator';
import { BaseModel } from '../../core/models/base.model';

@Model({
  name: 'Item',
  collectionName: 'items'
})
export class Item extends BaseModel {
  @ModelProperty()
  name: string;
  @ModelProperty()
  code?: string;
  @ModelProperty()
  barCode?: string;
  @ModelProperty()
  type: ItemType;
  @ModelProperty()
  description?: string;
  @ModelProperty()
  price: number;
  @ModelProperty({
    dataValueType: DataValueType.Lookup,
    dataValueTypeConfig: {
      refModel: Customer,
      displayColumns: ['name', 'code', 'phone', 'email']
    } as LookupConfig
  })
  contractor: Customer;
  @ModelProperty()
  imageData?: string;
  @ModelProperty()
  features: Array<ItemFeature>;
}
