import { Enum } from 'src/app/core/decorators/enum.decorator';

export enum TransactionStatus {
  New,
  Pending,
  Canceled,
  Closed
}

Enum({
  name: 'TransactionStatus',
  translatePath: 'transaction.enums.status',
})(TransactionStatus);
