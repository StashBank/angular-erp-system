import { ItemFeature } from './item-feature';
import { ItemType } from '../enums/item-type.enum';
import { Customer } from 'src/app/customers/models/customer';

export class Item {
  id: string;
  name: string;
  code?: string;
  barCode?: string;
  type: ItemType;
  description?: string;
  price: number;
  contractor: Customer;
  imageData?: string;
  features: Array<ItemFeature>;
}
