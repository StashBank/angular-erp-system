import { StoreType } from '../enums/store-type.enum';
import { Stock } from '../../stocks/models/stock';

export class Store {
  id: string;
  type: StoreType;
  name: string;
  code: string;
  address: string;
  phone: string;
  stocks: Array<Stock>;
}
