import { Enum } from 'src/app/core/decorators/enum.decorator';

export enum CustomerType {
  Person,
  Company
}

Enum({
  name: 'CustomerType',
  translatePath: 'customers.enums.type',
})(CustomerType);
