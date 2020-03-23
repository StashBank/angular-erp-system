import { Injectable, Injector, Inject } from '@angular/core';
import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';
import { Transaction } from '../models/transaction';
import { TransactionService } from './transaction.service';
import { Observable } from 'rxjs';

@Injectable()
export class TransactionViewModelService extends BasePageViewModel {

  entitySchemaName = 'Transaction';
  entity = new Transaction();

  public get subTitle$(): Observable<string> {
    return this.translate.get('common.view');
  }

  constructor(@Inject(Injector) injector: Injector, protected transactionService: TransactionService) {
    super(injector);
  }

}
