import { Injectable, Inject } from '@angular/core';

import { Observable, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Guid } from 'guid-typescript';
import { FIRESTORE_INJECTION_TOKEN } from './firebase.module';

declare const firebase: any;
@Injectable()
export abstract class FirebaseService<T> {

  protected abstract collectionName: string;
  protected get collection(): firebase.firestore.CollectionReference {
    return this.db.collection(this.collectionName);
  }

  constructor(@Inject(FIRESTORE_INJECTION_TOKEN) protected db: firebase.firestore.Firestore) { }

  public getAll(): Observable<T[]> {
    const query = this.getAllQuery()
      .pipe(
        map(r => r.docs.map(d => ({
          id: d.id,
          ...d.data()
        } as unknown as T)))
      );
    return query;
  }

  public getById(id: string): Observable<T> {
    const query = from(this.collection.doc(id).get())
      .pipe(
        map(d => ({
          id: d.id,
          ...d.data()
        } as unknown as T))
      );
    return query;
  }

  public create(dto: T): Observable<T> {
    const id = Guid.create().toString();
    const docRef = this.collection.doc(id);
    const query = from(docRef.set(dto))
    .pipe(
      mergeMap(_ => docRef.get()),
      map(d => ({
        id: d.id,
        ...d.data()
      } as unknown as T))
    );
    return query;
  }

  public update(id: string, dto: T): Observable<T> {
    const docRef = this.collection.doc(id);
    const query = from(docRef.set(dto)).pipe(
      mergeMap(_ => docRef.get()),
      map(d => ({
        id: d.id,
        ...d.data()
      } as unknown as T))
    );
    return query;
  }

  public remove(id: string): Observable<any> {
    const docRef = this.collection.doc(id);
    const query = docRef.delete();
    return from(query);
  }

  protected getAllQuery(): Observable<firebase.firestore.QuerySnapshot> {
    return from(this.collection.get());
  }

}
