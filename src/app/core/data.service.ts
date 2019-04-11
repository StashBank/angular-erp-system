import { Injectable } from '@angular/core';
import { Observable, of as observableOf, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export abstract class DataService<T> {

  abstract collectionName: string;

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAll(): Observable<Array<T>> {
    return this.firestore.collection(this.collectionName)
    .snapshotChanges()
    .pipe(
      map(
        data =>  data.map(i => {
          return {
            ...i.payload.doc.data(),
            id: i.payload.doc.id,
          } as any;
        })
      )
    );
  }

  getById(id: string): Observable<T> {
    return this.firestore.doc<T>(`${this.collectionName}/${id}`).valueChanges().pipe(
      map((item: any) => {
        if (item) {
          item.id = id;
        }
        return item;
      })
    );
  }

  create(dto: any): Observable<string> {
    return from(this.firestore.collection(this.collectionName)
      .add(dto)).pipe(
        map(
          resp => resp.id
        )
      );
  }

  update(id: string, item: T): Observable<any> {
    return from(
      this.firestore.doc<T>(`${this.collectionName}/${id}`).update(item)
    );
  }

  remove(id: string): Observable<any> {
    return from(
      this.firestore.doc<T>(`${this.collectionName}/${id}`).delete()
    );
  }

}
