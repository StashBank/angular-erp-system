import { CustomerType } from '../enums/customer-type.enum';
export class Customer {
  id: string;
  name: string;
  type: CustomerType;
  phone: string;
  address: string;
  extras: string;
}
