import { Enum } from '../../core/decorators/enum.decorator';

export enum CustomerType {
  Person,
  Company
}

Enum({
  name: 'CustomerType',
  translatePath: 'customers.enums.type',
})(CustomerType);
