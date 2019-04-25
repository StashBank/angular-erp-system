import { Injectable, Injector } from '@angular/core';
import { BaseViewModel } from '../../core/view-models/base-view-model.service';
import { Transaction } from '../models/transaction';
import { TransactionService } from './transaction.service';
import { Observable } from 'rxjs';

@Injectable()
export class TransactionViewModelService extends BaseViewModel {

  entitySchemaName: 'transactions';
  transaction: Transaction;

  public get subTitle$(): Observable<string> {
    return this.translate.get('common.view');
  }

  constructor(injector: Injector, protected transactionService: TransactionService) {
    super(injector);
  }

  init() {
    this.createForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadTransaction(id);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      type: null,
      status: null,
      from: null,
      to: null,
      order: null,
      date: null,
      qty: null
    });
  }

  save() {
    if (this.id) {
      this.transactionService.update(this.id, this.form.value).subscribe(() => null);
      return;
    }
    this.transactionService.create(this.form.value)
      .subscribe(
        // id => this.router.navigate(['..', 'edit', id], { relativeTo: this.route })
        id => this.location.replaceState(`transactions/edit/${id}`)
      );
  }

  loadTransaction(id: string) {
    this.transactionService.getById(id).subscribe(transaction => {
      this.transaction = Object.assign(new Transaction(), transaction);
      this.form.patchValue(transaction);
    });
  }
}
