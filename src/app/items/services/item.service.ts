import { Injectable } from '@angular/core';
import { Observable, of as observableOf, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Guid } from 'guid-typescript';

import { Item } from '../models/item';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ItemService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAll(): Observable<Array<Item>> {
    /*const response = [
      {id: Guid.create().toString(), name: 'Item 1', code: '001', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 2', code: '002', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 3', code: '003', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 4', code: '004', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 5', code: '005', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 6', code: '006', price: 10.50, description: 'item' },
      {id: Guid.create().toString(), name: 'Item 7', code: '007', price: 10.50, description: 'item' },
    ] as Array<Item>;
    return observableOf(response).pipe(tap(r => console.log(JSON.stringify(r))));*/
    return this.firestore.collection('items').snapshotChanges().pipe(
      map(data => {
      console.log(data);
      return data.map(i => i.payload as any);
    })
    );
  }

  createItem(itemDto: any): Observable<Item> {
    itemDto.id = Guid.create().toString();
    return from(this.firestore.collection('items')
      .add(itemDto)).pipe(
        map(() => itemDto)
      );
  }

}
