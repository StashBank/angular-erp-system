import { StockStatus } from '../enums/stock-status.enum';
import { Item } from '../../items/models/item';
import { Store } from '../../stores/models/store';
import { Model } from '../../core/decorators/model.decorator';
import { BaseModel } from '../../core/models/base.model';
import { ModelProperty } from '../../core/decorators/property.decorator';

@Model({
  caption: 'stocks.title',
  name: 'Stock',
  collectionName: 'stocks'
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
