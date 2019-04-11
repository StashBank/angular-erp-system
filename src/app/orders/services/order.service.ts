import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Order } from '../models/order';

@Injectable({ providedIn: 'root' })
export class OrderService extends DataService<Order> {

  collectionName = 'orders';

}
