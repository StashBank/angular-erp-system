import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Transaction } from '../models/transaction';

@Injectable({ providedIn: 'root' })
export class TransactionService extends DataService<Transaction> {

  collectionName = 'transaction';

}
