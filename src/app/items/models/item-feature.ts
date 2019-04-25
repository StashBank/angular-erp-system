import { ItemFeatureType } from '../enums/item-feature-type.enum';
import { Model } from 'src/app/core/decorators/model.decorator';
import { BaseModel } from 'src/app/core/models/base.model';
import { ModelProperty } from 'src/app/core/decorators/property.decorator';

@Model({
  name: 'itemFeatures'
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
