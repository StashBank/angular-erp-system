import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';

@Injectable()
export class LookupDataService extends DataService<any> {
  collectionName = '';

  setCollectionName(name: string): LookupDataService {
    this.collectionName = name;
    return this;
  }
}
