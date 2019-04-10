import { ItemFeature } from './item-feature';
import { ItemType } from '../enums/item-type.enum';

export class Item {
  id: string;
  name: string;
  code?: string;
  barCode?: string;
  type: ItemType;
  description?: string;
  price: number;
  imageData?: string;
  features: Array<ItemFeature>;
}
