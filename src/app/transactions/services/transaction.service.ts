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
      switchMap(transaction => this.db.collection('orders').doc(transaction.orderId).get()
        .then(orderRef => {
          const order = ({
            id: orderRef.id,
            ...orderRef.data()
          } as unknown as Order);
          transaction.order = order;
          return transaction;
        })),
    );
  }

}
