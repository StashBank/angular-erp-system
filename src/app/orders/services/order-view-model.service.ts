import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';

import { Order } from '../models/order';
import { OrderType } from '../enums/order-type.enum';
import { OrderService } from './order.service';
import { OrderFeature } from '../models/order-feature';
import { Item } from 'src/app/items/models/item';
import { Guid } from 'guid-typescript';
import { OrderFeatureType } from '../enums/order-feature-type.enum';
import { TransactionService } from 'src/app/transactions/services/transaction.service';
import { OrderStatus } from '../enums/order-status.enum';
import { Transaction } from 'src/app/transactions/models/transaction';
import { TransactionType } from 'src/app/transactions/enums/transaction-type.enum';
import { TransactionStatus } from 'src/app/transactions/enums/transaction-status.enum';
import { switchMap, map, take } from 'rxjs/operators';
import { ViewModelAction } from 'src/app/core/decorators/view-model-action.decorator';

@Injectable()
export class OrderViewModelService extends BasePageViewModel {

  entitySchemaName = 'Order';
  entity = new Order();

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.number })
      : this.translate.get('common.create-new');
  }

  constructor(
    injector: Injector,
    protected orderService: OrderService,
    protected transactionService: TransactionService
  ) {
    super(injector);
  }

  initForm() {
    super.initForm();
    this.subscribeOnItemChange();
  }

  subscribeOnItemChange() {
    this.form.get('item').valueChanges.subscribe(
      item => this.onItemChange(item)
    );
  }

  onItemChange(item: Item) {
    const features = item && Array.isArray(item.features) ? item.features.map<OrderFeature>(x => {
      let feature = new OrderFeature();
      feature = Object.assign(feature, x);
      delete (feature as any).itemId;
      feature.orderId = this.entity.id;
      return feature;
    }) : [];
    const metadata = this.getEntitySchemaPropertyByName('features');
    this.createFormArray(metadata, features);
    this.form.patchValue({ features });
  }

  @ViewModelAction({
    caption: 'orders.action.proceed',
    icon: 'trip_origin'
  })
  proceed() {
    const order = this.form.getRawValue() as Order;
    this.transactionService.create({
      date: new Date(),
      from: order.store,
      to: order.customer,
      orderId: order.id,
      qty: order.qty,
      type: TransactionType.Output,
      status: TransactionStatus.Pending
    } as Transaction).pipe(
      take(1),
    )
    .subscribe(transactionId => {
      this.form.patchValue({ status: OrderStatus.InProgress, transactionId });
      this.save();
    });
  }

  @ViewModelAction({
    caption: 'orders.action.close',
    icon: 'trip_origin'
  })
  close() {
    const order = this.form.getRawValue() as Order;
    this.transactionService.getById(order.transactionId)
    .pipe(
      take(1),
      map(transaction => {
        transaction.status = TransactionStatus.Closed;
        transaction.date = new Date();
        return transaction;
      }),
      switchMap(transaction => this.transactionService.update(transaction.id, transaction))
    )
    .subscribe(transactionId => {
      this.form.patchValue({ status: OrderStatus.Closed, transactionId });
      this.save();
    });
  }

  @ViewModelAction({
    caption: 'orders.action.cancel',
    icon: 'trip_origin'
  })
  cancel() {
    const order = this.form.getRawValue() as Order;
    this.transactionService.getById(order.transactionId)
      .pipe(
        take(1),
        map(transaction => {
          transaction.status = TransactionStatus.Canceled;
          transaction.date = new Date();
          return transaction;
        }),
        switchMap(transaction => this.transactionService.update(transaction.id, transaction))
      )
      .subscribe(transactionId => {
        this.form.patchValue({ status: OrderStatus.Canceled, transactionId });
        this.save();
      });
  }

}
