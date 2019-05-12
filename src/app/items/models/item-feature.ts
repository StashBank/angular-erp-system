import { ItemFeatureType } from '../enums/item-feature-type.enum';
import { Model } from '../../core/decorators/model.decorator';
import { BaseModel } from '../../core/models/base.model';
import { ModelProperty, DataValueType, DropDownConfig } from '../../core/decorators/property.decorator';

@Model({
  caption: 'item-feature.title',
  name: 'ItemFeature',
  collectionName: 'itemFeatures'
})
export class ItemFeature extends BaseModel {

  @ModelProperty({
    caption: 'common.id',
    dataValueType: DataValueType.Text,
    hidden: true
  })
  id: string;

  @ModelProperty({
    caption: 'item-features.caption.item',
    dataValueType: DataValueType.Text,
    // required: true
  })
  itemId: string;

  @ModelProperty({
    caption: 'item-features.caption.name',
    dataValueType: DataValueType.Text,
    required: true
  })
  name: string;

  @ModelProperty({
    caption: 'item-features.caption.value',
    dataValueType: DataValueType.Text,
    required: true
  })
  value: any;

  @ModelProperty({
    caption: 'item-features.caption.type',
    dataValueType: DataValueType.DropDown,
    dataValueTypeConfig: {
      refModel: ItemFeatureType
    } as DropDownConfig,
    required: true
  })
  type: ItemFeatureType;

}
