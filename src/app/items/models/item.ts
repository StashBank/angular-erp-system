import { ItemFeature } from './item-feature';
import { ItemType } from '../enums/item-type.enum';
import { Customer } from '../../customers/models/customer';
import { Model } from '../../core/decorators/model.decorator';
import { ModelProperty } from '../../core/decorators/property.decorator';
import { BaseModel } from '../../core/models/base.model';

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
