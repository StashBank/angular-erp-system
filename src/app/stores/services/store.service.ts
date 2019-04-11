import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Store } from '../models/store';

@Injectable({ providedIn: 'root' })
export class StoreService extends DataService<Store> {

  collectionName = 'stores';

}
