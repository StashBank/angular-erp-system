import { StoreType } from '../enums/store-type.enum';
import { Model } from '../../core/decorators/model.decorator';
import { BaseModel } from '../../core/models/base.model';
import { ModelProperty, DataValueType, DropDownConfig, LookupConfig } from '../../core/decorators/property.decorator';
import { Validators } from '@angular/forms';

@Model({
  caption: 'stores.title',
  name: 'Store',
  collectionName: 'stores'
})
export class Store extends BaseModel {

  @ModelProperty({
    caption: 'common.id',
    dataValueType: DataValueType.Text,
  })
  id: string;

  @ModelProperty({
    caption: 'stores.caption.name',
    dataValueType: DataValueType.Text,
    required: true
  })
  name: string;

  @ModelProperty({
    caption: 'stores.caption.type',
    dataValueType: DataValueType.DropDown,
    dataValueTypeConfig: {
      refModel: StoreType
    } as DropDownConfig,
    required: true
  })
  type: StoreType;

  @ModelProperty({
    caption: 'stores.caption.code',
    dataValueType: DataValueType.Text,
    required: true
  })
  code: string;

  @ModelProperty({
    caption: 'stores.caption.address',
    dataValueType: DataValueType.Text,
    required: true
  })
  address: string;

  @ModelProperty({
    caption: 'stores.caption.address',
    dataValueType: DataValueType.Text,
    required: true,
    validators: [Validators.pattern(/^0\d{9}$/)]
  })
  phone: string;

  /*@ModelProperty({
    caption: 'stores.caption.stocks',
    dataValueType: DataValueType.Array,
    dataValueTypeConfig: {
      refModel: Stock
    } as LookupConfig
  })
  stocks?: Array<Stock>;*/

}
