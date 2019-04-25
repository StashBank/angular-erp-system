import { ItemFeature } from './item-feature';
import { ItemType } from '../enums/item-type.enum';
import { Customer } from 'src/app/customers/models/customer';
import { Model } from 'src/app/core/decorators/model.decorator';
import { ModelProperty } from 'src/app/core/decorators/property.decorator';
import { BaseModel } from 'src/app/core/models/base.model';

@Model({
  name: 'items'
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
  @ModelProperty()
  contractor: Customer;
  @ModelProperty()
  imageData?: string;
  @ModelProperty()
  features: Array<ItemFeature>;
}
