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

  initForm() {
    super.initForm();
    this.subscribeOnItemChange();
  }

  subscribeOnItemChange() {
    this.form.get('item').valueChanges.subscribe(
      item => this.onItemChange(item)
    )
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

}
