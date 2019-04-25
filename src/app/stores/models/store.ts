import { StoreType } from '../enums/store-type.enum';
import { Stock } from '../../stocks/models/stock';
import { Model } from 'src/app/core/decorators/model.decorator';
import { BaseModel } from 'src/app/core/models/base.model';
import { ModelProperty } from 'src/app/core/decorators/property.decorator';

@Model({
  name: 'stores'
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
