import { Enum } from '../../core/decorators/enum.decorator';

export enum ItemFeatureType {
  Primary = 0,
  Other = 1,
}

Enum({
  name: 'ItemFeatureType',
  translatePath: 'item-features.enums.type',
})(ItemFeatureType);
