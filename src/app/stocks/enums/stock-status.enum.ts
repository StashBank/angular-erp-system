import { Enum } from '../../core/decorators/enum.decorator';

export enum StockStatus {
  Available,
  InTransit,
  OnHold,
  OnService,
}

Enum({
  name: 'StockStatus',
  translatePath: 'stocks.enums.status',
})(StockStatus);
