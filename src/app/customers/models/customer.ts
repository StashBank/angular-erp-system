import { CustomerType } from '../enums/customer-type.enum';
import { Model } from 'src/app/core/decorators/model.decorator';

@Model({
  name: 'customers',
  displayPropertyName: 'id',
  primaryPropertyName: 'name'
})
export class Customer {
  id: string;
  name: string;
  type: CustomerType;
  phone: string;
  email: string;
  address: string;
  extras: string;
}
