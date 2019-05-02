import { ItemFeatureType } from '../enums/item-feature-type.enum';
import { Model } from '../../core/decorators/model.decorator';
import { BaseModel } from '../../core/models/base.model';
import { ModelProperty } from '../../core/decorators/property.decorator';

@Model({
  caption: 'item-feature.title',
  name: 'ItemFeature',
  collectionName: 'itemFeatures'
})
export class ItemFeature extends BaseModel {
  @ModelProperty()
  itemId: string;
  @ModelProperty()
  name: string;
  @ModelProperty()
  value: any;
  @ModelProperty()
  type: ItemFeatureType;
}
