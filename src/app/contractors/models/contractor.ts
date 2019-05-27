import { Model } from '../../core/decorators/model.decorator';
import { ModelProperty, DataValueType, DropDownConfig } from '../../core/decorators/property.decorator';
import { BaseModel } from '../../core/models/base.model';
import { Validators } from '@angular/forms';

@Model({
  caption: 'contractors.title',
  name: 'Contractor',
  collectionName: 'contractors'
})
export class Contractor extends BaseModel {

  @ModelProperty({
    caption: 'common.id',
    dataValueType: DataValueType.Text,
  })
  id: string;

  @ModelProperty({
    caption: 'contractors.caption.name',
    dataValueType: DataValueType.Text,
    required: true
  })
  name: string;

  @ModelProperty({
    caption: 'contractors.caption.number',
    dataValueType: DataValueType.Text,
    readOnly: true,
    defaultValue: () => new Date().valueOf()
  })
  number: string;

  @ModelProperty({
    caption: 'contractors.caption.phone',
    dataValueType: DataValueType.Text,
    validators: [Validators.pattern(/^0\d{9}$/)],
    required: true
  })
  phone: string;

  @ModelProperty({
    caption: 'contractors.caption.email',
    dataValueType: DataValueType.Text,
    validators: [Validators.email]
  })
  email: string;

  @ModelProperty({
    caption: 'contractors.caption.address',
    dataValueType: DataValueType.Text
  })
  address: string;

  @ModelProperty({
    caption: 'contractors.caption.notes',
    dataValueType: DataValueType.RichText
  })
  notes: string;

}
