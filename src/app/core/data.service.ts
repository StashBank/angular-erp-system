import { Injectable } from '@angular/core';
import { Observable, of as observableOf, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BaseModel } from './models/base.model';
import { Guid } from 'guid-typescript';
import { FirebaseService } from './firebase/firebase.service';

@Injectable()
export abstract class DataService<T> extends FirebaseService<T> {

  abstract collectionName: string;

  getAll(): Observable<Array<T>> {
    return super.getAll();
  }

  getById(id: string): Observable<T> {
    return super.getById(id);
  }

  create(dto: any): Observable<T> {
    dto = this.prepareDto(dto);
    if (!dto.id) {
      dto.id = Guid.create().toString();
    }
    return super.create(dto);
  }

  update(id: string, dto: T): Observable<any> {
    dto = this.prepareDto(dto);
    return super.update(id, dto);
  }

  remove(id: string): Observable<any> {
    return super.remove(id);
  }

  protected prepareDto(dto): any {
    if (dto) {
      Object.keys(dto).forEach(key => {
        let value = dto[key];
        if (value === undefined) {
          value = null;
        }
        if (typeof value === 'object' && value instanceof BaseModel) {
          value = Object.assign({}, value);
          value = this.prepareDto(value);
        }
        if (Array.isArray(value)) {
          value = value.map(v => this.prepareDto(v));
        }
        if (!value && key === 'id') {
          value = Guid.create().toString();
        }
        dto[key] = value;
      });
    }
    dto = Object.assign({}, dto);
    return dto;
  }

}
