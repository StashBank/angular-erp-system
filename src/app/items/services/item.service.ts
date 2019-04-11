import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Item } from '../models/item';

@Injectable({ providedIn: 'root' })
export class ItemService extends DataService<Item> {

  collectionName = 'items';

}
