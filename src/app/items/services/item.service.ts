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
    return this.firestore.collection('items')
    .snapshotChanges()
    .pipe(
      map(
        data =>  data.map(i => {
          return {
            ...i.payload.doc.data(),
            id: i.payload.doc.id,
          } as Item;
        })
      )
    );
  }

  getItemById(id: string): Observable<Item> {
    return this.firestore.doc<Item>(`items/${id}`).valueChanges().pipe(
      map(item => {
        if (item) {
          item.id = id;
        }
        return item;
      })
    );
  }

  createItem(itemDto: any): Observable<string> {
    return from(this.firestore.collection('items')
      .add(itemDto)).pipe(
        map(
          resp => resp.id
        )
      );
  }

  updateItem(id: string, item: Item): Observable<any> {
    return from(
      this.firestore.doc<Item>(`items/${id}`).update(item)
    );
  }

  removeItem(id: string): Observable<any> {
    return from(
      this.firestore.doc<Item>(`items/${id}`).delete()
    );
  }


}
