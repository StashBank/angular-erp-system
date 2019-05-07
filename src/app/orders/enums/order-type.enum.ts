import { Enum } from 'src/app/core/decorators/enum.decorator';

export enum OrderType {
  Inbound,
  Outbound
}

Enum({
  name: 'OrderType',
  translatePath: 'orders.enums.type',
})(OrderType);
