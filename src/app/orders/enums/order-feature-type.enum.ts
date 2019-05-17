import { Enum } from '../../core/decorators/enum.decorator';

export enum OrderFeatureType {
  Primary = 0,
  Other = 1,
}

Enum({
  name: 'OrderFeatureType',
  translatePath: 'order-features.enums.type',
})(OrderFeatureType);
