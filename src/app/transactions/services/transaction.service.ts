import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Transaction } from '../models/transaction';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Order } from 'src/app/orders/models/order';

@Injectable({ providedIn: 'root' })
export class TransactionService extends DataService<Transaction> {

  collectionName = 'transaction';

  getById(id: string): Observable<Transaction> {
    const query = super.getById(id);
    return query.pipe(
      switchMap(transaction => {
        return this.firestore.doc<Order>(`orders/${transaction.orderId}`)
          .valueChanges()
          .pipe(
            map(order => {
              transaction.order = order;
              return transaction;
            })
        );
      })
    );
  }

}
