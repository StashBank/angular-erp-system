import { CustomerType } from '../enums/customer-type.enum';
import { Model } from 'src/app/core/decorators/model.decorator';
import { ModelProperty } from 'src/app/core/decorators/property.decorator';
import { BaseModel } from 'src/app/core/models/base.model';

@Model({
  name: 'customers'
})
export class Customer extends BaseModel {

  @ModelProperty()
  name: string;
  @ModelProperty()
  type: CustomerType;
  @ModelProperty()
  phone: string;
  @ModelProperty()
  email: string;
  @ModelProperty()
  address: string;
  @ModelProperty()
  extras: string;
}
