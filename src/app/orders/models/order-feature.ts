import { OrderFeatureType } from '../enums/order-feature-type.enum';
import { Model } from '../../core/decorators/model.decorator';
import { BaseModel } from '../../core/models/base.model';
import { ModelProperty, DataValueType, DropDownConfig } from '../../core/decorators/property.decorator';

@Model({
  caption: 'order-feature.title',
  name: 'OrderFeature',
  collectionName: 'orderFeatures'
})
export class OrderFeature extends BaseModel {

  @ModelProperty({
    caption: 'common.id',
    dataValueType: DataValueType.Text,
    hidden: true
  })
  id: string;

  @ModelProperty({
    caption: 'order-features.caption.order',
    dataValueType: DataValueType.Text,
    // required: true
  })
  orderId: string;

  @ModelProperty({
    caption: 'order-features.caption.name',
    dataValueType: DataValueType.Text,
    required: true
  })
  name: string;

  @ModelProperty({
    caption: 'order-features.caption.value',
    dataValueType: DataValueType.Text,
    required: true
  })
  value: any;

  @ModelProperty({
    caption: 'order-features.caption.type',
    dataValueType: DataValueType.DropDown,
    dataValueTypeConfig: {
      refModel: OrderFeatureType
    } as DropDownConfig,
    // required: true
  })
  type: OrderFeatureType;

}
