import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Stock } from '../models/stock';

@Injectable({ providedIn: 'root' })
export class StockService extends DataService<Stock> {

  collectionName = 'stocks';

}
