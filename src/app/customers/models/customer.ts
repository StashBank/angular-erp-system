import { CustomerType } from '../enums/customer-type.enum';
import { Model } from '../../core/decorators/model.decorator';
import { ModelProperty, DataValueType, DropDownConfig } from '../../core/decorators/property.decorator';
import { BaseModel } from '../../core/models/base.model';
import { Validators } from '@angular/forms';

@Model({
  caption: 'customers.title',
  name: 'Customer',
  collectionName: 'customers'
})
export class Customer extends BaseModel {

  @ModelProperty({
    caption: 'common.id',
    dataValueType: DataValueType.Text,
  })
  id: string;

  @ModelProperty({
    caption: 'customers.caption.name',
    dataValueType: DataValueType.Text,
    required: true
  })
  name: string;

  @ModelProperty({
    caption: 'customers.caption.number',
    dataValueType: DataValueType.Text,
    readOnly: true,
    defaultValue: () => new Date().valueOf()
  })
  number: string;

  @ModelProperty({
    caption: 'customers.caption.type',
    dataValueType: DataValueType.DropDown,
    dataValueTypeConfig: {
      refModel: CustomerType,
      translatePath: 'customers.enums.type'
    } as DropDownConfig,
    required: true
  })
  type: CustomerType;

  @ModelProperty({
    caption: 'customers.caption.phone',
    dataValueType: DataValueType.Text,
    validators: [Validators.pattern(/^0\d{9}$/)],
    required: true
  })
  phone: string;

  @ModelProperty({
    caption: 'customers.caption.email',
    dataValueType: DataValueType.Text,
    validators: [Validators.email]
  })
  email: string;

  @ModelProperty({
    caption: 'customers.caption.address',
    dataValueType: DataValueType.Text
  })
  address: string;

  @ModelProperty({
    caption: 'customers.caption.notes',
    dataValueType: DataValueType.RichText
  })
  notes: string;

}
