import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { Guid } from "guid-typescript";

import { Item } from '../models/item';

@Injectable({ providedIn: 'root' })
export class ItemService {

  constructor() { }

  getAll(): Observable<Array<Item>> {
    const response = [
      {id: Guid.create().toString(), name: 'Item 1', code: '001', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 2', code: '002', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 3', code: '003', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 4', code: '004', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 5', code: '005', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 6', code: '006', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 7', code: '007', price: 10.50, description: 'item' },
    ] as Array<Item>;
    return observableOf(response);
  }

}