import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Contractor } from '../models/contractor';

@Injectable({ providedIn: 'root' })
export class ContractorService extends DataService<Contractor> {

  collectionName = 'contractors';

}
