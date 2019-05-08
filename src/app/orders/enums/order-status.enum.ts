import { Enum } from '../../core/decorators/enum.decorator';

export enum OrderStatus {
  New,
  InProgress,
  Closed,
  Canceled
}

Enum({
  name: 'OrderStatus',
  translatePath: 'orders.enums.status',
})(OrderStatus);
