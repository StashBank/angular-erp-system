import { Enum } from '../../core/decorators/enum.decorator';

export enum ItemType {
  Goods = 0,
  Services = 1
}

Enum({
  name: 'ItemType',
  translatePath: 'items.enums.type',
})(ItemType);
