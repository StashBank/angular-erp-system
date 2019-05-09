import { Injectable, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';

import { Order } from '../models/order';
import { OrderType } from '../enums/order-type.enum';
import { OrderService } from './order.service';

@Injectable()
export class OrderViewModelService extends BasePageViewModel {

  entitySchemaName = 'Order';
  entity = new Order();
  orderTypes: Array<{ name: string, value: string }> = [
    { value: OrderType.Inbound.toString(), name: 'Inbound' },
    { value: OrderType.Outbound.toString(), name: 'Outbound' },
  ];
  customersDisplayedColumns = [
    { path: 'name', title: 'customers.caption.name' },
  ];
  itemsDisplayedColumns = [
    { path: 'name', title: 'items.caption.name' },
    { path: 'code', title: 'items.caption.code' },
    { path: 'barCode', title: 'items.caption.bar-code' },
  ];
  storesDisplayedColumns = [
    { path: 'name', title: 'stores.caption.name' },
    { path: 'code', title: 'items.caption.code' },
  ];

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.number })
      : this.translate.get('common.create-new');
  }

  constructor(injector: Injector, protected orderService: OrderService) {
    super(injector);
  }

}
