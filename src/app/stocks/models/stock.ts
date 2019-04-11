import { StockStatus } from '../enums/stock-status.enum';
import { Item } from '../../items/models/item';
import { Store } from '../../stores/models/store';

export class Stock {
  id: string;
  status: StockStatus;
  item: Item;
  store: Store;
  qty: number;
  date: Date;
}
