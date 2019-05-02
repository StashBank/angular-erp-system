import { StoreType } from '../enums/store-type.enum';
import { Stock } from '../../stocks/models/stock';
import { Model } from '../../core/decorators/model.decorator';
import { BaseModel } from '../../core/models/base.model';
import { ModelProperty } from '../../core/decorators/property.decorator';

@Model({
  name: 'Store',
  collectionName: 'stores'
})
export class Store extends BaseModel {
  @ModelProperty()
  type: StoreType;
  @ModelProperty()
  name: string;
  @ModelProperty()
  code: string;
  @ModelProperty()
  address: string;
  @ModelProperty()
  phone: string;
  @ModelProperty()
  stocks: Array<Stock>;
}
