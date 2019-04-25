import { StockStatus } from '../enums/stock-status.enum';
import { Item } from '../../items/models/item';
import { Store } from '../../stores/models/store';
import { Model } from 'src/app/core/decorators/model.decorator';
import { BaseModel } from 'src/app/core/models/base.model';
import { ModelProperty } from 'src/app/core/decorators/property.decorator';

@Model({
  name: 'stocks'
})
export class Stock extends BaseModel {
  @ModelProperty()
  number: string;
  @ModelProperty()
  status: StockStatus;
  @ModelProperty()
  item: Item;
  @ModelProperty()
  store: Store;
  @ModelProperty()
  qty: number;
  @ModelProperty()
  date: Date;
}
