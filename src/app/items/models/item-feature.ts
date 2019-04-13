import { ItemFeatureType } from '../enums/item-feature-type.enum';

export class ItemFeature {
  itemId: string;
  name: string;
  value: any;
  type: ItemFeatureType;
}
